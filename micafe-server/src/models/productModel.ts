import mongoose, { Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  urlImage: string;
  categoryId: Schema.Types.ObjectId;
  hasMilk: boolean;
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
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'CategoryProduct',
    required: true
  },
  hasMilk: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export { type IProduct, Product };
