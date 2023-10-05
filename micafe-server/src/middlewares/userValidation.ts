import config from '../config';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import bcrypt from 'bcrypt';
import { type NextFunction, type Request, type Response } from 'express';
import { type IUser, User } from '../models/userModel';
import { sendValidationAccountMail } from '../helpers/sendEmail';
import { validationResult } from 'express-validator';

const signToken = (user: IUser): string =>
  jwt.sign({ id: user.id, role: user.role }, config.JWT, {
    expiresIn: config.JWT_EXPIRE
  });

const createSendToken = (
  user: IUser,
  statusCode: number,
  res: Response
): void => {
  const token = signToken(user);
  user.password = ' ';

  res.status(statusCode).json({
    ok: true,
    token,
    user
  });
};

export const registerValidation = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { email } = req.body;
    const findUser = await User.find({ email });
    if (findUser.length !== 0) {
      res.status(401).json({
        ok: 'false',
        message: 'An account is already registered with your email.'
      });
    }
    const newUser = await User.create(req.body);
    newUser.password = ' ';
    res.status(200).json({
      ok: true,
      newUser
    });
    await sendValidationAccountMail(newUser);
    next();
  }
);

export const loginValidation = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user == null) {
      res.status(401).json({
        ok: 'false',
        message: 'Invalid password or email'
      });
      return;
    }
    if (!user.isValidated) {
      res.status(403).json({
        ok: 'false',
        message: 'Please verify your account before accessing it.'
      });
    }
    const validPassword: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      res.status(401).json({
        ok: 'false',
        message: 'Invalid password or email'
      });
    }

    createSendToken(user, 200, res);
    next();
  }
);
