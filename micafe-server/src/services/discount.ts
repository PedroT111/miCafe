import { Discount, type IDiscount } from '../models/discountModel';
import { type IUser } from '../models/userModel';
import mongoose from 'mongoose';

export const getOneByCode = async (code: string): Promise<IDiscount | null> => {
  return await Discount.findOne({ code });
};

export const getActiveDiscountByUser = async (code: string, userId: string): Promise<IDiscount| null> => {
  return await Discount.findOne({
    code,
    user: userId,
    status: 'active',
    used: false
  })
}

export const getAll = async (): Promise<IDiscount[]> => {
  const discounts = await Discount.aggregate([
    {
      $match: {
        isDeleted: false
      }
    },
    {
      $group: {
        _id: '$code',
        count: { $sum: 1 },
        usedDiscounts: {
          $sum: { $cond: { if: '$used', then: 1, else: 0 } }
        },
        description: { $first: '$description' },
        discountType: { $first: '$discountType' },
        value: { $first: '$value' },
        expirationDate: { $first: '$expirationDate' },
        status: { $first: '$status' }
      }
    },
    {
      $project: {
        _id: 0,
        code: '$_id',
        description: 1,
        discountType: 1,
        value: 1,
        expirationDate: 1,
        status: 1,
        count: 1,
        usedDiscounts: 1
      }
    }
  ]);
  discounts.sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') {
      return -1;
    }
    if (a.status !== 'active' && b.status === 'active') {
      return 1;
    }

    return a.expirationDate - b.expirationDate;
  });

  return discounts;
};

export const createDiscountsForUsers = async (
  users: IUser[],
  discountData: IDiscount
): Promise<IDiscount[]> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const discounts = [];

    for (const user of users) {
      const discount = new Discount({
        ...discountData,
        user: user._id
      });

      await discount.save({ session });

      discounts.push(discount);
    }

    await session.commitTransaction();
    void session.endSession();

    return discounts;
  } catch (error) {
    await session.abortTransaction();
    void session.endSession();
    throw error;
  }
};

export const deleteDiscount = async (code: string): Promise<boolean> => {
  const result = await Discount.updateMany(
    { code },
    {
      isDeleted: true,
      status: 'expired'
    }
  );

  return result.modifiedCount > 0;
};
