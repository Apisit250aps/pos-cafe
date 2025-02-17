import { ISupplier } from '@/models/suppliers';
import { IResponse, Pagination, Query } from '@/types/types';
import axios, { AxiosError } from 'axios';

export async function fetchSupplier({
  limit,
  page
}: Query): Promise<IResponse<ISupplier[]> & { pagination?: Pagination }> {
  try {
    const response = await axios.get<
      IResponse<ISupplier[]> & { pagination?: Pagination }
    >('/api/pos/supplier', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data.message
      };
    }
    return {
      success: false,
      message: 'Internal Server Error'
    };
  }
}

export async function createSupplier(
  supplier: ISupplier
): Promise<IResponse<ISupplier>> {
  try {
    const response = await axios.post<IResponse<ISupplier>>(
      '/api/pos/supplier',
      supplier
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data.message
      };
    }
    return {
      success: false,
      message: 'Internal Server Error'
    };
  }
}

export async function updateSupplier(
  supplier: ISupplier
): Promise<IResponse<ISupplier>> {
  try {
    const response = await axios.put<IResponse<ISupplier>>(
      `/api/pos/supplier/${supplier._id}`,
      supplier
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data.message
      };
    }
    return {
      success: false,
      message: 'Internal Server Error'
    };
  }
}

export async function deleteSupplier(id: string): Promise<IResponse> {
  try {
    const response = await axios.delete(`/api/pos/supplier/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data.message
      };
    }
    return {
      success: false,
      message: 'Internal Server Error'
    };
  }
}
