import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import api from '../utils/api';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const location = useLocation();
  const isRootDashboard = location.pathname === '/admin' || location.pathname === '/admin/dashboard';

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const usersRes = await api.get('/users');
    const productsRes = await api.get('/products');
    setUsers(usersRes.data || []);
    setProducts(productsRes.data || []);
    const allOrders = usersRes.data.flatMap(u => u.orders || []);
    setOrders(allOrders);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const categoryData = ['Men', 'Women'].map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length,
  }));

  const COLORS = ['#f87171', '#60a5fa'];
  const BAR_COLORS = ['#f87171', '#fb923c', '#34d399', '#a78bfa', '#facc15'];

  const topProducts = [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5)
    .map((p, i) => ({
      name: p.name,
      stock: p.stock,
      fill: BAR_COLORS[i % BAR_COLORS.length]
    }));

  const orderTimeline = orders.map((o, i) => ({
    name: `Order ${i + 1}`,
    total: o.total,
  }));

  const stockByCategory = ['Men', 'Women'].map((cat, i) => ({
    category: cat,
    stock: products
      .filter(p => p.category === cat)
      .reduce((sum, p) => sum + p.stock, 0),
    fill: BAR_COLORS[(i + 2) % BAR_COLORS.length]
  }));

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
        {isRootDashboard ? (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard title="Users" value={users.length} color="bg-blue-600" />
              <StatCard title="Products" value={products.length} color="bg-green-600" />
              <StatCard title="Orders" value={orders.length} color="bg-orange-600" />
              <StatCard title="Revenue" value={`₹${totalRevenue}`} color="bg-purple-600" />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart: Product Categories */}
              <div className="h-[300px]">
                <h2 className="text-lg font-semibold mb-2">Product Categories</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip {...chartTheme.tooltip} />
                    <Legend wrapperStyle={{ color: chartTheme.legendStyle.color }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart: Top Products by Stock */}
              <div className="h-[300px]">
                <h2 className="text-lg font-semibold mb-2">Top Products by Stock</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProducts}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                    <XAxis dataKey="name" stroke={chartTheme.textColor} />
                    <YAxis stroke={chartTheme.textColor} />
                    <Tooltip {...chartTheme.tooltip} />
                    <Bar dataKey="stock">
                      {topProducts.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Line Chart: Order Timeline */}
              <div className="h-[300px]">
                <h2 className="text-lg font-semibold mb-2">Order Revenue Timeline</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={orderTimeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                    <XAxis dataKey="name" stroke={chartTheme.textColor} />
                    <YAxis stroke={chartTheme.textColor} />
                    <Tooltip {...chartTheme.tooltip} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#a78bfa"
                      strokeWidth={2}
                      dot={{ fill: '#7c3aed' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart: Stock by Category */}
              <div className="h-[300px]">
                <h2 className="text-lg font-semibold mb-2">Total Stock by Category</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockByCategory}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                    <XAxis dataKey="category" stroke={chartTheme.textColor} />
                    <YAxis stroke={chartTheme.textColor} />
                    <Tooltip {...chartTheme.tooltip} />
                    <Bar dataKey="stock">
                      {stockByCategory.map((entry, index) => (
                        <Cell key={`cat-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>

      {/* Simple Footer */}
      <footer className="text-center text-sm p-4 bg-gray-900 text-gray-300">
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

export default Dashboard;
