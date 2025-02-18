import CardContent from '@/components/display/CardContent';

export default function Stock() {
  return (
    <>
      <CardContent
        title="Inventory"
        actions={
          <>
            <a href="/pos/stock/input" className="btn">
              <i className="bx bx-message-square-add"></i>
            </a>
          </>
        }
      ></CardContent>
    </>
  );
}
