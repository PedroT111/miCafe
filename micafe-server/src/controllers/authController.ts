import { type NextFunction, type Request, type Response } from 'express';
import { getOneByEmail, getOneById, getOneByToken } from '../services/user';
import { generateToken } from '../helpers/generateToken';
import { sendResetPasswordEmail } from '../helpers/sendEmail';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const validateAccount = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { validationToken } = req.params;
    const user = await getOneByToken(validationToken);
    if (user == null) {
      res.json({
        error: 'The user does not exist'
      });
      return;
    }
    user.validationToken = null;
    user.isValidated = true;
    await user.save();
    res.status(200).json({
      ok: true,
      msg: 'The account has been confirmed'
    });
  }
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    const user = await getOneByEmail(email);
    if (user == null) {
      res.status(404).json({
        error: 'User not found'
      });
      return;
    }
    user.validationToken = generateToken();
    await user.save();
    // Send email
    user.password = ' ';
    await sendResetPasswordEmail(user);
    res.status(200).json({
      ok: true,
      msg: 'Check you email'
    });
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { validationToken } = req.params;
    const { password } = req.body;
    const user = await getOneByToken(validationToken);
    if (user == null) {
      res.status(404).json({
        error: 'Invalid reset token'
      });
      return;
    }
    user.validationToken = null;
    user.password = password;
    await user.save();
    res.status(200).json({
      ok: true,
      msg: 'The password has been updated'
    });
  }
);

export const getMe = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const user = await getOneById(id);

    const userToSend = {
      ...user,
      password: ''
    }
    res.status(200).json({
      ok: true,
      user: userToSend
    });
  }
);

export const checkEmailExists = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;
    const user = await getOneByEmail(email);
    const exists = !(user == null);
    res.status(200).json({ exists });
  }
);
