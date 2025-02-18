'use client';
import Button from '@/components/actions/button/Button';
import TextArea from '@/components/form/input/TextArea';
import TextField from '@/components/form/input/TextField';
import { ISupplier } from '@/models/suppliers';
import useSupplier from '@/stores/useSupplier';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface SupplierFormProps {
  data?: ISupplier;
}

export default function SupplierForm({ data }: SupplierFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [supplier, setSupplier] = useState<Partial<ISupplier>>({});
  const { editSupplier, addSupplier, error } = useSupplier();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSupplier((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!supplier._id) {
        await addSupplier(supplier as ISupplier);
        if (error) {
          Swal.fire({
            icon: 'error',
            text: error
          });
          return;
        }
        Swal.fire({
          icon: 'success',
          text: 'Supplier added successfully'
        });
        setSupplier({});
        return;
      } else {
        await editSupplier(supplier as ISupplier);
        if (error) {
          Swal.fire({
            icon: 'error',
            text: error
          });
          return;
        }
        Swal.fire({
          icon: 'success',
          text: 'Supplier updated successfully'
        });
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!data) {
      setSupplier(data);
    } else {
      setSupplier({});
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        placeholder="Supplier name"
        value={supplier.name || ''}
        onChange={handleChange}
        required
      />
      <TextField
        label="Contact"
        name="contract_person"
        placeholder="Contact person"
        value={supplier.contract_person || ''}
        onChange={handleChange}
        required
      />
      <TextField
        label="Phone"
        name="phone"
        placeholder="Phone"
        value={supplier.phone || ''}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        value={supplier.email || ''}
        onChange={handleChange}
        required
      />
      <TextArea
        label="Address"
        name="address"
        placeholder="Address"
        value={supplier.address || ''}
        onChange={handleChange}
        required
      />
      <div className="flex justify-end my-5">
        <Button type="submit" loading={loading} className="min-w-56 btn-outline">
          {data?._id ? <>Edit</> : <>Add</>}
        </Button>
      </div>
    </form>
  );
}
