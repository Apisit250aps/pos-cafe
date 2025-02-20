"use client"
import { IInventory } from "@/models/inventories"
import { fetchInventory } from "@/services/inventory"
import { create } from "zustand"

type StockState = {
  inventories: IInventory[]
  page: number
  limit: number
  totalPages: number
  totalDocs: number
  loading: boolean
  error: string | null
  addItem: (item: IInventory) => void
  loadItem: () => void

  setPage: (page: number) => void
  setLimit: (limit: number) => void
}



const useStock = create<StockState>((set, get) => {
  const inventories: IInventory[] = []
  const page = 1
  const limit = 10
  const totalPages = 0
  const totalDocs = 0
  const loading = false
  const error = null
  //
  async function addItem(item: IInventory) {
    set((prev) => ({ ...prev, inventories: [...prev.inventories, item] }))
  }
  async function loadItem() {
    set({ loading: true, error: null })
    const { page, limit } = get()
    const { data, pagination, success, message } = await fetchInventory({
      limit,
      page
    })
    if (success) {
      set({
        inventories: data,
        page: pagination!.page,
        limit: pagination!.limit,
        totalPages: pagination!.totalPages,
        totalDocs: pagination!.totalDocs,
        loading: false,
        error: null
      })
    } else {
      set({ loading: false, error: message })
    }
  }
  loadItem()
  return {
    inventories,
    page,
    limit,
    totalPages,
    totalDocs,
    loading,
    error,
    addItem,
    loadItem,
    setPage: (page: number) => {
      set({ page });
      loadItem();
    },
    setLimit: (limit: number) => {
      set({ limit, page: 1 });
      loadItem();
    }
  }
})

export default useStock
