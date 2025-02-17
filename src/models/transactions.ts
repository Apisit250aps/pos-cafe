import { db } from '@/libs/database/client';
import { Document, ObjectId } from 'mongodb';

export interface ITransaction extends Document {
  _id: string | ObjectId;
  item: string | ObjectId;
  type: 'in' | 'out';
  quantity: number;
  refId: string;
  ref: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}

const transaction = db.collection<ITransaction>('transactions');

export default transaction;