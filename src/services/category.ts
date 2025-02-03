import { ICategory } from '@/models/category';
import { IResponse, Pagination, Query } from '@/services';
import axios, { AxiosError } from 'axios';

export async function addCategory(
  category: ICategory
): Promise<IResponse<ICategory>> {
  try {
    const {
      data: { success, message, data }
    } = await axios.post<IResponse<ICategory>>('/api/pos/category', category);
    return { success, message, data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.response?.data.message };
    }
    return { success: false, message: 'Server error' };
  }
}

export async function fetchCategories({
  page = 1,
  limit = 10
}: Query): Promise<IResponse<ICategory[]> & { pagination?: Pagination }> {
  try {
    const {
      data: { success, message, data, pagination }
    } = await axios.get<
      IResponse<ICategory[] & { pagination?: Pagination }> & {
        pagination: Pagination;
      }
    >('/api/pos/category', { params: { page, limit } });
    return { success, message, data, pagination };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.response?.data.message };
    }
    return {
      success: false,
      message: 'Server error'
    };
  }
}

export async function editCategory(
  category: ICategory
): Promise<IResponse<ICategory>> {
  try {
    const {
      data: { success, message, data }
    } = await axios.put<IResponse<ICategory>>(
      `/api/pos/category/${category._id}`,
      category
    );
    return { success, message, data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.response?.data.message };
    }
    return { success: false, message: 'Server error' };
  }
}

export async function removeCategory(id: string): Promise<IResponse> {
  try {
    const {
      data: { success, message }
    } = await axios.delete(`/api/pos/category/${id}`);
    return { success, message };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.response?.data.message };
    }
    return { success: false, message: 'Server error' };
  }
}
