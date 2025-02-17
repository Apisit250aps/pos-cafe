import { ReactNode } from 'react';

export default function CardContent({
  title,
  actions,
  children
}: {
  title?: string;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title flex justify-between">
          <h3>{title}</h3>
          <div className="card-actions">{actions}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
