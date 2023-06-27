import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { getOneByEmail, getOneById, getOneByToken } from '../services/user';
import { generateToken } from "../helpers/generateToken";

export const validateAccount = catchAsync( async (req: Request, res: Response) => {
    const {validationToken} = req.params;
    const user = await getOneByToken(validationToken);
    if(!user){
        return res.json({
            error: 'The user does not exist'
        })
    }
    user.validationToken = null;
    user.isValidated= true;
    await user.save();
    return res.status(200).json({
        msg: 'The account has been confirmed'
    })
});

export const forgotPassword = catchAsync( async (req: Request, res: Response) => {
    const {email} = req.body;
    const user = await getOneByEmail(email);
    if(!user){
        return res.json({
            error: 'User not found'
        })
    }
    user.validationToken = generateToken();
    await user.save();
    //Send email
    return res.json({
        msg: 'Check yout email'
    })

});

export const resetPassword = catchAsync( async (req: Request, res: Response) => {
    const {validationToken} = req.params;
    const {password} = req.body;
    const user = await getOneByToken(validationToken);
    if(!user){
        return res.json({
            error: 'Invalid reset token'
        })
    }
    user.validationToken = null;
    user.password = password;
    user.save();
    return res.status(200).json({
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
})

