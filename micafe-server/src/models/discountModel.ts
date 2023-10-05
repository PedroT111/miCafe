import mongoose, { type ObjectId, Schema } from 'mongoose';
interface IDiscount extends Document {
  _id: ObjectId;
  code: string;
  description: string;
  discountType: 'fixedAmount' | 'percentage';
  value: number;
  expirationDate: Date;
  user?: ObjectId;
  status: 'active' | 'expired';
  used: boolean;
  isDeleted: boolean;
}
const discountSchema = new Schema<IDiscount>({
  code: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    enum: ['fixedAmount', 'percentage'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active'
  },
  used: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const Discount = mongoose.model<IDiscount>('Discount', discountSchema);

export { Discount, type IDiscount };
