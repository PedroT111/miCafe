import mongoose, { type ObjectId, Schema, type Date } from 'mongoose';
import { Combo } from './comboModel';
import { Offer } from './offerModel';

interface IProduct extends Document {
  _id: ObjectId;
  name: string;
  price: number;
  description: string;
  urlImage: string;
  category: Schema.Types.ObjectId;
  hasMilk: boolean;
  points: number;
  isOnSale: boolean;
  salePrice: number | null;
  isActive: boolean;
  isDeleted: boolean;
}

const productSchema = new Schema<IProduct>({
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
  category: {
    type: Schema.Types.ObjectId,
    ref: 'CategoryProduct',
    required: true
  },
  hasMilk: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,
    default: null
  },
  isActive: {
    type: Boolean,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

productSchema.pre('save', async function (next) {
  if (!this.isModified('isDeleted')) {
    next();
    return;
  }

  const productId = this._id;
  const combos = await Combo.find({ 'products.product': productId });
  const offers = await Offer.find({ productId});

  if (this.isDeleted) {
    await Promise.all(combos.map(async (combo) => {
      combo.isDeleted = true;
      await combo.save();
    }));
    await Promise.all(offers.map(async (offer) => {
      offer.isDeleted = true;
      await offer.save();
    }));
  }

  next();
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export { type IProduct, Product };
