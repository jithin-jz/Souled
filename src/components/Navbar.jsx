import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
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
} from "react-icons/fi";

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

  if (user?.role === "Admin") return null;

  const navLinks = [
    { to: "/", icon: <FiHome />, label: "Home" },
    { to: "/products", icon: <FiGrid />, label: "Products" },
  ];

  const userLinks = [
    { to: "/cart", icon: <FiShoppingCart />, label: "Cart", badge: cartCount },
    {
      to: "/wishlist",
      icon: <FiHeart />,
      label: "Wishlist",
      badge: wishlistCount,
    },
    { to: "/orders", icon: <FiPackage />, label: "Orders" },
  ];

  const authLinks = [
    { to: "/login", icon: <FiLogIn />, label: "Login" },
    { to: "/register", icon: <FiUserPlus />, label: "Register" },
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
              className={`p-2 rounded-md text-white hover:bg-slate-700 transition ${
                location.pathname === link.to ? "bg-slate-800" : ""
              }`}
              title={link.label}
            >
              {link.icon}
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
              loading="eager" // 👈 Fix: prevents lazy placeholder issue
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
                  title="User"
                >
                  <FiUser />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-slate-800 text-white rounded-md shadow-lg py-1 z-50 border border-slate-700">
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
                className={`p-2 rounded-md text-white hover:bg-slate-700 transition ${
                  location.pathname === link.to ? "bg-slate-800" : ""
                }`}
                title={link.label}
              >
                {link.icon}
              </Link>
            ))
          )}
        </div>

        {/* Mobile Menu: Menu Left + Cart Right */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Left: Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-md text-white hover:bg-slate-700"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Right: Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 rounded-md text-white hover:bg-slate-700 transition"
            title="Cart"
          >
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 px-4 pt-4 pb-6 space-y-4 border-t border-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 p-2 rounded-md text-white hover:bg-slate-700"
            >
              {link.icon} <span>{link.label}</span>
            </Link>
          ))}
          {user ? (
            <>
              {userLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 p-2 rounded-md text-white hover:bg-slate-700"
                >
                  {link.icon} <span>{link.label}</span>
                  {link.badge > 0 && (
                    <span className="ml-auto bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <button
                onClick={logout}
                className="w-full text-left flex items-center gap-2 p-2 rounded-md text-white hover:bg-slate-700"
              >
                <FiLogOut /> <span>Logout</span>
              </button>
            </>
          ) : (
            authLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 p-2 rounded-md text-white hover:bg-slate-700"
              >
                {link.icon} <span>{link.label}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
