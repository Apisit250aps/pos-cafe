import CardContent from "@/components/display/CardContent"
import StockForm from "../components/StockForm"
import SupplierSelect from "../components/SupplierSelect";

export default function StockItemInput() {
  return (
    <CardContent title="Add Items Inventory">
      <StockForm />
      <SupplierSelect />
    </CardContent>
  )
}
