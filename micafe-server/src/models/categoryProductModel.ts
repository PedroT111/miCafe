import mongoose, { type ObjectId, Schema } from 'mongoose';
import { Product } from './productModel';
import AppError from '../utils/appError';

interface ICategoryProduct extends Document {
  _id: ObjectId;
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
  console.log(categoryId);
  const products = await Product.find({ category: categoryId });
  console.log(products);
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
