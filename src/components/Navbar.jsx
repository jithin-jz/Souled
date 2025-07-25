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
  FiPackage,
  FiHome,
  FiGrid,
  FiHeart,
} from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeAllMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-red-600 shadow-md sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeAllMenus}>
            <img
              src="https://www.thesouledstore.com/static/img/non-member-logo2.4f4c390.gif"
              alt="Logo"
              className="h-10"
            />
          </Link>

          {/* Desktop Icon-Only Menu */}
          <div className="hidden md:flex items-center space-x-6 text-xl">
            <Link to="/" title="Home" className="hover:text-red-200" onClick={closeAllMenus}>
              <div className="flex flex-col items-center text-xs">
                <FiHome />
                <span className="capitalize">Home</span>
              </div>
            </Link>
            <Link to="/products" title="Products" className="hover:text-red-200" onClick={closeAllMenus}>
              <div className="flex flex-col items-center text-xs">
                <FiGrid />
                <span className="capitalize">Products</span>
              </div>
            </Link>
            {user && (
              <>
                <Link to="/cart" title="Cart" className="relative hover:text-red-200" onClick={closeAllMenus}>
                  <div className="flex flex-col items-center text-xs">
                    <FiShoppingCart />
                    <span className="capitalize">Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-white text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/wishlist" title="Wishlist" className="hover:text-red-200" onClick={closeAllMenus}>
                  <div className="flex flex-col items-center text-xs">
                    <FiHeart />
                    <span className="capitalize">Wishlist</span>
                  </div>
                </Link>
                <Link to="/orders" title="Orders" className="hover:text-red-200" onClick={closeAllMenus}>
                  <div className="flex flex-col items-center text-xs">
                    <FiPackage />
                    <span className="capitalize">Orders</span>
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* User Dropdown */}
          <div className="flex items-center space-x-3 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="p-2 bg-red-700 rounded-full hover:bg-red-800"
                  title="Account"
                >
                  <FiUser />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-red-600 w-40 rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 font-semibold border-b border-red-200">
                      👋 {user.name || 'Profile'}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-red-100"
                      onClick={closeAllMenus}
                    >
                      <FiUser className="inline mr-2" /> Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeAllMenus();
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-red-100"
                    >
                      <FiLogOut className="inline mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex space-x-4 text-xl">
                <Link to="/login" title="Login" className="hover:text-red-200" onClick={closeAllMenus}>
                  <div className="flex flex-col items-center text-xs">
                    <FiLogIn />
                    <span className="capitalize">Login</span>
                  </div>
                </Link>
                <Link to="/register" title="Register" className="hover:text-red-200" onClick={closeAllMenus}>
                  <div className="flex flex-col items-center text-xs">
                    <FiUserPlus />
                    <span className="capitalize">Register</span>
                  </div>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="md:hidden p-2">
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-4 pb-4 border-t border-red-500 flex flex-col items-center text-xl">
            <Link to="/" title="Home" onClick={closeAllMenus} className="hover:text-red-200">
              <div className="flex flex-col items-center text-xs">
                <FiHome />
                <span className="capitalize">Home</span>
              </div>
            </Link>
            <Link to="/products" title="Products" onClick={closeAllMenus} className="hover:text-red-200">
              <div className="flex flex-col items-center text-xs">
                <FiGrid />
                <span className="capitalize">Products</span>
              </div>
            </Link>
            {user && (
              <>
                <Link to="/cart" title="Cart" onClick={closeAllMenus} className="relative hover:text-red-200">
                  <div className="flex flex-col items-center text-xs">
                    <FiShoppingCart />
                    <span className="capitalize">Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-white text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/wishlist" title="Wishlist" onClick={closeAllMenus} className="hover:text-red-200">
                  <div className="flex flex-col items-center text-xs">
                    <FiHeart />
                    <span className="capitalize">Wishlist</span>
                  </div>
                </Link>
                <Link to="/orders" title="Orders" onClick={closeAllMenus} className="hover:text-red-200">
                  <div className="flex flex-col items-center text-xs">
                    <FiPackage />
                    <span className="capitalize">Orders</span>
                  </div>
                </Link>
                <Link to="/profile" title="Profile" onClick={closeAllMenus} className="hover:text-red-200">
                  <div className="flex flex-col items-center text-xs">
                    <FiUser />
                    <span className="capitalize">Profile</span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeAllMenus();
                  }}
                  title="Logout"
                  className="hover:text-red-200"
                >
                  <div className="flex flex-col items-center text-xs">
                    <FiLogOut />
                    <span className="capitalize">Logout</span>
                  </div>
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" title="Login" onClick={closeAllMenus} className="hover:text-red-200">
                  <div className="flex flex-col items-center text-xs">
                    <FiLogIn />
                    <span className="capitalize">Login</span>
                  </div>
                </Link>
                <Link to="/register" title="Register" onClick={closeAllMenus} className="hover:text-red-200">
                  <div className="flex flex-col items-center text-xs">
                    <FiUserPlus />
                    <span className="capitalize">Register</span>
                  </div>
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
