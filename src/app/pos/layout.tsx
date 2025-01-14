export default function PosLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="pos-layout" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <div className="navbar bg-base-100">
          <div className="navbar-start lg:hidden">
            <label htmlFor="pos-layout" className="btn btn-ghost drawer-button">
              <i className="bx bx-menu-alt-left"></i>
            </label>
          </div>
          <div className="navbar-start lg:navbar-center">
            <a className="btn btn-ghost text-xl">Cafe`</a>
          </div>
          <div className="navbar-end">
            <button className="btn btn-square btn-ghost">
              <i className="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
        </div>
        <main>{children}</main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="pos-layout"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <h2 className="menu-title">POS</h2>
            <ul>
              <li>
                <a href="/pos">POS</a>
              </li>
            </ul>
          </li>
          <li>
            <h2 className="menu-title">Stock</h2>
            <ul>
              <li>
                <a href="/pos/stock">Inventory</a>
              </li>
              <li>
                <a href="/pos/stock/input">Stock Input</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}