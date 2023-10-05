import mongoose, { type ObjectId, Schema } from 'mongoose';
import AppError from '../utils/appError';
import { Product } from './productModel';

interface ICombo extends Document {
  _id: ObjectId;
  name: string;
  price: number;
  points: number;
  description: string;
  urlImage: string;
  products: IProductQuantity[];
  isActive: boolean;
  isDeleted: boolean;
}

interface IProductQuantity {
  product: ObjectId;
  quantity: number;
}

const comboSchema = new Schema<ICombo>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  urlImage: {
    type: String,
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number
    }
  ],
  points: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
comboSchema.pre('save', async function (next) {
  if (!this.isModified('products')) {
    next();
    return;
  }
  if (this.products.length === 0) {
    next(new AppError('The combo must have at least one product', 400));
    return;
  }
  const products = this.products;

  const productPromises = products.map(async (productItem) => {
    const product = await Product.findById(productItem.product);
    return product != null ? product.points * productItem.quantity : 0;
  });

  const pointsArray = await Promise.all(productPromises);
  const totalPoints = pointsArray.reduce((acc, points) => acc + points, 0);
  this.points = totalPoints;
  next();
});

const Combo = mongoose.model<ICombo>('Combo', comboSchema);

export { type ICombo, Combo };
