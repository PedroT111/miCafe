import { ObjectId } from 'mongoose';
import { Order, type IOrder } from '../models/orderModel';
import { applyDiscount } from '../utils/applyDiscount';
import { isAfter, isSameDay} from 'date-fns';

export const create = async (order: IOrder): Promise<IOrder | null> => {
  let newOrder = order;
  let query = null;
  try {
    if (order.discountCode != null) {
      const orderWithDiscount = await applyDiscount(
        order,
        order.discountCode,
        order.customer.toString()
      );
      if (orderWithDiscount === null) {
        return null;
      }
      if (orderWithDiscount) {
        newOrder = orderWithDiscount;
      }
    }

    const orderInstance = new Order(newOrder);
    await orderInstance.save();
    query = orderInstance;
  } catch (err) {
    console.log(err);
  }
  return query;
};

export const getAll = async (): Promise<IOrder[]> => {
  return await Order.find()
    .populate('customer')
    .populate('products.product')
    .populate('combos.combo')
    .populate('employee')
    .sort({ pickUpDateTime: -1 });
};

export const getOne = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id)
    .populate('customer')
    .populate('products.product')
    .populate('combos.combo')
    .populate('employee')
    .populate('discountCode');
};

export const getDetailOrders = async (status: string): Promise<IOrder[]> => {
  return await Order.find({ status })
    .populate('customer')
    .populate('products.product')
    .populate('combos.combo')
    .populate('employee')
    .sort({ pickUpDateTime: 1 });
};
export const getOrdersByStatusAndEmployee = async (
  status: string,
  id: string
): Promise<IOrder[]> => {
  return await Order.find({ status, employee: id })
    .populate('customer')
    .populate('products.product')
    .populate('combos.combo')
    .populate('employee')
    .sort({ pickUpDateTime: -1 });
};

export const changeOrderStatus = async (
  id: string,
  status: 'pickedUp' | 'cancelled' | 'inProcess' | 'pending'
): Promise<IOrder | null> => {
  console.log(status, 'st');
  try {
    const order = await Order.findById(id);
    if (!order) {
      return null;
    }
    if (status === 'pickedUp') {
      order.actualPickUpDateTime = new Date();
    }
    if (status === 'pending') {
      order.employee = null;
      order.actualPickUpDateTime = null;
    }

    order.status = status;
    await order.save();
    return order;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const assignOrder = async (
  id: string,
  employeeId: ObjectId
): Promise<boolean> => {
  const order = await Order.findById(id);
  if (!order) {
    return false;
  }
  order.status = 'inProcess';
  order.employee = employeeId;

  await order.save();
  return true;
};

export const paymentOrder = async (id: string): Promise<IOrder | null> => {
  const order = await Order.findById(id);
  try {
    if (!order) {
      return null;
    }

    order.paymentStatus = 'success';
    await order.save();
  } catch (err) {
    console.log(err);
  }
  return order;
};

export const updateOrderEmployee = async (
  id: string,
  employeeId: ObjectId
): Promise<IOrder | null> => {
  const order = await Order.findById(id);
  try {
    if (!order) {
      return null;
    }

    order.employee = employeeId;
    await order.save();
  } catch (err) {
    console.log(err);
  }
  return order;
};

export const getOrdersByUser = async (id: string): Promise<IOrder[]> => {
  console.log(id);
  return await Order.find({ customer: id })
    .populate('customer')
    .populate('products.product')
    .populate('combos.combo')
    .sort({ date: -1 });
};

export const rateOrder = async (
  orderId: string,
  rate: number
): Promise<IOrder | null> => {
  return await Order.findByIdAndUpdate(
    orderId,
    {
      qualification: rate
    },
    { new: true }
  );
};

export const updatePickUpDateTime = async (
  orderId: string,
  pickUpDateTime: Date
): Promise<IOrder | null> => {
  const order = await Order.findById(orderId);

  if (!order) {
    return null;
  } 

  if(order.status != 'pending'){
    return null;
  }
  const currentTime = new Date();
  if(isAfter(new Date(pickUpDateTime), currentTime)){
    order.pickUpDateTime = pickUpDateTime;
    await order.save();
    return order;
  }
  /*
  const currentTime = new Date();
  const sameDay = isSameDay(order.pickUpDateTime, currentTime);
  console.log(order.pickUpDateTime, 'order date')
  console.log(pickUpDateTime, 'data')
  console.log(currentTime, 'ct')
  if (order.pickUpDateTime instanceof Date && currentTime instanceof Date && sameDay) {
    const timeDifference = (order.pickUpDateTime.getTime() - currentTime.getTime()) / 60000; // Corrección en la fórmula (60000 en lugar de 6000)
    console.log(timeDifference, 'td')
    if (timeDifference <= 10) { 
      return null;
    }
  }
  console.log(pickUpDateTime, 'pckdt')
  console.log(currentTime, 'ct')
  if (isAfter(new Date(pickUpDateTime), currentTime)) {
    console.log('hola')
    console.log(new Date(pickUpDateTime), 'holasda')
    order.pickUpDateTime = pickUpDateTime;
    await order.save();
    return order; 
  }*/

  return null;
};
