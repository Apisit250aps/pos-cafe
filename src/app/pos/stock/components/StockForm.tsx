"use client"

import Button from "@/components/actions/button/Button"
import TextField from "@/components/form/input/TextField"
import { IInventory } from "@/models/inventories"
import { useState } from "react"
import SupplierSelect from "./SupplierSelect"
import DialogModal, {
  closeModal,
  showModal
} from "@/components/actions/modal/DialogModal"
import { ISupplier } from "@/models/suppliers"
import useItemInput from "@/stores/useItemInput"

export default function StockForm() {
  const { addItem } = useItemInput()
  const [item, setItem] = useState<Partial<IInventory>>({} as IInventory)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target

    setItem((prevItem) => ({
      ...prevItem,
      [name]: type === "number" ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addItem(item as IInventory)
    setItem({})
  }

  const handleSelectSupplier = function (value: ISupplier): void {
    setItem({ ...item, supplier: value })
    closeModal("supplier-select")
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item name"
          name="item_name"
          value={item.item_name || ""}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Current quantity"
          min={0}
          step={1}
          type="number"
          value={item.current_quantity ?? ""}
          name="current_quantity"
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Minimum quantity"
          min={0}
          step={1}
          type="number"
          value={item.minimum_quantity ?? ""}
          name="minimum_quantity"
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Cost"
          min={0}
          type="number"
          name="cost_per_unit"
          value={item.cost_per_unit ?? ""}
          onChange={handleInputChange}
          required
        />
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Supplier</span>
          </div>
          <button
            className="btn btn-outline min-w-full flex justify-start border-gray-300"
            type="button"
            onClick={() => showModal("supplier-select")}
          >
            {typeof item.supplier === "object" && "name" in item.supplier ? (
              item.supplier.name
            ) : (
              <>Choose</>
            )}
          </button>
        </label>
        <div className="flex justify-end mt-5">
          <Button>Add</Button>
        </div>
      </form>
      <DialogModal id="supplier-select">
        <SupplierSelect onChange={handleSelectSupplier} />
      </DialogModal>
    </>
  )
}
