import { Order, type IOrder } from '../models/orderModel';

export const create = async (order: IOrder): Promise<IOrder | null> => {
  const newOrder = new Order(order);
  await newOrder.save();
  return newOrder;
};

export const getDetailOrders = async (status: string): Promise<IOrder[]> => {
  return await Order.find({ status })
    .populate('customer')
    .populate('products.product')
    .populate('combos.combo')
    .populate('employee')
    .sort({pickUpDateTime: 1})
};
export const getOrdersByStatusAndEmployee = async (status: string, id:string): Promise<IOrder[]> => {
  return await Order.find({ status, employee: id })
    .populate('customer')
    .populate('products.product')
    .populate('combos.combo')
    .populate('employee')
    .sort({pickUpDateTime: 1})
};

export const changeOrderStatus = async (
  id: string,
  status: 'picked up' | 'in process' | 'cancelled'
): Promise<boolean> => {
  const order = await Order.findById(id);
  if (!order) {
    return false;
  }

  order.status = status;
  await order.save();
  return true;
};
