import mongoose, { Schema, type ObjectId } from 'mongoose';

interface IOffer extends Document {
  _id: ObjectId;
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
    type: Number,
    required: true
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
offerModel.pre('save', async function (next) {
  if (this.isNew) {
    const existingOffer = await Offer.findOne({
      productId: this.productId,
      isDeleted: false
    });

    if (existingOffer !== null) {
      existingOffer.isDeleted = true;
      existingOffer.status = 'expired';

      await existingOffer.save();
    }
  }

  next();
});

const Offer = mongoose.model<IOffer>('Offer', offerModel);

export { type IOffer, Offer };
