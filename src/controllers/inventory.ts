import { IResponse } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function createInventory(
  req: NextRequest
): Promise<NextResponse<IResponse>> {
  try {
    const { name, quantity, price } = await req.json();
    if (!name || !quantity || !price) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields'
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: 'Item created successfully',
        data: { name, quantity, price }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: 'Server error',
        data: error
      },
      { status: 500 }
    );
  }
}
