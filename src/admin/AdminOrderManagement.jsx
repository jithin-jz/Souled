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

      <main className="flex-grow px-6 py-10 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
          Manage All Orders
        </h2>

        {loading ? (
          <div className="text-center text-gray-400">Loading orders...</div>
        ) : allOrders.length === 0 ? (
          <div className="text-center text-gray-400">No orders found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-800">
            <table className="min-w-full bg-gray-900 text-sm">
              <thead className="bg-gray-800 sticky top-0 z-10">
                <tr className="text-left text-gray-300 uppercase text-xs tracking-widest">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map(order => (
                  <tr
                    key={order.id}
                    className="border-t border-gray-800 hover:bg-gray-800 transition-all"
                  >
                    <td className="p-4 text-gray-100">{order.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-white">{order.userName}</p>
                        <p className="text-xs text-gray-400">{order.userEmail}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-semibold text-green-300">
                      ₹{order.total.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'Processing'
                            ? 'bg-yellow-200 text-yellow-900'
                            : order.status === 'Shipped'
                            ? 'bg-blue-200 text-blue-900'
                            : 'bg-green-200 text-green-900'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={e =>
                          handleStatusChange(order.userId, order.id, e.target.value)
                        }
                        className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md"
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
