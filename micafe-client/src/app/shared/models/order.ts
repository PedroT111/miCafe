
import { Combo } from './combo';
import { Product } from './product';
import { Employee } from './employee';
import { User } from './user';

export interface Order {
  _id: string;
  orderNumber: string;
  products?: OrderProduct[];
  combos?: OrderCombo[];
  customer: User;
  pickUpDateTime: Date;
  isPickUpTimeConfirmed: boolean;
  notes?: string;
  status: string;
  date: Date;
  totalAmount: number;
  totalPoints: number;
  discountedAmount?: number;
  discountCode?:string;
  employee?: Employee;
  qualification?: number;
}

interface OrderProduct {
  id: string;
  product: Product;
  quantity: number;
}

interface OrderCombo {
  id: string;
  combo: Combo;
  quantity: number;
}

export interface OrderList{
    ok: boolean;
    orders: Order[];
}
