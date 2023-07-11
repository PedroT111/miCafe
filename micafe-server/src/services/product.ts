import { type IProduct, Product } from '../models/productModel';

export const create = async (productData: IProduct): Promise<IProduct> => {
  return await Product.create(productData);
};

export const getAll = async (): Promise<IProduct[]> => {
  return await Product.find();
};

export const getOne = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id);
};

export const getByName = async (name: string): Promise<IProduct | null> => {
  return await Product.findOne({ name });
};

export const getByCategory = async (
  categoryId: string
): Promise<IProduct[]> => {
  return await Product.find({ categoryId });
};

export const update = async (
  id: string,
  productData: Partial<IProduct>
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
