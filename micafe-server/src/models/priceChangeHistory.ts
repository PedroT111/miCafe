import mongoose, { Schema, type ObjectId } from 'mongoose';

interface IChangePriceHistory extends Document {
  productId: ObjectId;
  previousPrice: number;
  newPrice: number;
  timestamp: Date;
}

const changePriceHistorySchema = new Schema<IChangePriceHistory>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  previousPrice: {
    type: Number,
    required: true
  },
  newPrice: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ChangePriceHistory = mongoose.model<IChangePriceHistory>(
  'ChangePriceHistory',
  changePriceHistorySchema
);

export { type IChangePriceHistory, ChangePriceHistory };
