import { type IProduct, Product } from '../models/productModel';
import {
  type IChangePriceHistory,
  ChangePriceHistory
} from '../models/priceChangeHistory';
import { Combo } from '../models/comboModel';
import { CategoryProductsDTO } from '../Dto/categoryDto';

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
  return await Product.findOne({ name, isDeleted: false });
};

export const getByCategory = async (category: any): Promise<IProduct[]> => {
  return await Product.find({ category });
};

export const getOfferProducts = async (): Promise<IProduct[]> => {
  return await Product.find({ isOnSale: true });
};

export const productsNoSale = async (): Promise<IProduct[]> => {
  return await Product.find({ isOnSale: false, isDeleted: false });
};

export const updatePrices = async (
  idCategory: any,
  percentage: number
): Promise<IProduct[] | null> => {
  const products = await Product.find({
    category: idCategory,
    isDeleted: false
  });

  const updatedProducts = await Promise.all(
    products.map(async (p) => {
      const newPrice: number = p.price * (1 + percentage / 100);
      p.price = parseFloat(newPrice.toFixed(0));
      await p.save();
      return p;
    })
  );
  return updatedProducts;
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
  const product = await  Product.findById(id);

  if (product === null) {
    return null;
  }
  product.isDeleted = true;
  await product.save();

  return product;
};
