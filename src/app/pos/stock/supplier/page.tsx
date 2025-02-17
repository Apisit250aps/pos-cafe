import CardContent from '@/components/display/CardContent';
import SupplierData from './components/SupplierData';

export default function StockSupplier() {
  return (
    <>
      <CardContent
        title="Suppliers"
        actions={
          <>
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
