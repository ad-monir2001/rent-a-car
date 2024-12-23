import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const links = (
    <div className="flex gap-2 lg:flex-row flex-col">
      <li>
        <NavLink className="font-heading text-base" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="font-heading text-base" to="available-cars">
          Available Cars
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink className="font-heading text-base" to="add-car">
              Add Car
            </NavLink>
          </li>
          <li>
            <NavLink className="font-heading text-base" to="my-cars">
              My Cars
            </NavLink>
          </li>
          <li>
            <NavLink className="font-heading text-base" to="my-bookings">
              My Bookings
            </NavLink>
          </li>
        </>
      )}
    </div>
  );
  return (
    <div className=" sticky bg-white top-0 z-50">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <Link
            className="flex items-center  font-heading md:text-2xl text-lg font-semibold"
            to="/"
          >
            <img
              className="md:w-12 w-8 mr-1 rounded-lg"
              src="images/logo.png"
              alt=""
            />
            Ride<span className="text-[#FF3600]">Sphere</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <NavLink
              className="font-heading text-base bg-[#ff3600] text-white font-semibold btn"
              to="login"
            >
              Log-in
            </NavLink>
          ) : (
            <button
              className="font-heading text-base bg-[#ff3600] text-white font-semibold btn"
              onClick={logOut}
            >
              logOut
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
