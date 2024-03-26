import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { type IUserWithOrderCountDTO } from '../Dto/userDto';
import { User, type IUser } from '../models/userModel';

export const getAllCustomers = async (): Promise<IUser[]> => {
  return await User.find({ isDeleted: false, role: 'user' });
};
export const getOneByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email, isDeleted: false });
};

export const getOneByToken = async (
  validationToken: string
): Promise<IUser | null> => {
  return await User.findOne({ validationToken });
};

export const getOneById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).select('-password -validationToken').lean();
};

export const getUsersWithOrderCount = async (
  role: string
): Promise<IUser[]> => {
    return await User.find({role, isDeleted: false})
};

export const getTopClients = async (
  limit: number,
  filter: 'week' | 'month'
): Promise<IUser[]> => {
  const startDate =
    filter === 'week' ? startOfWeek(new Date()) : startOfMonth(new Date());

  const endDate =
    filter === 'week' ? endOfWeek(new Date()) : endOfMonth(new Date());
  return await User.aggregate([
    {
      $lookup: {
        from: 'orders',
        localField: '_id',
        foreignField: 'customer',
        as: 'orders'
      }
    },
    {
      $addFields: {
        totalPurchases: {
          $sum: '$orders.totalAmount'
        }
      }
    },
    {
      $match: {
        'orders.date': {
          $gte: startDate,
          $lt: endDate
        }
      }
    },
    {
      $sort: { totalPurchases: -1 }
    },
    {
      $limit: limit
    }
  ]);
};

export const getInactiveUsers = async (
  daysInactive: number
): Promise<IUser[]> => {
  const currentDate = new Date();
  const inactiveDateThreshold = new Date(
    currentDate.setDate(currentDate.getDate() - daysInactive)
  );

  const inactiveUsers = await User.find({
    isDeleted: false,
    role: 'user',
    lastOrderDate: { $lt: inactiveDateThreshold }
  });

  return inactiveUsers;
};
export const createOne = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

export const update = async (
  id: string,
  user: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    id,
    {
      ...user,
      updateAt: new Date()
    },
    { new: true }
  );
};

export const deleteOne = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    id,
    {
      $set: { isDeleted: true }
    },
    { new: true }
  );
};
