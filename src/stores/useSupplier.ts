'use client';
import { ISupplier } from '@/models/suppliers';
import { fetchSupplier } from '@/services/supplier';
import { create } from 'zustand';

type SupplierState = {
  suppliers: ISupplier[];
  page: number;
  limit: number;
  totalPages: number;
  totalDocs: number;
  loading: boolean;
  error: string | null;
  loadSuppliers: () => Promise<void>;
};

const useSupplier = create<SupplierState>((set, get) => ({
  suppliers: [],
  page: 1,
  limit: 10,
  totalPages: 0,
  totalDocs: 0,
  loading: false,
  error: null,
  loadSuppliers: async () => {
    set({ loading: true, error: null });
    const { page, limit } = get();
    const { data, pagination, success, message } = await fetchSupplier({
      limit,
      page
    });
    if (success) {
      set({
        suppliers: data,
        page: pagination!.page,
        limit: pagination!.limit,
        totalPages: pagination!.totalPages,
        totalDocs: pagination!.totalDocs,
        loading: false,
        error: null
      });
    }
    if (!success) {
      set({ loading: false, error: message });
    }
  }
}));

export default useSupplier;
