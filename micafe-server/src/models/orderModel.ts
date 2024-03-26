import mongoose, { Schema, type ObjectId } from 'mongoose';
import { User } from './userModel';

interface IOrder extends Document {
  _id: Schema.Types.ObjectId;
  orderNumber: string;
  products: IOrderProduct[];
  combos: IOrderCombo[];
  totalPoints: number;
  totalAmount: number;
  discountAmount?: number;
  discountedAmount?: number;
  discountCode?: string;
  customer: ObjectId;
  employee?: ObjectId | null;
  date: Date;
  pickUpDateTime: Date;
  isPickUpTimeConfirmed: boolean;
  actualPickUpDateTime?: Date | null;
  notes: string;
  qualification: number;
  paidWithPoints: boolean;
  status: 'pickedUp' | 'inProcess' | 'pending' | 'cancelled';
  paymentStatus: 'success' | 'failed' | 'pending';
}
interface IOrderProduct {
  product: ObjectId;
  quantity: number;
}

interface IOrderCombo {
  combo: ObjectId;
  quantity: number;
}

const orderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String
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
  combos: [
    {
      combo: {
        type: Schema.Types.ObjectId,
        ref: 'Combo'
      },
      quantity: Number
    }
  ],
  totalAmount: {
    type: Number
  },
  discountAmount: {
    type: Number
  },
  discountCode: {
    type: String
  },
  discountedAmount: {
    type: Number
  },
  totalPoints: {
    type: Number
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  pickUpDateTime: {
    type: Date,
    required: true
  },
  isPickUpTimeConfirmed: {
    type: Boolean,
    default: false
  },
  actualPickUpDateTime: {
    type: Date
  },
  notes: {
    type: String
  },
  qualification: {
    type: Number
  },
  status: {
    type: String,
    enum: ['pickedUp', 'inProcess', 'pending', 'cancelled'],
    default: 'pending'
  },
  paidWithPoints: {
    type: Boolean,
    default: false
  },
  paymentStatus: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'pending'
  }
});

orderSchema.pre('save', async function (next) {
  if (this.isModified('status') || this.isModified('employee')) {
    next();
    return;
  }
  if (this.totalPoints) {
    const pointsEarned = Math.floor(this.totalPoints * 0.1); //El usuario acumula el 10% de los puntos de la orden
    if (this.customer) {
      const user = await User.findById(this.customer);
      if (user !== null) {
        if (user.points !== undefined) {
          user.points += pointsEarned;
          await user.save();
        }
      }
    }
  }

  next();
});

orderSchema.pre('save', async function (next) {
  const user = await User.findById(this.customer);
  if (user !== null) {
    user.lastOrderDate = new Date();
    await user.save();
  }
  next();
});
orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = 'ORD-' + this._id.toString().slice(-4).toUpperCase();
  }
  next();
});
orderSchema.pre('save', async function (next) {
  if (this.isModified('status') || this.isModified('employee')) {
    next();
    return;
  }
  if (this.paidWithPoints) {
    const user = await User.findById(this.customer);
    if (user !== null) {
      if (user.points) {
        user.points -= this.totalPoints;
        await user.save();
      }
    }
  }
  next();
});
const Order = mongoose.model<IOrder>('Order', orderSchema);

export { Order, type IOrder, type IOrderProduct, type IOrderCombo };
