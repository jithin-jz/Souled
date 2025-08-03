import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import AdminNavbar from './AdminNavbar';

const AdminOrderManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, orderId, newStatus) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const updatedOrders = user.orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );

      await api.patch(`/users/${userId}`, { orders: updatedOrders });

      setUsers(prev =>
        prev.map(u => u.id === userId ? { ...u, orders: updatedOrders } : u)
      );

      toast.success('Order status updated');
    } catch {
      toast.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const allOrders = users.flatMap(user =>
    (user.orders || []).map(order => ({
      ...order,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
    }))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <AdminNavbar />

      <main className="flex-grow px-4 py-10 max-w-7xl mx-auto w-full">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 uppercase tracking-wide">
          Order Management
        </h2>

        {loading ? (
          <div className="text-center text-gray-400 animate-pulse">Loading orders...</div>
        ) : allOrders.length === 0 ? (
          <div className="text-center text-gray-400">No orders found.</div>
        ) : (
          <>
            {/* ✅ Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-800 shadow">
              <table className="min-w-full text-sm bg-gray-900">
                <thead className="bg-gray-800 sticky top-0 z-10">
                  <tr className="text-left text-gray-300 uppercase text-xs tracking-widest">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map(order => (
                    <tr
                      key={order.id}
                      className="border-t border-gray-800 hover:bg-gray-800/60 transition"
                    >
                      <td className="p-4 font-mono text-gray-200">{order.id}</td>
                      <td className="p-4">
                        <p className="font-semibold text-white">{order.userName}</p>
                        <p className="text-xs text-gray-400">{order.userEmail}</p>
                      </td>
                      <td className="p-4 text-gray-300">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 font-semibold text-green-300">
                        ₹{order.total.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold
                          ${order.status === 'Processing' ? 'bg-yellow-200 text-yellow-900'
                            : order.status === 'Shipped' ? 'bg-blue-200 text-blue-900'
                            : 'bg-green-200 text-green-900'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={e =>
                            handleStatusChange(order.userId, order.id, e.target.value)
                          }
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 text-xs rounded-md w-full"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Mobile Card View */}
            <div className="md:hidden space-y-6">
              {allOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-2 shadow-md"
                >
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Order ID:</span>
                    <span className="font-mono text-sm text-gray-200">{order.id}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{order.userName}</p>
                    <p className="text-xs text-gray-400">{order.userEmail}</p>
                  </div>
                  <p className="text-sm text-gray-300">
                    <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-green-400 font-bold">
                    ₹{order.total.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    <strong>Status:</strong>{' '}
                    <span className={`font-semibold px-2 py-1 rounded-full text-xs
                      ${order.status === 'Processing' ? 'bg-yellow-200 text-yellow-900'
                        : order.status === 'Shipped' ? 'bg-blue-200 text-blue-900'
                        : 'bg-green-200 text-green-900'}`}>
                      {order.status}
                    </span>
                  </p>
                  <select
                    value={order.status}
                    onChange={e =>
                      handleStatusChange(order.userId, order.id, e.target.value)
                    }
                    className="w-full mt-2 text-xs bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="text-center text-sm p-4 bg-gray-950 text-gray-500 border-t border-gray-800">
        &copy; {new Date().getFullYear()}{' '}
        <span className="text-white font-semibold">Souled Admin</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminOrderManagement;
