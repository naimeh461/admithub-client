import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Authentication/AuthProvider';
import useAdmin from '../../Authentication/useAdmin';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin] = useAdmin();

  const handleLogOut = async () => {
    try {
      await logOut();
      setIsOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-purple-700 font-semibold border-b-2 border-purple-600 pb-1'
      : 'text-gray-700 hover:text-purple-700 transition';

  const profilePath = isAdmin ? '/dashboard/adminHome' : '/profile';

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-purple-700">
          AdmitHub
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/colleges" className={linkClass}>Colleges</NavLink>
          {!isAdmin && <NavLink to="/admission" className={linkClass}>Admission</NavLink>}
        </ul>

        {/* User / Hamburger */}
        <div className="flex items-center gap-4">
          {user && (
            <Link
              to={profilePath}
              className="hidden sm:inline-flex px-3 py-1 bg-purple-100 text-purple-700 rounded-full"
            >
              {user.displayName || 'Profile'}
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogOut}
              className="hidden sm:inline-flex mb-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex px-3  bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full"
            >
              Log In
            </Link>
          )}

          {/* Hamburger */}
          <button
            className="lg:hidden rounded-md border border-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <span className="text-xl font-bold">✕</span> : <span className="text-xl font-bold">☰</span>}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 py-2' : 'max-h-0'}`}
      >
        <ul className="flex flex-col gap-2 px-4">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="block px-2 py-1 rounded hover:bg-purple-50">Home</NavLink>
          <NavLink to="/colleges" onClick={() => setIsOpen(false)} className="block px-2 py-1 rounded hover:bg-purple-50">Colleges</NavLink>
          {!isAdmin && (
            <NavLink to="/admission" onClick={() => setIsOpen(false)} className="block px-2 py-1 rounded hover:bg-purple-50">Admission</NavLink>
          )}

          {user ? (
            <>
              <Link
                to={profilePath}
                onClick={() => setIsOpen(false)}
                className="block px-2 py-1 rounded hover:bg-purple-50"
              >
                {isAdmin ? 'Admin Dashboard' : (user.displayName || 'Profile')}
              </Link>

              <button
                onClick={() => { handleLogOut(); setIsOpen(false); }}
                className="w-full text-left px-2 rounded bg-gradient-to-r from-purple-600 to-pink-500 text-white mt-2"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-2 py-1 rounded bg-gradient-to-r from-purple-600 to-pink-500 text-white mt-2"
            >
              Log In
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;