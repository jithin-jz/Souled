// src/pages/AdminDashboard.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const Dashboard = () => {
  const location = useLocation();

  const isRootDashboard = location.pathname === '/admin' || location.pathname === '/admin/dashboard';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <AdminNavbar />

      {/* Main Content */}
      <main className="flex-grow p-6 bg-white">
        {isRootDashboard ? (
          <div className="text-center mt-20">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Welcome to Admin Dashboard</h1>
            <p className="text-gray-600 text-lg">
              Use the navigation links above to manage users, products, and view reports.
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
