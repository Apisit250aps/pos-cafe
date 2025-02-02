export default function PosLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="pos-layout" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="navbar bg-base-100">
            <div className="navbar-start lg:hidden">
              <label
                htmlFor="pos-layout"
                className="btn btn-ghost drawer-button"
              >
                <i className="bx bx-menu-alt-left"></i>
              </label>
            </div>
            <div className="navbar-center lg:navbar-start">
              <a className="btn btn-ghost text-xl">POS Cafe`</a>
            </div>
            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1 btn-ghost">
                  <i className="bx bx-menu-alt-right"></i>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>
                      <i className="bx bx-user"></i>User
                    </a>
                  </li>
                  <li>
                    <a href="/auth">
                      <i className="bx bx-arrow-from-left"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
  )
}
