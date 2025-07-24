import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await api.get(`/users/${user.id}`);
        setOrders(response.data.orders || []);
      } catch (error) {
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Found</h2>
        <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-500 text-sm">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <div className="text-gray-600 text-sm leading-relaxed">
                  <p>{order.address.name}</p>
                  <p>{order.address.phone}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city} - {order.address.pincode}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Payment Method</h4>
                <p className="text-gray-600">{order.paymentMethod}</p>
                {order.paymentMethod === 'UPI' && (
                  <p className="text-gray-500 text-sm">UPI ID: {order.upiId}</p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-2">Order Items</h4>
                <div className="divide-y divide-gray-200">
                  {order.items.map(item => (
                    <div key={item.id} className="py-3 flex justify-between">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(item.price * (item.quantity || 1)).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-end">
                <div className="text-right">
                  <p className="text-gray-600">Subtotal: <span className="font-medium">₹{order.total.toFixed(2)}</span></p>
                  <p className="text-gray-600">Shipping: <span className="font-medium">Free</span></p>
                  <p className="text-lg font-bold mt-2">Total: <span>₹{order.total.toFixed(2)}</span></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
