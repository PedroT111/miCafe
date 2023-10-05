import { type ObjectId } from 'mongoose';

export interface IUserWithOrderCountDTO {
  _id: ObjectId;
  name: string;
  lastName: string;
  email: string;
  orderCount: number;
  isValidated: boolean;
}
