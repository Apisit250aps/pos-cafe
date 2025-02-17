import Navbar from '@/components/navigate/Navbar';

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
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li className="menu-title">POS</li>
            <li>
              <a href="/pos">
                <i className="bx bx-camera-home"></i>POS
              </a>
            </li>
            <li className="menu-title">Menus and Products</li>
            <li>
              <a href="/pos/menu">
                <i className="bx bx-receipt"></i>Menu
              </a>
            </li>
            <li className="menu-title">Stock</li>
            <li>
              <a href="/pos/stock">
                <i className="bx bx-package"></i>Inventory
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
