import {
  CategoryProduct,
  type ICategoryProduct
} from '../models/categoryProductModel';

export const createOne = async (
  categoryData: ICategoryProduct
): Promise<ICategoryProduct> => {
  const category = new CategoryProduct(categoryData);
  return await category.save();
};

export const findOneByName = async (
  name: string
): Promise<ICategoryProduct | null> => {
  return await CategoryProduct.findOne({ name });
};

export const findAll = async (): Promise<ICategoryProduct[]> => {
  return await CategoryProduct.find({ isDeleted: false });
};

export const detail = async (id: any): Promise<ICategoryProduct | null> => {
  return await CategoryProduct.findById(id);
};

export const update = async (
  id: string,
  data: ICategoryProduct
): Promise<ICategoryProduct | null> => {
  return await CategoryProduct.findByIdAndUpdate(
    id,
    {
      ...data,
      updateAt: new Date()
    },
    { new: true }
  );
};
