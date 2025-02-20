'use client'
import { ISupplier } from '@/models/suppliers'
import {
  createSupplier,
  deleteSupplier,
  fetchSupplier,
  updateSupplier
} from '@/services/supplier'
import { create } from 'zustand'

type SupplierState = {
  suppliers: ISupplier[]
  page: number
  limit: number
  totalPages: number
  totalDocs: number
  sort: object
  loading: boolean
  error: string | null
  loadSuppliers: () => Promise<void>
  addSupplier: (supplier: ISupplier) => Promise<void>
  editSupplier: (supplier: ISupplier) => Promise<void>
  removeSupplier: (supplier: string) => Promise<void>
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}
const useSupplier = create<SupplierState>((set, get) => {
  const suppliers = [] as ISupplier[]
  const loadSuppliers = async () => {
    set({ loading: true, error: null })
    const { page, limit, sort } = get()
    console.log(sort, page)
    const { data, pagination, success, message } = await fetchSupplier({
      limit,
      page,
      ...sort
    })

    if (success) {
      set({
        suppliers: data,
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
  async function addSupplier(supplier: ISupplier) {
    set({ loading: true, error: null })
    const { success, message, data } = await createSupplier(supplier)
    if (success) {
      set((state) => ({
        suppliers: [...state.suppliers, data!],
        totalDocs: state.totalDocs + 1,
        totalPages: Math.ceil((state.totalDocs + 1) / state.limit),
        loading: false,
        error: null
      }))
    } else {
      set({ loading: false, error: message })
    }
  }
  async function editSupplier(supplier: ISupplier) {
    set({ loading: true, error: null })
    const { success, message } = await updateSupplier(supplier)

    if (success) {
      const index = get().suppliers.findIndex((s) => s._id === supplier._id)
      if (index !== -1) {
        set((state) => ({
          suppliers: [
            ...state.suppliers.slice(0, index),
            supplier,
            ...state.suppliers.slice(index + 1)
          ],
          loading: false,
          error: null
        }))
      }
    } else {
      set({ loading: false, error: message })
    }
  }
  async function removeSupplier(supplier: string) {
    set({ loading: true, error: null })
    const { success, message } = await deleteSupplier(supplier)
    if (success) {
      set((state) => ({
        suppliers: state.suppliers.filter((s) => s._id !== supplier),
        totalDocs: state.totalDocs - 1,
        totalPages: Math.ceil(state.totalDocs / state.limit),
        loading: false,
        error: null
      }))
    } else {
      set({ loading: false, error: message })
    }
  }
  loadSuppliers()
  return {
    suppliers,
    sort: {
      name: 1
    },
    page: 1,
    limit: 10,
    totalPages: 0,
    totalDocs: 0,
    loading: false,
    error: null,
    loadSuppliers,
    addSupplier,
    editSupplier,
    removeSupplier,
    setPage: (page: number) => {
      set({ page })
      loadSuppliers()
    },
    setLimit: (limit: number) => {
      set({ limit, page: 1 })
      loadSuppliers()
    }
  }
})

export default useSupplier
