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

  const navLinks = [
    {
      to: '/',
      label: (
        <>
          <span className="block sm:hidden lowercase">Home</span>
          <span className="hidden sm:block uppercase">HOME</span>
        </>
      ),
      icon: <FiHome />,
    },
    {
      to: '/products',
      label: (
        <>
          <span className="block sm:hidden lowercase">Products</span>
          <span className="hidden sm:block uppercase">PRODUCTS</span>
        </>
      ),
      icon: <FiGrid />,
    },
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
    <nav className="sticky top-0 z-50 bg-[#e62429] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://www.thesouledstore.com/static/img/non-member-logo2.4f4c390.gif"
              alt="Logo"
              className="h-10"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Left nav */}
            <div className="flex space-x-6">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 text-white hover:bg-red-500 transition-colors ${
                    location.pathname === link.to ? 'bg-red-500' : ''
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right nav */}
            <div className="flex items-center space-x-4 border-l border-red-400 pl-6">
              {user ? (
                <>
                  {userLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="relative p-2 text-white hover:bg-red-500 rounded-full transition"
                      title={link.label}
                    >
                      {link.icon}
                      {link.badge > 0 && (
                        <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(prev => !prev)}
                      className="p-2 text-white hover:bg-red-500 rounded-full transition"
                      title="Account"
                    >
                      <FiUser />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white text-red-600 rounded-md shadow-lg py-1 z-50 border border-red-100">
                        <div className="px-4 py-2 text-sm font-medium border-b border-red-100">
                          👋 {user.name || 'Welcome'}
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm hover:bg-red-50 flex items-center gap-2"
                        >
                          <FiUser /> Profile
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center gap-2"
                        >
                          <FiLogOut /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                authLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 text-white hover:bg-red-500 transition-colors ${
                      location.pathname === link.to ? 'bg-red-500' : ''
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center">
            {user && (
              <Link to="/cart" className="relative p-2 mr-2 text-white">
                <FiShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="p-2 rounded-md text-white hover:bg-red-500"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#e62429] pb-4 px-4">
          <div className="pt-2 pb-3 space-y-1">
            {[...navLinks, ...(user ? userLinks : authLinks)].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white ${
                  location.pathname === link.to ? 'bg-red-600' : 'hover:bg-red-600'
                }`}
              >
                {link.icon}
                <span>{typeof link.label === 'string' ? link.label.toLowerCase() : link.label}</span>
                {link.badge > 0 && (
                  <span className="ml-auto bg-white text-red-600 text-xs font-bold rounded-full px-2 py-0.5">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-600"
                >
                  <FiUser /> Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-600"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
