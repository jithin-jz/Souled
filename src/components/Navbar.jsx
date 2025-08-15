import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  FiLogOut, FiLogIn, FiUserPlus, FiShoppingCart,
  FiMenu, FiX, FiUser, FiPackage,
  FiHome, FiGrid, FiHeart
} from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount = 0, wishlistCount = 0 } = useCart();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  if (user?.role === 'Admin') return null;

  const navLinks = [
    { to: '/', label: 'HOME', icon: <FiHome /> },
    { to: '/products', label: 'PRODUCTS', icon: <FiGrid /> }
  ];

  const userLinks = [
    { to: '/cart', label: 'Cart', icon: <FiShoppingCart />, badge: cartCount },
    { to: '/wishlist', label: 'Wishlist', icon: <FiHeart />, badge: wishlistCount },
    { to: '/orders', label: 'Orders', icon: <FiPackage /> },
  ];

  const authLinks = [
    { to: '/login', label: 'Login', icon: <FiLogIn /> },
    { to: '/register', label: 'Register', icon: <FiUserPlus /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-20 flex items-center justify-between">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 text-white hover:bg-slate-700 transition ${
                location.pathname === link.to ? "bg-slate-800" : ""
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/">
            <img
              src="https://tss-static-images.gumlet.io/non-member-logo2.gif"
              alt="Logo"
              className="h-12"
            />
          </Link>
        </div>

        {/* Desktop Right User Links */}
        <div className="hidden md:flex items-center space-x-4 border-l border-slate-600 pl-6">
          {user ? (
            <>
              {userLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative p-2 text-white hover:bg-slate-700 rounded-full transition"
                  title={link.label}
                >
                  {link.icon}
                  {link.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="p-2 text-white hover:bg-slate-700 rounded-full transition"
                  title="Account"
                >
                  <FiUser />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 text-white rounded-md shadow-lg py-1 z-50 border border-slate-700">
                    <div className="px-4 py-2 text-sm font-semibold border-b border-slate-600">
                      👋 {user.name || "Welcome"}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-slate-700 flex items-center gap-2"
                    >
                      <FiUser /> Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-slate-700 flex items-center gap-2"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            authLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 text-white hover:bg-slate-700 transition ${
                  location.pathname === link.to ? "bg-slate-800" : ""
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))
          )}
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <Link to="/cart" className="relative p-2 text-white">
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-md text-white hover:bg-slate-700"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 px-4 pt-4 pb-6 space-y-4 border-t border-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              {userLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700"
                >
                  {link.icon}
                  {link.label}
                  {link.badge > 0 && (
                    <span className="ml-auto bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700"
              >
                <FiUser /> Profile
              </Link>
              <button
                onClick={logout}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            authLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700"
              >
                {link.icon}
                {link.label}
              </Link>
            ))
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
