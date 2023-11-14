/* eslint-disable @typescript-eslint/no-base-to-string */
import { Product, type IProduct } from '../models/productModel';
import {
  IOrder,
  type IOrderCombo,
  type IOrderProduct
} from '../models/orderModel';
import { Combo, type ICombo } from '../models/comboModel';

export const calculateTotalOrder = async (order: IOrder): Promise<any> => {
  try {
    let totalAmount = 0;
    let totalPoints = 0;

    if (order.products && order.products.length > 0) {
      const productsId = order.products.map((product) => product.product);
      const products = await Product.find({ _id: { $in: productsId } });
      const totalAmountProducts = calculateTotalAmountProducts(order.products, products);
      const totalPointsProducts = calculateTotalPointsProducts(order.products, products);
      totalAmount += totalAmountProducts;
      totalPoints += totalPointsProducts;
    }

    if (order.combos && order.combos.length > 0) {
      const combosId = order.combos.map((combo) => combo.combo);
      const combos = await Combo.find({ _id: { $in: combosId } });
      const totalAmountCombos = calculateTotalAmountCombos(order.combos, combos);
      const totalPointsCombos = calculateTotalPointsCombos(order.combos, combos);
      totalAmount += totalAmountCombos;
      totalPoints += totalPointsCombos;
    }

    return { totalAmount, totalPoints };
  } catch (err) {
    console.log(err);
  }
};

const calculateTotalAmountProducts = (
  orderProducts: IOrderProduct[],
  products: IProduct[]
): number => {
  return products.reduce((total, product) => {
    const orderProduct = orderProducts.find(
      (p) => p.product.toString() === product._id.toString()
    );
    if (orderProduct !== null && orderProduct !== undefined) {
      const quantity = orderProduct.quantity;
      const price =
        product.salePrice != null ? product.salePrice : product.price;

      return total + price * quantity;
    }

    return total;
  }, 0);
};
const calculateTotalAmountCombos = (
  orderCombos: IOrderCombo[],
  combos: ICombo[]
): number => {
  return combos.reduce((total, combo) => {
    const orderCombo = orderCombos.find(
      (p) => p.combo.toString() === combo._id.toString()
    );
    if (orderCombo !== null && orderCombo !== undefined) {
      return total + combo.price * orderCombo.quantity;
    }

    return total;
  }, 0);
};

const calculateTotalPointsProducts = (
  orderProducts: IOrderProduct[],
  products: IProduct[]
): number => {
  return products.reduce((total, product) => {
    const orderProduct = orderProducts.find(
      (p) => p.product.toString() === product._id.toString()
    );
    if (orderProduct !== null && orderProduct !== undefined) {
      const quantity = orderProduct.quantity;
      const points = product.points;

      return total + points * quantity;
    }

    return total;
  }, 0);
};

const calculateTotalPointsCombos = (
  orderCombos: IOrderCombo[],
  combos: ICombo[]
): number => {
  return combos.reduce((total, combo) => {
    const orderCombo = orderCombos.find(
      (p) => p.combo.toString() === combo._id.toString()
    );
    if (orderCombo !== null && orderCombo !== undefined) {
      return total + combo.points * orderCombo.quantity;
    }

    return total;
  }, 0);
};
