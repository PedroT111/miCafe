import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import config from '../config';
import { User } from "../models/userModel";

const authenticateToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization?.split(' ')[1];
    }
    if(!token) return next(new AppError('You are not logged in! Please log in to get access.', 401));

    const decoded = jwt.verify(token, config.JWT ) as JwtPayload;
    req.headers.user = decoded.id;
    if (!decoded) return next(new AppError('Invalid token!', 401));
    next();
});

export default authenticateToken;