import CardContent from '@/components/display/CardContent';
import SupplierForm from '../components/SupplierForm';
import suppliers, { ISupplier } from '@/models/suppliers';
import { ObjectId } from 'mongodb';

export default async function StockSupplierForm({
  params
}: {
  params: Promise<{ id?: string }>;
}) {
  const {id} = await params
  const supplierId = id!=='!' ? new ObjectId(id) : null;
  const supplier = supplierId ? await suppliers.findOne({ _id: supplierId }) : null;
  const plainSupplier = supplier
    ? {
        ...supplier,
        _id: supplier._id.toString(),
        createdAt: supplier.createdAt.toISOString(),
      }
    : undefined;
  return (
    <CardContent title={supplier ? 'Edit Supplier' : 'Add Supplier'}>
      <SupplierForm data={plainSupplier as ISupplier | undefined} />
    </CardContent>
  );
}
