import mongoose, { Schema, type ObjectId } from 'mongoose';

interface IOffer extends Document {
  productId: ObjectId;
  isPercentage: boolean;
  value: number;
  startSale: Date;
  endSale: Date;
  status: 'active' | 'expired' | 'scheduled';
  isDeleted: boolean;
}

const offerModel = new Schema<IOffer>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  isPercentage: {
    type: Boolean,
    default: true,
    required: true
  },
  value: {
    type: Number
  },
  startSale: {
    type: Date,
    required: true
  },
  endSale: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'scheduled'],
    default: 'scheduled'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
offerModel.pre('save', function (next) {
  const now = new Date();
  if (this.endSale <= now && now >= this.startSale) {
    this.status = 'active';
  } else if (this.endSale < now) {
    this.status = 'expired';
  }
  next();
});

const Offer = mongoose.model<IOffer>('Offer', offerModel);

export { type IOffer, Offer };
