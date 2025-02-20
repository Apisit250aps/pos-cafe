import { IInventory } from '@/models/inventories';
import { IResponse, Pagination, Query } from '@/types/types';
import axios, { AxiosError } from 'axios';

export async function fetchInventory({
  limit,
  page
}: Query): Promise<IResponse<IInventory[]> & { pagination?: Pagination }> {
  try {
    const response = await axios.get<
      IResponse<IInventory[]> & { pagination?: Pagination }
    >('/api/pos/inventory', {
      params: { limit, page }
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

export async function createInventory(
  inventory: IInventory[]
): Promise<IResponse<IInventory[]>>{
  try {
    const response = await axios.post<IResponse<IInventory[]>>(
      '/api/pos/inventory',
      inventory
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
