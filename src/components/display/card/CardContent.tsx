type CardContentProps = {
  children?: React.ReactNode;
  actions?: React.ReactNode;
  title: string;
};
export default function CardContent({
  children,
  actions,
  title
}: CardContentProps) {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="card-title flex justify-between">
            <h3>{title}</h3>
            <div className="card-actions">{actions}</div>
          </div>
          <div className="pt-3">{children}</div>
        </div>
      </div>
    </>
  );
}
