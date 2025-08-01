import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import AdminNavbar from './AdminNavbar';

const Reports = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar /> {/* ✅ Navbar added */}

      <main className="flex-grow p-6 bg-white">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Order Reports</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow-md rounded">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
