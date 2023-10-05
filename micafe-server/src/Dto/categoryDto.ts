import { type ObjectId } from 'mongoose';

export interface CategoryDto {
  _id: ObjectId;
  name: string;
  totalProducts: number;
}
