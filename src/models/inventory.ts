import { db } from '@/libs/database/client';
import { Document } from 'mongodb';

export interface IInventory extends Document {
  name: string;
  cost: number;
  category: string;
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
