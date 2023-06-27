import {User, IUser } from '../models/userModel';
import catchAsync from '../utils/catchAsync';

export const getOneByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({email});
}

export const createOne = async (userData: IUser) => {
    const user = new User(userData);
    return await user.save();
}

export const getOneByToken = async (validationToken: string): Promise<IUser | null> => {
    return await User.findOne({validationToken});
}