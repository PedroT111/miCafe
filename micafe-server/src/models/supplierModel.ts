import mongoose, { type ObjectId, Schema, type Date } from 'mongoose';
import { Combo } from './comboModel';
import { Offer } from './offerModel';

interface ISupplier extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  celphone: string;
  address: string;
  isDeleted: boolean;
}

const supplierSchema = new Schema<ISupplier>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  celphone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const Supplier = mongoose.model<ISupplier>('Supplier', supplierSchema);

export { type ISupplier, Supplier};
