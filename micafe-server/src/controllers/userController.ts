import { NextFunction, Request, Response } from "express";
import { getOneByEmail, getOneById, getOneByToken, update } from '../services/user';
import { generateToken } from "../helpers/generateToken";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { sendResetPasswordEmail} from "../helpers/sendEmail";

export const validateAccount = catchAsync( async (req: Request, res: Response): Promise<void> => {
    const {validationToken} = req.params;
    const user = await getOneByToken(validationToken);
    if(!user){
        res.json({
            error: 'The user does not exist'
        });
        return;
    }
    user.validationToken = null;
    user.isValidated= true;
    await user.save();
    res.status(200).json({
        msg: 'The account has been confirmed'
    })
});

export const forgotPassword = catchAsync( async (req: Request, res: Response): Promise<void> => {
    const {email} = req.body;
    const user = await getOneByEmail(email);
    if(!user){
        res.json({
            error: 'User not found'
        });
        return;
    }
    user.validationToken = generateToken();
    await user.save();
    //Send email
    user.password= ' ';
    await sendResetPasswordEmail(email, user);
    res.json({
        msg: 'Check you email'
    })

});

export const resetPassword = catchAsync( async (req: Request, res: Response): Promise<void> => {
    const {validationToken} = req.params;
    const {password} = req.body;
    const user = await getOneByToken(validationToken);
    if(!user){
        res.json({
            error: 'Invalid reset token'
        });
        return;
    }
    user.validationToken = null;
    user.password = password;
    user.save();
    res.status(200).json({
        msg: 'The password has been updated'
    })
});

export const getMe = catchAsync( async (req: Request, res: Response): Promise<void> => {
    const id = req.headers.user;
    const user = await getOneById(id);
    res.status(200).json({
        status: 'success',
        user
    });
});

export const updateUser = catchAsync( async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {_id} = req.params;
    const userToEdit = {...req.body};
    if(_id !== req.headers.user){
        return next(new AppError('Something was wrong!', 400));
    }
   if(req.body.email || req.body.password){
        return next(new AppError('Cannot modify email or password', 400));
    }
    const query = await update(_id, userToEdit);
    if(!query) return next(new AppError('Something was wrong!', 400));
    
    res.status(200).json({
        status: 'success',
        query
    })
})

