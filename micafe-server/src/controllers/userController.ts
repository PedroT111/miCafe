import { type NextFunction, type Request, type Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { deleteOne, getUsersWithOrderCount, update } from '../services/user';

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { _id } = req.params;
    const userToEdit = { ...req.body };

   /* if (_id !== req.headers.user) {
      next(new AppError('Something was wrong!', 400));
      return;
    }*/
    if (req.body.email != null) {
      next(new AppError('Cannot modify email or password', 400));
      return;
    }
    console.log(_id, userToEdit);
    const query = await update(_id, userToEdit);

    if (query == null) {
      next(new AppError('Something was wrong!', 400));
      return;
    }

    res.status(200).json({
      ok: true,
      user: query
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { _id } = req.params;
    const deletedUser = await deleteOne(_id);
    if (deletedUser == null) {
      next(new AppError('Something was wrong!', 400));
      return;
    }

    res.status(200).json({
      ok: true,
      msg: 'Usuario eliminado correctamente'
    });
  }
);
export const getUsersByRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { role } = req.params;
    const users = await getUsersWithOrderCount(role);
    if (users.length === 0) {
      next(new AppError('No registered users wit this rol', 400));
    }
    res.status(200).json({
      ok: true,
      users
    });
  }
);
