import { User, type IUser } from '../models/userModel';

export const createEmployee = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  user.role = 'employee';
  return await user.save();
};

export const updateEmployee = async (
  user: Partial<IUser>,
  id: string
): Promise<IUser | null> => {
  const existingUser = await User.findById(id);

  if (existingUser == null) {
    return null;
  }
  if (user.name != null) {
    existingUser.name = user.name;
  }
  if (user.lastName != null) {
    existingUser.lastName = user.lastName;
  }
  if (user.password != null) {
    existingUser.password = user.password;
  }
  await existingUser.save();

  return existingUser;
};

export const deleteEmployee = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    id,
    {
      isDeleted: true
    },
    { new: true }
  );
};

export const getEmployee = async (id: string): Promise<IUser | null>  => {
  return await User.findById(id);
}
