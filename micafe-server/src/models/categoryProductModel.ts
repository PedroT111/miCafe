import mongoose, { Schema } from 'mongoose';
import { Product } from './productModel';
import AppError from '../utils/appError';

interface ICategoryProduct extends Document {
  name: string;
  isDeleted: boolean;
}

const categoryProductSchema: Schema<ICategoryProduct> = new Schema({
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
  if (!this.isModified('isDeleted')) return next();
  const categoryId = this._id;
  const products = await Product.find({ categoryId });
  if (products.length != 0 && this.isDeleted) {
    return next(
      new AppError(
        'Cannot delete the category because it has associated products.',
        409
      )
    );
  }
  next();
});

const CategoryProduct = mongoose.model<ICategoryProduct>(
  'CategoryProduct',
  categoryProductSchema
);

export { ICategoryProduct, CategoryProduct };
