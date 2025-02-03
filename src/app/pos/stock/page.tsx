import CardContent from '@/components/display/card/CardContent';
import TableData from '@/components/display/table/TableData';

export default function Stock() {
  return (
    <>
      <CardContent title="Inventory">
        <TableData data={[]} map={{}} />
      </CardContent>
    </>
  );
}
