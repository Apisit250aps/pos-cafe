import inventories, { IInventory } from '@/models/inventories';
import { IResponse, Pagination } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';

export default async function allInventory(
  req: NextRequest
): Promise<
  NextResponse<IResponse<IInventory[] & { pagination?: Pagination }>>
> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const limit = parseInt(searchParams.get('limit') ?? '10', 10);
    const [data, totalDocs] = await Promise.all([
      inventories
        .find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .toArray(),
      inventories.countDocuments({})
    ]);
    return NextResponse.json({
      success: true,
      message: 'Inventory fetched successfully',
      data,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalDocs / limit),
        totalDocs
      }
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