import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { getOneByToken } from '../services/user';

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

