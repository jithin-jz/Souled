// src/components/AdminNavbar.jsx
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
    { label: 'Reports', path: '/admin/reports' },
  ];

  return (
    <header className="bg-red-100 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-red-600">Admin Panel</h1>

        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition hover:text-red-600 ${
                location.pathname === item.path
                  ? 'text-red-600 font-bold underline'
                  : 'text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-md transition"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
