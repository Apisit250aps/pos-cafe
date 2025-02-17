import suppliers from '@/models/suppliers';
import { IResponse } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { NextResponse } from 'next/server';

export default async function delSupplier(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{
      id: string;
    }>;
  }
): Promise<NextResponse<IResponse>> {
  try {
    const { id } = await params;
    const deleteSupplier = await suppliers.deleteOne({
      _id: new ObjectId(id)
    });
    if (!deleteSupplier.deletedCount) {
      return NextResponse.json({
        message: 'suppliers delete failed',
        success: false
      });
    }
    return NextResponse.json({
      message: 'Supplier deleted successfully',
      success: true
    });
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
