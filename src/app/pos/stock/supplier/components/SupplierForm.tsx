'use client';
import OutlineButton from '@/components/form/button/OutlineButton';
import TextArea from '@/components/form/input/TextArea';
import TextField from '@/components/form/input/TextField';
import { ISupplier } from '@/models/suppliers';
import { createSupplier, updateSupplier } from '@/services/supplier';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface SupplierFormProps {
  data?: ISupplier;
}

export default function SupplierForm({ data }: SupplierFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [supplier, setSupplier] = useState<Partial<ISupplier>>({});

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
        const { success, message } = await createSupplier(
          supplier as ISupplier
        );
        Swal.fire({
          icon: success ? 'success' : 'error',
          text: message
        });
        setSupplier({});
        return;
      } else {
        const { success, message } = await updateSupplier(
          supplier as ISupplier
        );
        Swal.fire({
          icon: success ? 'success' : 'error',
          text: message
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
    if (data) {
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
        <OutlineButton type="submit" loading={loading} className="min-w-56">
          {data?._id ? <>Edit</> : <>Add</>}
        </OutlineButton>
      </div>
    </form>
  );
}
