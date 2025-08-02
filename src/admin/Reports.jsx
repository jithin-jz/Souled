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
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <AdminNavbar />

      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-white tracking-wide mb-6">Order Reports</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ReportCard title="Total Orders" value={totalOrders} color="bg-blue-600" />
          <ReportCard title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} color="bg-green-600" />
        </div>
      </main>

      <footer className="text-center text-sm p-4 bg-gray-900 text-gray-400 border-t border-gray-700">
        &copy; {new Date().getFullYear()} SOULED Admin. All rights reserved.
      </footer>
    </div>
  );
};

const ReportCard = ({ title, value, color }) => (
  <div className={`rounded-xl text-white p-6 ${color} shadow-inner transition-transform hover:scale-105`}>
    <h3 className="text-sm uppercase font-semibold opacity-90 mb-1">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Reports;
