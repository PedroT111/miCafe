import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const isAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token == null) {
      next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
      return;
    }
    const decoded = jwt.verify(token, config.JWT) as JwtPayload;
    req.headers.role = decoded.role;
    if (req.headers.role === 'admin') next();
    else {
      next(new AppError('Unhautorized.', 401));
    }
  }
);
