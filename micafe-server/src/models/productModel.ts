import mongoose, { type ObjectId, Schema, type Date } from 'mongoose';

interface IProduct extends Document {
  _id: ObjectId;
  name: string;
  price: number;
  description: string;
  urlImage: string;
  category: Schema.Types.ObjectId;
  hasMilk: boolean;
  isOnSale: boolean;
  salePrice: number | null;
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
  isOnSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export { type IProduct, Product };
