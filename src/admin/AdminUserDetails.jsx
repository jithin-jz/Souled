import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import AdminNavbar from '../admin/AdminNavbar';

const AdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userRes = await api.get(`/users/${id}`);
        setUser(userRes.data);

        // If orders are inside the user object (embedded array)
        if (userRes.data.orders) {
          setOrders(userRes.data.orders);
        } else {
          const ordersRes = await api.get(`/orders?userId=${id}`);
          setOrders(ordersRes.data);
        }
      } catch (err) {
        toast.error('Failed to fetch user or orders');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <AdminNavbar />

      <main className="flex-grow px-6 py-10 max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-400 hover:underline mb-6"
        >
          ← Back to Users
        </button>

        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
          {user.name}'s Profile
        </h2>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10 space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={user.isBlock ? 'text-red-400' : 'text-green-400'}>
              {user.isBlock ? 'Blocked' : 'Active'}
            </span>
          </p>
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-white">Order History</h3>

        {orders.length === 0 ? (
          <div className="text-gray-400">No orders found for this user.</div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="text-lg font-semibold text-blue-400 hover:underline"
                      >
                        Order #{order.id}
                      </Link>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Processing'
                          ? 'bg-yellow-200 text-yellow-900'
                          : order.status === 'Shipped'
                          ? 'bg-blue-200 text-blue-900'
                          : 'bg-green-200 text-green-900'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Address */}
                  {order.address && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <div className="text-gray-300 text-sm leading-relaxed">
                        <p>{order.address.name}</p>
                        <p>{order.address.phone}</p>
                        <p>{order.address.street}</p>
                        <p>{order.address.city} - {order.address.pincode}</p>
                      </div>
                    </div>
                  )}

                  {/* Payment */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <p className="text-gray-300">{order.paymentMethod}</p>
                    {order.paymentMethod === 'UPI' && order.upiId && (
                      <p className="text-gray-400 text-sm">UPI ID: {order.upiId}</p>
                    )}
                  </div>

                  {/* Items */}
                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <div className="divide-y divide-gray-700">
                      {order.items?.map(item => (
                        <div key={item.id} className="py-3 flex justify-between">
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 object-cover rounded mr-4"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-gray-400 text-sm">
                                Qty: {item.quantity || 1}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="border-t border-gray-700 pt-4 flex justify-end">
                    <div className="text-right">
                      <p className="text-gray-300">
                        Subtotal: <span className="font-medium">₹{order.total?.toFixed(2)}</span>
                      </p>
                      <p className="text-gray-300">
                        Shipping: <span className="font-medium">Free</span>
                      </p>
                      <p className="text-lg font-bold mt-2">
                        Total: ₹{order.total?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center text-sm p-4 bg-gray-950 text-gray-400 border-t border-gray-800">
        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Souled Admin</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminUserDetails;
