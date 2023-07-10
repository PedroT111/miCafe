import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import config from '../config';

const authenticateToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization != null &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization?.split(' ')[1];
    }
    if (!token) {
      next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
      return;
    }

    const decoded = jwt.verify(token, config.JWT) as JwtPayload;
    req.headers.user = decoded.id;
    if (!decoded) {
      next(new AppError('Invalid token!', 401));
      return;
    }
    next();
  }
);

export default authenticateToken;
