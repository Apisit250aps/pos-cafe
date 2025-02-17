import { db } from '@/libs/database/client';
import { Document, ObjectId } from 'mongodb';

export interface ISupplier extends Document {
  _id: string | ObjectId;
  name: string;
  contract_person: string;
  phone: string;
  email: string;
  address: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const suppliers = db.collection<ISupplier>('suppliers');
export default suppliers;
