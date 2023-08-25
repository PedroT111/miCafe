import { type NextFunction, type Request, type Response } from 'express';
import {
  deleteOne,
  getOneByEmail,
  getOneById,
  getOneByToken,
  update
} from '../services/user';
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
    const id = req.headers.user as string;
    const user = await getOneById(id);
    res.status(200).json({
      ok: true,
      user
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { _id } = req.params;
    const userToEdit = { ...req.body };

    if (_id !== req.headers.user) {
      next(new AppError('Something was wrong!', 400));
      return;
    }
    if (req.body.email != null) {
      next(new AppError('Cannot modify email or password', 400));
      return;
    }
    const query = await update(_id, userToEdit);
    if (query == null) {
      next(new AppError('Something was wrong!', 400));
      return;
    }

    res.status(200).json({
      ok: true,
      query
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { _id } = req.params;
    if (_id !== req.headers.user) {
      next(new AppError('Something was wrong!', 400));
      return;
    }
    const deletedUser = await deleteOne(_id);
    if (deletedUser == null) {
      next(new AppError('Something was wrong!', 400));
      return;
    }

    res.status(200).json({
      ok: true,
      deletedUser
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
