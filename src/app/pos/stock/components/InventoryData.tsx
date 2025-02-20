'use client'

import { ISupplier } from '@/models/suppliers'
import useStock from '@/stores/useStock'

export default function InventoryData() {
  const { inventories } = useStock()
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Min</th>
            <th>Cost per Unit</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((item, index) => {
            const supplier = item.supplierData as ISupplier | undefined
            return (
              <tr key={index} className="hover">
                <th className="flex">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{item.item_name}</td>
                <td>{item.current_quantity}</td>
                <td>{item.minimum_quantity}</td>
                <td>{item.cost_per_unit}</td>
                <td>{supplier ? <>{supplier.name}</> : <>-</>}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
