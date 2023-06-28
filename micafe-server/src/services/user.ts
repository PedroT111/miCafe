import { User, IUser } from '../models/userModel';

export const getOneByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const getOneByToken = async (
  validationToken: string
): Promise<IUser | null> => {
  return await User.findOne({ validationToken });
};

export const getOneById = async (id: any): Promise<IUser | null> => {
  return await User.findById(id).select('-password -validationToken');
};

export const createOne = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

export const update = async (id: any, user: IUser): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    id,
    {
      ...user,
      updateAt: new Date()
    },
    { new: true }
  );
};

export const deleteOne = async (id: any): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    id,
    {
      $set: { isDeleted: true }
    },
    { new: true }
  );
};
