import { db } from '@/libs/database/client';
import { Document, ObjectId } from 'mongodb';
import { ICategory } from './category';

export interface IInventory extends Document {
  name: string;
  cost: number;
  category: ObjectId | ICategory;
  quantity: number;
  itemQuantity: number;
  itemUnit: string;
  stock: number;
  minStock: number;
  stockUnit: string;
  createdAt: Date;
  updatedAt: Date;
}

const inventory = db.collection<IInventory>('inventories');

export default inventory;
