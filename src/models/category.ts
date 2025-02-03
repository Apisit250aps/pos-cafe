import { db } from '@/libs/database/client';
import { Document } from 'mongodb';

export interface ICategory extends Document {
  name: string;
  description?: string;
  useFor: 'item' | 'menu';
  createdAt?: Date;
  updatedAt?: Date;
}

const category = db.collection<ICategory>('categories');

export default category;
