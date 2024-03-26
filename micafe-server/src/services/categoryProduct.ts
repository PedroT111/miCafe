import { CategoryProductsDTO, type CategoryDto } from '../Dto/categoryDto';
import {
  CategoryProduct,
  type ICategoryProduct
} from '../models/categoryProductModel';
import { Product } from '../models/productModel';

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
        let: { categoryId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$category', '$$categoryId'] },
                  { $eq: ['$isDeleted', false] }
                ]
              }
            }
          }
        ],
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
    },
    { $sort: { name: 1 } }
  ]);
};

export const detail = async (id: string): Promise<ICategoryProduct | null> => {
  return await CategoryProduct.findById(id);
};

export const getProductsCategories = async (): Promise<
  CategoryProductsDTO[]
> => {
  return await Product.aggregate([
    {
      $match: { isDeleted: false, isActive: true, isOnSale: false }
    },
    {
      $lookup: {
        from: 'categoryproducts',
        localField: 'category',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $unwind: '$category'
    },
    {
      $group: {
        _id: '$category._id',
        name: { $first: '$category.name' },
        products: { $push: '$$ROOT' }
      }
    },
    { $sort: { name: 1 } }
  ]);
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
