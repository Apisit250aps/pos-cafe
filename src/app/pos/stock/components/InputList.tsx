"use client"
import { ISupplier } from "@/models/suppliers"
import useItemInput from "@/stores/useItemInput"

export default function InputList() {
  const { itemList, itemInput } = useItemInput()
  console.log(itemInput())
  return (
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
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.item_name}</td>
                <td>{item.cost_per_unit}</td>
                <td>{item.current_quantity}</td>
                <td>{item.minimum_quantity}</td>
                <td>{supplier.name}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {/* Add item */}
          <tr>
            <td colSpan={6} className="text-end">
              <button className="btn btn-primary">Add Item</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
