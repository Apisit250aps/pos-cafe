'use client'; // ใช้ใน Client Component เท่านั้น
import { usePathname } from 'next/navigation';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function NavLink({ href, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href

  return (
    <li>
      <a href={href} className={isActive ? 'active' : ''} {...props}>
        {children}
      </a>
    </li>
  );
}
