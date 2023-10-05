/* eslint-disable @typescript-eslint/no-base-to-string */
import { type IProduct } from '../models/productModel';
import { type IOrderCombo, type IOrderProduct } from '../models/orderModel';
import { type ICombo } from '../models/comboModel';

export const calculateTotalAmountProducts = (
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
export const calculateTotalAmountCombos = (
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

export const calculateTotalPointsProducts = (
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

export const calculateTotalPointsCombos = (
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
