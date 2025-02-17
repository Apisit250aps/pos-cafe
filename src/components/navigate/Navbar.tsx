import { auth } from '@/auth';

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start lg:hidden">
        <label htmlFor="pos-layout" className="btn btn-ghost drawer-button">
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
                <i className="bx bx-user"></i> {user?.name}
              </a>
            </li>
            <li>
              <a href={'/api/auth/signout'}>
                <i className="bx bx-arrow-from-left"></i>logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
