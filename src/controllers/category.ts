import category, { ICategory } from '@/models/category';
import { IResponse, Pagination } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function createCategory(
  req: NextRequest
): Promise<NextResponse<IResponse<ICategory>>> {
  try {
    const { name, description, useFor } = await req.json();
    if (!name || !useFor) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required field or value for category'
        },
        { status: 400 }
      );
    }
    const existingCategory = await category.findOne({ name, useFor });
    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: 'Category already exists'
        },
        { status: 400 }
      );
    }
    const createdAt = new Date();
    const updatedAt = createdAt;
    const newCategory = await category.insertOne({
      name,
      description,
      useFor,
      createdAt,
      updatedAt
    } as ICategory);
    return NextResponse.json(
      {
        success: true,
        message: 'Category created successfully',
        data: {
          _id: newCategory.insertedId,
          name,
          description,
          useFor,
          createdAt,
          updatedAt
        } as ICategory
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: 'Server Error!'
    });
  }
}

export async function getCategories(
  req: NextRequest
): Promise<NextResponse<IResponse<ICategory[]> & { pagination?: Pagination }>> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const useFor = searchParams.get('useFor');
    const page = parseInt(searchParams.get('page') || '1', 10); // รับค่าหน้าเริ่มต้นเป็น 1
    const limit = parseInt(searchParams.get('limit') || '10', 10); // กำหนดจำนวนแถวต่อหน้า
    const query: Record<string, unknown> = {};
    if (name) {
      query.name = new RegExp(name, 'i'); // ใช้ RegExp เพื่อการค้นหาที่ไม่สนใจตัวพิมพ์ใหญ่-เล็ก
    }
    if (useFor) {
      query.useFor = useFor;
    }
    const skip = (page - 1) * limit;

    const [categories, totalDocs] = await Promise.all([
      category
        .find(query)
        .sort({ useFor: 1, name: 1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      category.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalDocs / limit);

    return NextResponse.json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
      pagination: {
        page: page,
        totalPages: totalPages,
        totalDocs: totalDocs,
        limit: limit
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
}
