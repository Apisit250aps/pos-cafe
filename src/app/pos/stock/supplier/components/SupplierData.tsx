'use client';
import { ISupplier } from '@/models/suppliers';
import { fetchSupplier } from '@/services/supplier';
import { useCallback, useEffect, useState } from 'react';

export default function SupplierData() {
  const [suppliers, setSupplierData] = useState<ISupplier[]>([]);
  const fetchData = useCallback(async () => {
    const { data } = await fetchSupplier({});
    setSupplierData(data!);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="overflow-x-auto min-h-96">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contract Person</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={index} className="hover">
              <th>{index + 1}</th>
              <td>{supplier.name}</td>
              <td>{supplier.contract_person}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.email}</td>
              <td>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-sm m-1">
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li>
                      <a href={`/pos/stock/supplier/${supplier._id}`}>
                        <i className="bx bx-pencil"></i>Edit
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="bx bx-trash"></i>Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
