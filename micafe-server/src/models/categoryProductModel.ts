import mongoose, { Schema } from 'mongoose';
import { Product } from './productModel';
import AppError from '../utils/appError';

interface ICategoryProduct extends Document {
  name: string;
  isDeleted: boolean;
}

const categoryProductSchema = new Schema<ICategoryProduct>({
  name: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
categoryProductSchema.pre('save', async function (next) {
  if (!this.isModified('isDeleted')) {
    next();
    return;
  }
  const categoryId = this._id;
  const products = await Product.find({ categoryId });
  if (products.length !== 0 && this.isDeleted) {
    next(
      new AppError(
        'Cannot delete the category because it has associated products.',
        409
      )
    );
    return;
  }
  next();
});

const CategoryProduct = mongoose.model<ICategoryProduct>(
  'CategoryProduct',
  categoryProductSchema
);

export { type ICategoryProduct, CategoryProduct };
