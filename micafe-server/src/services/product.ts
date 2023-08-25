import { Date } from 'mongoose';
import { type IProduct, Product } from '../models/productModel';
import {
  type IChangePriceHistory,
  ChangePriceHistory
} from '../models/priceChangeHistory';

export const create = async (productData: IProduct): Promise<IProduct> => {
  return await Product.create(productData);
};

export const getAll = async (): Promise<IProduct[]> => {
  return await Product.find({ isDeleted: false });
};

export const getOne = async (id: any): Promise<IProduct | null> => {
  return await Product.findById(id);
};

export const getByName = async (name: string): Promise<IProduct | null> => {
  return await Product.findOne({ name });
};

export const getByCategory = async (category: any): Promise<IProduct[]> => {
  return await Product.find({ category });
};

export const getOfferProducts = async (): Promise<IProduct[]> => {
  return await Product.find({ isOnSale: true });
};

export const productsNoSale = async (): Promise<IProduct[]> => {
  return await Product.find({ isOnSale: false });
};

export const updatePrices = async (
  idCategory: any,
  percentage: number
): Promise<IProduct[] | null> => {
  const products = await Product.find({ category: idCategory });
  for (const p of products) {
    const newPrice: number = p.price * (1 + percentage / 100);
    p.price = parseFloat(newPrice.toFixed(2));

    await p.save();
  }

  return products;
};

export const createChangePriceHistory = async (
  productId: string,
  previousPrice: number,
  newPrice: number
): Promise<IChangePriceHistory | null> => {
  return await ChangePriceHistory.create({
    productId,
    previousPrice,
    newPrice
  });
};

export const update = async (
  id: any,
  productData: IProduct
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(
    id,
    {
      ...productData,
      updateAt: new Date()
    },
    { new: true }
  );
};

export const deleteOne = async (id: any): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(
    id,
    {
      isDeleted: true
    },
    { new: true }
  );
};
