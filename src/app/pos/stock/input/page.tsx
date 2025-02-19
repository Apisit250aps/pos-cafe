"use client"
import CardContent from "@/components/display/CardContent"
import Button from "@/components/actions/button/Button"
import DialogModal, {
  closeModal,
  showModal
} from "@/components/actions/modal/DialogModal"
import TextField from "@/components/form/input/TextField"
import { IInventory } from "@/models/inventories"
import { useState } from "react"
import { ISupplier } from "@/models/suppliers"
import SupplierSelect from "../components/SupplierSelect"
import { createInventory } from "@/services/inventory"
import Swal from "sweetalert2"
export default function StockItemInput() {
  const [item, setItem] = useState<Partial<IInventory>>({} as IInventory)
  const [itemList, setItemList] = useState<IInventory[]>([])
  const [indexSelect, setIndexSelect] = useState<undefined | number>(undefined)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target
    setItem((prevItem) => ({
      ...prevItem,
      [name]: type === "number" ? parseFloat(value) || 0 : value
    }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (indexSelect !== undefined) {
      itemList[indexSelect] = { ...itemList[indexSelect], ...item }
      setItemList([...itemList])
    } else {
      setItemList([...itemList, item as IInventory])
    }
    setIndexSelect(undefined)
    setItem({})
  }
  function handleSelect(supplier: ISupplier): void {
    setItem({
      ...item,
      supplier
    })
    closeModal("supplier-select")
  }
  const onSelectEdit = function (index: number) {
    setIndexSelect(index)
    setItem(itemList[index])
  }

  const onSelectRemove = function (index: number) {
    setItemList(itemList.filter((_, i) => i !== index))
  }

  const handleSubmitInput = async function () {
    const items = itemList.map((item: IInventory) => {
      const supplier = item.supplier as ISupplier | undefined

      return {
        ...item,
        supplier: !!supplier == false ? supplier : supplier._id?.toString()
      }
    })
    const { success, message } = await createInventory(items as IInventory[])
    Swal.fire({
      icon: success ? "success" : "error",
      title: success ? "Items inventory created successfully" : message
    })
    setItemList([])
  }

  return (
    <CardContent title="Add Items Inventory">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item name"
          name="item_name"
          value={item.item_name || ""}
          onChange={handleInputChange}
          required
          autoFocus
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
          <Button>
            {typeof indexSelect == "undefined" ? <>Add</> : <>Edit</>}
          </Button>
        </div>
      </form>
      <div className="overflow-x-auto min-h-96">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Item name</th>
              <th>Cost per unit</th>
              <th>Quantity</th>
              <th>Min Quantity</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => {
              const supplier = item.supplier as ISupplier
              return (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>{item.item_name}</td>
                  <td>{item.cost_per_unit}</td>
                  <td>{item.current_quantity}</td>
                  <td>{item.minimum_quantity}</td>
                  <td>{supplier ? supplier.name : null}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-warning btn-outline"
                      onClick={() => onSelectEdit(index)}
                    >
                      <i className="bx bx-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-error btn-outline ms-3"
                      onClick={() => onSelectRemove(index)}
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="card-actions flex justify-end sticky bottom-10">
        <Button
          type="button"
          className="min-w-96 btn-outline"
          onClick={handleSubmitInput}
        >
          Save
        </Button>
      </div>
      <DialogModal id="supplier-select">
        <SupplierSelect onChange={handleSelect} />
      </DialogModal>
    </CardContent>
  )
}
