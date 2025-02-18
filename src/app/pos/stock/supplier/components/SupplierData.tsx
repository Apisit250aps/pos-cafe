'use client';

import useSupplier from '@/stores/useSupplier';
import Swal from 'sweetalert2';

export default function SupplierData() {
  const { error, suppliers, loading, removeSupplier, limit, page } =
    useSupplier();
  const handleDelete = async function (id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this supplier!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeSupplier(id);
        if (error) {
          Swal.fire({
            icon: 'error',
            text: error
          });
        }
        Swal.fire({
          icon: 'success',
          text: 'Supplier deleted successfully!'
        });
      }
    });
  };

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
          {loading ? (
            <>
              <tr>
                <td colSpan={6} className="text-center">
                  <span className="loading loading-dots loading-sm"></span>
                </td>
              </tr>
            </>
          ) : (
            <>
              {!suppliers.length ? (
                <>
                  <tr>
                    <td colSpan={6} className="text-center">
                      No suppliers found.
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {suppliers.map((supplier, index) => (
                    <tr key={index} className="hover">
                      <th>{limit * (page - 1) + index + 1}</th>
                      <td>{supplier.name}</td>
                      <td>{supplier.contract_person}</td>
                      <td>{supplier.phone}</td>
                      <td>{supplier.email}</td>
                      <td>
                        <div className="dropdown dropdown-end">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm m-1"
                          >
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
                              <a
                                onClick={() =>
                                  handleDelete(supplier._id as string)
                                }
                              >
                                <i className="bx bx-trash"></i>Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
