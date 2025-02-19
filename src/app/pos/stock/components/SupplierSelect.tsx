'use client';

interface SupplierSelector {
  onChange: (value: ISupplier) => void;
}

import LimitButton from '@/components/actions/button/LimitButton';
import PaginationButton from '@/components/actions/button/PaginationButton';
import { ISupplier } from '@/models/suppliers';
import useSupplier from '@/stores/useSupplier';

export default function SupplierSelect({ onChange }: SupplierSelector) {
  const { suppliers, page, limit, loading, setLimit, setPage, totalPages } =
    useSupplier();
  
  const handleSelect = (supplier: ISupplier) => {
    onChange(supplier);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="card-title flex justify-between">
            <h3>Suppliers</h3>
            <div className="card-actions">
              <LimitButton current={limit} set={setLimit} />
              <PaginationButton
                page={page}
                set={setPage}
                totalPage={totalPages}
              />
            </div>
          </div>
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
                {loading ? (
                  <>
                    <tr>
                      <td colSpan={5} className="text-center">
                        <span className="loading loading-dots loading-sm"></span>
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {!suppliers.length ? (
                      <>
                        <tr>
                          <td colSpan={5} className="text-center">
                            No suppliers found.
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        {suppliers.map((supplier, index) => (
                          <tr key={index} className="hover" onClick={()=>handleSelect(supplier)}>
                            <th>{limit * (page - 1) + index + 1}</th>
                            <td>{supplier.name}</td>
                            <td>{supplier.contract_person}</td>
                            <td>{supplier.phone}</td>
                            <td>{supplier.email}</td>
                          </tr>
                        ))}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
