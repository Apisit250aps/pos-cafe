import suppliers, { ISupplier } from '@/models/suppliers';
import { IResponse } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export default async function updateSupplier(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{
      id: string;
    }>;
  }
): Promise<NextResponse<IResponse<ISupplier>>> {
  try {
    const { id } = await params;
    const supplier: ISupplier = await req.json();
    if (!supplier.name || !supplier.contract_person || !supplier.phone) {
      return NextResponse.json(
        { message: 'Missing required fields', success: false },
        { status: 400 }
      );
    }
    supplier._id = undefined;
    const updatedSupplier = await suppliers.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...{
            name: supplier.name,
            contract_person: supplier.contract_person,
            phone: supplier.phone,
            email: supplier.email,
            address: supplier.address,
            status: supplier.status ? supplier.status : undefined
          },
          updatedAt: new Date()
        }
      }
    );
    if (updatedSupplier.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Supplier not found', success: false },
        { status: 404 }
      );
    }
    if (updatedSupplier.modifiedCount === 0) {
      return NextResponse.json(
        { message: 'No changes made to the supplier', success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: 'Supplier updated successfully',
        success: true,
        data: supplier
      },
      { status: 200 }
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
