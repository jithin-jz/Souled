import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiUser,
} from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-red-600 shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 relative">

        {/* Logo */}
<div className="flex-shrink-0 flex items-center z-10">
  <Link to="/" onClick={closeMenu}>
    <img
      src="https://www.thesouledstore.com/static/img/non-member-logo2.4f4c390.gif" // path to your logo file
      alt="Logo"
      className="h-10 w-auto" // adjust height as needed
    />
  </Link>
</div>


          {/* Center Menu */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 z-0">
            <Link to="/" className="text-white font-medium hover:text-yellow-300 transition">Home</Link>
            <Link to="/products" className="text-white font-medium hover:text-yellow-300 transition">Products</Link>
            {user && (
              <>
                <Link to="/cart" className="text-white font-medium hover:text-yellow-300 transition relative flex items-center">
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="text-white font-medium hover:text-yellow-300 transition">Orders</Link>
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 z-10">
            {user ? (
              <>
                {/* Username vertically stacked */}
                <div className="text-white hidden md:flex flex-col items-end leading-tight">
                  <span className="text-sm">👋🏻</span>
                  <span className="text-xs text-gray-200">{user.name.toUpperCase()}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  title="Logout"
                  className="text-white hover:text-yellow-300 transition"
                >
                  <FiLogOut size={22} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-yellow-300 transition">
                  <FiUser size={22} />
                </Link>
                <Link to="/register" className="text-white bg-blue-700 px-3 py-1 rounded hover:bg-blue-500 transition flex items-center">
                  <FiUserPlus className="mr-1" size={18} />
                  <span className="hidden md:inline">register</span>
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="text-white md:hidden">
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-3 py-4">
            <Link to="/" onClick={closeMenu} className="text-white font-medium hover:text-yellow-300 transition">home</Link>
            <Link to="/products" onClick={closeMenu} className="text-white font-medium hover:text-yellow-300 transition">products</Link>
            {user && (
              <>
                <Link to="/cart" onClick={closeMenu} className="text-white font-medium hover:text-yellow-300 transition relative flex items-center">
                  <FiShoppingCart className="mr-1" />
                  cart
                  {cartCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/orders" onClick={closeMenu} className="text-white font-medium hover:text-yellow-300 transition">orders</Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" onClick={closeMenu} className="text-white hover:text-yellow-300 transition flex items-center">
                  <FiLogIn className="mr-1" size={18} /> login
                </Link>
                <Link to="/register" onClick={closeMenu} className="text-white bg-blue-700 px-3 py-1 rounded hover:bg-blue-500 transition flex items-center">
                  <FiUserPlus className="mr-1" size={18} /> register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
