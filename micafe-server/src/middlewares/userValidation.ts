import config from '../config';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import bcrypt from 'bcrypt';
import { type NextFunction, type Request, type Response } from 'express';
import { type IUser, User } from '../models/userModel';
import { sendValidationAccountMail } from '../helpers/sendEmail';

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
    const { email } = req.body;
    const findUser = await User.find({ email });
    if (findUser.length !== 0) {
      res.json({
        error: 'An account is already registered with your email.'
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user == null) {
      next(new AppError('There is no user registered with that email.', 400));
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
        message: 'Invalid password'
      });
    }

    createSendToken(user, 200, res);
    next();
  }
);
