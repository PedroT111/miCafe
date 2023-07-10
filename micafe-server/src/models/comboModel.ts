import mongoose, { Schema } from 'mongoose';
import AppError from '../utils/appError';

interface ICombo extends Document {
  name: string;
  price: number;
  description: string;
  urlImage: string;
  products: [];
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
  ]
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
  next();
});

const Combo = mongoose.model<ICombo>('Combo', comboSchema);

export { type ICombo, Combo };
