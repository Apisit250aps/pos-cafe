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
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contract Person</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={index} className='hover'>
              <th>{index + 1}</th>
              <td>{supplier.name}</td>
              <td>{supplier.contract_person}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
