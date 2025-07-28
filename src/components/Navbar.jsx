import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  FiLogOut, FiLogIn, FiUserPlus, FiShoppingCart, FiMenu, FiX,
  FiUser, FiPackage, FiHome, FiGrid, FiHeart,
} from 'react-icons/fi';

const navLinks = [
  { to: '/', label: 'Home', icon: <FiHome /> },
  { to: '/products', label: 'Products', icon: <FiGrid /> },
];

const userLinks = [
  { to: '/cart', label: 'Cart', icon: <FiShoppingCart /> },
  { to: '/wishlist', label: 'Wishlist', icon: <FiHeart /> },
  { to: '/orders', label: 'Orders', icon: <FiPackage /> },
];

const authLinks = [
  { to: '/login', label: 'Login', icon: <FiLogIn /> },
  { to: '/register', label: 'Register', icon: <FiUserPlus /> },
];

const NavItem = ({ to, label, icon, onClick, badge }) => (
  <Link to={to} onClick={onClick} title={label} className="relative hover:text-red-200">
    <div className="flex flex-col items-center text-xs">
      {icon}
      <span className="capitalize">{label}</span>
    </div>
    {badge && (
      <span className="absolute -top-2 -right-3 bg-white text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {badge}
      </span>
    )}
  </Link>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const closeAllMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-red-600 shadow-md sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeAllMenus}>
            <img
              src="https://www.thesouledstore.com/static/img/non-member-logo2.4f4c390.gif"
              alt="Logo"
              className="h-10"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 text-xl">
            {navLinks.map(link => (
              <NavItem key={link.to} {...link} onClick={closeAllMenus} />
            ))}

            {user && userLinks.map(link => (
              <NavItem
                key={link.to}
                {...link}
                onClick={closeAllMenus}
                badge={link.to === '/cart' && cartCount > 0 ? cartCount : null}
              />
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3 relative">
            {/* User Dropdown */}
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
                    <Link to="/profile" className="block px-4 py-2 hover:bg-red-100" onClick={closeAllMenus}>
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
                {authLinks.map(link => (
                  <NavItem key={link.to} {...link} onClick={closeAllMenus} />
                ))}
              </div>
            )}

            {/* Mobile Toggle */}
            <button onClick={toggleMenu} className="md:hidden p-2">
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-4 pb-4 border-t border-red-500 flex flex-col items-center text-xl">
            {navLinks.map(link => (
              <NavItem key={link.to} {...link} onClick={closeAllMenus} />
            ))}
            {user ? (
              <>
                {userLinks.map(link => (
                  <NavItem
                    key={link.to}
                    {...link}
                    onClick={closeAllMenus}
                    badge={link.to === '/cart' && cartCount > 0 ? cartCount : null}
                  />
                ))}
                <NavItem to="/profile" label="Profile" icon={<FiUser />} onClick={closeAllMenus} />
                <button
                  onClick={() => {
                    logout();
                    closeAllMenus();
                  }}
                  className="hover:text-red-200"
                >
                  <div className="flex flex-col items-center text-xs">
                    <FiLogOut />
                    <span className="capitalize">Logout</span>
                  </div>
                </button>
              </>
            ) : (
              authLinks.map(link => (
                <NavItem key={link.to} {...link} onClick={closeAllMenus} />
              ))
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
