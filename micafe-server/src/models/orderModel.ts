import mongoose, { Schema, type ObjectId } from 'mongoose';
import { Product } from './productModel';
import { Combo } from './comboModel';
import {
  calculateTotalAmountCombos,
  calculateTotalAmountProducts,
  calculateTotalPointsCombos,
  calculateTotalPointsProducts
} from '../utils/orderCalculations';
import { User } from './userModel';

interface IOrder extends Document {
  _id: Schema.Types.ObjectId;
  orderNumber: string;
  products: IOrderProduct[];
  combos: IOrderCombo[];
  totalPoints: number;
  totalAmount: number;
  discountedAmount?: number;
  discountCode?: ObjectId;
  customer: ObjectId;
  employee?: ObjectId;
  date: Date;
  pickUpDateTime: Date;
  isPickUpTimeConfirmed: boolean;
  notes: string;
  qualification?: number;
  status: 'picked up' | 'in process' | 'pending' | 'cancelled';
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
  discountCode: {
    type: Schema.Types.ObjectId
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
  }
});

orderSchema.pre('save', async function (next) {
  const productsId = this.products.map((product) => product.product);
  const combosId = this.combos.map((combo) => combo.combo);
  const [products, combos] = await Promise.all([
    Product.find({ _id: { $in: productsId } }),
    Combo.find({ _id: { $in: combosId } })
  ]);

  const totalAmountProducts = calculateTotalAmountProducts(
    this.products,
    products
  );

  const totalAmountCombos = calculateTotalAmountCombos(this.combos, combos);

  const totalAmount = totalAmountProducts + totalAmountCombos;
  this.totalAmount = totalAmount;

  const totalProductPoints = calculateTotalPointsProducts(
    this.products,
    products
  );

  const totalCombosPoints = calculateTotalPointsCombos(this.combos, combos);

  const totalPoints = totalProductPoints + totalCombosPoints;
  this.totalPoints = totalPoints;

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


const Order = mongoose.model<IOrder>('Order', orderSchema);

export { Order, type IOrder, type IOrderProduct, type IOrderCombo };
