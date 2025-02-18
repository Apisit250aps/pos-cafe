'use client';
import CardContent from '@/components/display/CardContent';
import SupplierData from './components/SupplierData';
import PaginationButton from '@/components/actions/button/PaginationButton';
import useSupplier from '@/stores/useSupplier';
import LimitButton from '@/components/actions/button/LimitButton';

export default function StockSupplier() {
  const { page, setPage, totalPages, limit, setLimit } = useSupplier();
  return (
    <>
      <CardContent
        title="Suppliers"
        actions={
          <>
            <LimitButton current={limit} set={setLimit} />
            <PaginationButton
              page={page}
              set={setPage}
              totalPage={totalPages}
            />
            <a href={'/pos/stock/supplier/!'} className="btn">
              <i className="bx bx-message-square-add"></i>
            </a>
          </>
        }
      >
        <SupplierData />
      </CardContent>
    </>
  );
}
