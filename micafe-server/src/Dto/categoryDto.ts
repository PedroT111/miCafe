import { type ObjectId } from 'mongoose';
import { IProduct } from '../models/productModel';

export interface CategoryDto {
  _id: ObjectId;
  name: string;
  totalProducts: number;
}

export interface CategoryProductsDTO{
  _id: ObjectId;
  name: string;
  products: IProduct[];
}
