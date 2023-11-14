
import { Combo } from './combo';
import { Product } from './product';
import { Employee } from './employee';
import { User } from './user';
import { Discount } from './discount';

export interface Order {
  _id: string;
  orderNumber: string;
  products?: OrderProduct[];
  combos?: OrderCombo[];
  customer: User;
  pickUpDateTime: string;
  isPickUpTimeConfirmed: boolean;
  actualPickUpDateTime: string;
  notes?: string;
  status: string;
  date: string;
  totalAmount: number;
  totalPoints: number;
  discountedAmount?: number;
  discountCode?:Discount;
  employee?: Employee;
  qualification?: number;
}

export interface OrderProduct {
  id: string;
  product: Product;
  quantity: number;
}

export interface OrderCombo {
  id: string;
  combo: Combo;
  quantity: number;
}

export interface OrderList{
    ok: boolean;
    orders: Order[];
}

export interface OrderResponse{
  ok: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reference: any;
  order: Order;
}
