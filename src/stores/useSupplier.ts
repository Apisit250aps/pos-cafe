'use client';
import { ISupplier } from '@/models/suppliers';
import { fetchSupplier } from '@/services/supplier';
import { create } from 'zustand';

type SupplierState = {
  suppliers: ISupplier[];
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  loadSuppliers: () => Promise<void>; // เพิ่มฟังก์ชันใน Type
};

const useSupplier = create<SupplierState>((set, get) => ({
  suppliers: [],
  page: 1,
  limit: 10,
  totalPages: 0,
  loading: false,
  error: null,
  loadSuppliers: async () => {
    set({ loading: true, error: null });
    const { page, limit } = get(); // ใช้ get() เพื่อดึงค่า state ปัจจุบัน
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
        loading: false
      });
    }
    if (!success) {
      set({ loading: false, error: message });
    }
  }
}));

export default useSupplier;
