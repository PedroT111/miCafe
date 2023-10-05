import { type CategoryDto } from '../Dto/categoryDto';
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

export const findAll = async (): Promise<CategoryDto[]> => {
  return await CategoryProduct.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'category',
        as: 'products'
      }
    },
    {
      $match: {
        isDeleted: false
      }
    },
    {
      $project: {
        _id: '$_id',
        name: '$name',
        totalProducts: { $size: '$products' }
      }
    }
  ]);
};

export const detail = async (id: string): Promise<ICategoryProduct | null> => {
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

export const deleteOne = async (
  category: ICategoryProduct
): Promise<ICategoryProduct | null> => {
  const categoryDelete = await CategoryProduct.findById(category._id);
  if (categoryDelete != null) {
    categoryDelete.isDeleted = true;
    await categoryDelete.save();
  }
  return categoryDelete;
};
