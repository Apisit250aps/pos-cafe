import inventories, { IInventory } from '@/models/inventories'
import { IResponse, Pagination } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export default async function findInventory(
  req: NextRequest
): Promise<
  NextResponse<IResponse<IInventory[] & { pagination?: Pagination }>>
> {
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') ?? '1', 10)
    const limit = parseInt(searchParams.get('limit') ?? '10', 10)
    const [data, totalDocs] = await Promise.all([
      inventories
        .aggregate<IInventory>([
          {
            $addFields: {
              supplier: {
                $cond: {
                  if: { $eq: [{ $type: '$supplier' }, 'string'] },
                  then: { $toObjectId: '$supplier' },
                  else: '$supplier'
                }
              }
            }
          },
          {
            $lookup: {
              from: 'suppliers',
              localField: 'supplier',
              foreignField: '_id',
              as: 'supplierData'
            }
          },
          {
            $unwind: {
              path: '$supplierData',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $sort: { item_name: 1, current_quantity: 1 }
          },
          {
            $skip: (page - 1) * limit
          },
          {
            $limit: limit
          }
        ])
        .toArray(),

      inventories.countDocuments({}) // ใส่เงื่อนไขเดียวกันถ้ามี filter
    ])

    return NextResponse.json(
      {
        success: true,
        message: 'Inventory fetched successfully',
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
