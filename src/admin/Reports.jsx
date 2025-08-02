import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import AdminNavbar from './AdminNavbar';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Reports = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get('/users');
        const usersData = usersRes.data || [];
        setUsers(usersData);

        // Extract all nested orders from users
        const allOrders = usersData.flatMap(user => user.orders || []);
        setOrders(allOrders);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setUsers([]);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  const revenueTimeline = orders.map((o, i) => ({
    name: `Order ${i + 1}`,
    total: Number(o.total) || 0,
  }));

  const paymentMethods = ['UPI', 'COD'];
  const paymentDistribution = paymentMethods.map(method => ({
    name: method,
    count: orders.filter(o => o.paymentMethod === method).length
  }));

  const statusOptions = ['Processing', 'Shipped', 'Delivered'];
  const statusCounts = statusOptions.map(status => ({
    name: status,
    count: orders.filter(o => o.status === status).length
  }));

  const COLORS = ['#34d399', '#f87171', '#facc15'];

  const chartTheme = {
    backgroundColor: 'transparent',
    textColor: '#e2e8f0',
    gridColor: '#4a5568',
    tooltip: {
      contentStyle: {
        backgroundColor: '#1f2937',
        borderColor: '#4a5568',
        borderRadius: 8,
        color: '#e2e8f0',
      },
      itemStyle: {
        color: '#e2e8f0',
      },
      labelStyle: {
        color: '#f1f5f9',
      },
      cursor: { fill: 'transparent' },
    },
    legendStyle: {
      color: '#cbd5e1',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <AdminNavbar />
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold tracking-wide mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
          Admin Reports Overview
        </h2>

        {loading ? (
          <div className="text-center text-gray-400">Loading reports...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard title="Total Orders" value={totalOrders} color="bg-blue-600" />
              <StatCard title="Revenue" value={`₹${totalRevenue.toFixed(2)}`} color="bg-green-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Line Chart: Revenue Over Orders */}
              <div className="h-[300px]">
                <h2 className="text-lg font-semibold mb-2">Revenue Timeline</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueTimeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                    <XAxis dataKey="name" stroke={chartTheme.textColor} />
                    <YAxis stroke={chartTheme.textColor} />
                    <Tooltip {...chartTheme.tooltip} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#facc15"
                      strokeWidth={2}
                      dot={{ fill: '#facc15' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart: Payment Method Distribution */}
              <div className="h-[300px]">
                <h2 className="text-lg font-semibold mb-2">Payment Methods</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentDistribution}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentDistribution.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip {...chartTheme.tooltip} />
                    <Legend wrapperStyle={{ color: chartTheme.legendStyle.color }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart: Order Status Distribution */}
              <div className="h-[300px] lg:col-span-2">
                <h2 className="text-lg font-semibold mb-2">Order Status Distribution</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusCounts}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                    <XAxis dataKey="name" stroke={chartTheme.textColor} />
                    <YAxis stroke={chartTheme.textColor} />
                    <Tooltip {...chartTheme.tooltip} />
                    <Bar dataKey="count">
                      {statusCounts.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="text-center text-sm p-4 bg-gray-900 text-gray-400 border-t border-gray-700">
        &copy; {new Date().getFullYear()} SOULED Admin. All rights reserved.
      </footer>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`rounded-xl text-white p-5 ${color} transition-transform hover:scale-105`}>
    <p className="text-sm uppercase font-semibold opacity-90">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default Reports;
