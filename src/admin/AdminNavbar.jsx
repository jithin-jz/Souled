import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Orders', path: '/admin/orders' }, // ✅ New Orders link
    { label: 'Reports', path: '/admin/reports' },
  ];

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-700 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap">
        {/* Logo */}
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 tracking-widest uppercase">
          Souled Admin
        </h1>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold uppercase tracking-wide px-3 py-1.5 rounded-md transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-yellow-400 text-black shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-300 border border-gray-600 px-4 py-1.5 rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 hover:shadow-md group"
        >
          <FiLogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
