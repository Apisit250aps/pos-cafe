import suppliers, { ISupplier } from '@/models/suppliers';
import { IResponse } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export default async function insertSupplier(
  req: NextRequest
): Promise<NextResponse<IResponse<ISupplier>>> {
  try {
    const supplier: ISupplier = await req.json();
    if (!supplier.name || !supplier.contract_person || !supplier.phone) {
      return NextResponse.json(
        { message: 'Missing required fields', success: false },
        { status: 400 }
      );
    }
    const insertedSupplier = await suppliers.insertOne({
      ...supplier,
      createdAt: new Date()
    });
    if (!insertedSupplier.insertedId) {
      throw new Error('Failed to insert supplier data');
    }
    const foundSupplier = suppliers.find({
      _id: new ObjectId(insertedSupplier.insertedId)
    });
    if (!foundSupplier) {
      throw new Error('Failed to find inserted supplier');
    }
    return NextResponse.json(
      { success: true, message: 'Success', data: supplier },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}
