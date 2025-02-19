"use client"
import { IInventory } from "@/models/inventories"
import { ISupplier } from "@/models/suppliers"
import { create } from "zustand"

type ItemInputState = {
  itemList: IInventory[]
  itemInput: () => IInventory[]
  addItem: (item: IInventory) => void
  removeItem: (itemId: string) => void
  updateItem: (itemId: string, item: IInventory) => void
  clearItems: () => void
  totalItems: () => number
}

const useItemInput = create<ItemInputState>((set, get) => ({
  itemList: [],
  itemInput: () =>
    get().itemList.map((item) => {
      const supplier = item.supplier as ISupplier
      return {
        ...item,
        supplier: supplier._id!.toString()
      }
    }),
  addItem: (item: IInventory) => {
    set((prev) => ({ ...prev, itemList: [...prev.itemList, item] }))
  },

  removeItem: (itemId: string) => {
    set((prev) => ({
      ...prev,
      itemList: prev.itemList.filter((item) => item._id !== itemId)
    }))
  },
  updateItem: (itemId: string, item: IInventory) => {
    set((prev) => ({
      ...prev,
      itemList: prev.itemList.map((i) => (i._id === itemId ? item : i))
    }))
  },
  clearItems: () => {
    set({ itemList: [] })
  },
  totalItems: () => {
    return get().itemList.length
  }
}))

export default useItemInput
