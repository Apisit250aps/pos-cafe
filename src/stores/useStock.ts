'use client';
import { IInventory } from '@/models/inventories';
import { create } from 'zustand';

type StockState = {
  inventories: IInventory[];
  page: number;
  limit: number;
  totalPages: number;
  totalDocs: number;
  loading: boolean;
  error: string | null;
  addItem: (item: IInventory) => void;
};

const useStock = create<StockState>((set) => {
  const inventories: IInventory[] = [];
  const page = 1;
  const limit = 10;
  const totalPages = 0;
  const totalDocs = 0;
  const loading = false;
  const error = null;
  // 
  async function addItem(item: IInventory) {
    set((prev) => ({ ...prev, inventories: [...prev.inventories, item] }));
  }
  return {
    inventories,
    page,
    limit,
    totalPages,
    totalDocs,
    loading,
    error,
    addItem
  };
});

export default useStock;
