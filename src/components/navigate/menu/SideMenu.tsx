import { ReactNode } from 'react';

export default function SideMenu({ children }: { children?: ReactNode }) {
  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {children}
    </ul>
  );
}
