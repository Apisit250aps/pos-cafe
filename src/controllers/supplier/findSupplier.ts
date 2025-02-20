import suppliers, { ISupplier } from '@/models/suppliers'
import { IResponse, Pagination } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export default async function findSupplier(
  req: NextRequest
): Promise<NextResponse<IResponse<ISupplier[] & { pagination?: Pagination }>>> {
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') ?? '1', 10)
    const limit = parseInt(searchParams.get('limit') ?? '10', 10)
    const sort = JSON.parse(searchParams.get('sort') ?? '{}')
    console.log(sort)
    const [data, totalDocs] = await Promise.all([
      suppliers
        .find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort)
        .toArray(),
      suppliers.countDocuments({})
    ])
    return NextResponse.json(
      {
        success: true,
        message: 'Success',
        data,
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(totalDocs / limit),
          totalDocs
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { message: 'Internal Server Error', success: false },
      { status: 500 }
    )
  }
}
