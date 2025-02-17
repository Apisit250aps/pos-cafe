import SideMenu from '@/components/navigate/menu/SideMenu';
import Navbar from '@/components/navigate/Navbar';
import NavLink from '@/components/navigate/NavLink';

export default function PosLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="pos-layout" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Navbar />
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="pos-layout"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <SideMenu>
            {/* Sidebar content here */}
            <li className="menu-title">POS</li>
            <NavLink href="/pos">
              <i className="bx bx-camera-home"></i>POS
            </NavLink>
            <li className="menu-title">Menus and Products</li>
            <NavLink href="/pos/menu">
              <i className="bx bx-receipt"></i>Menu
            </NavLink>
            <li className="menu-title">Stock</li>
            <NavLink href="/pos/stock">
              <i className="bx bx-package"></i>Inventory
            </NavLink>
            <NavLink href="/pos/stock/supplier">
              <i className="bx bx-package"></i>Suppliers
            </NavLink>
          </SideMenu>
        </div>
      </div>
    </>
  );
}
