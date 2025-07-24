import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Payment = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    pincode: '',
    upiId: '',
    paymentMethod: 'COD',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, phone, street, city, pincode, paymentMethod, upiId } = form;
    if (!name || !phone || !street || !city || !pincode) {
      throw new Error('All address fields are required');
    }
    if (!/^\d{6}$/.test(pincode)) {
      throw new Error('Pincode must be 6 digits');
    }
    if (!/^\d{10}$/.test(phone)) {
      throw new Error('Phone must be 10 digits');
    }
    if (paymentMethod === 'UPI' && !upiId.trim()) {
      throw new Error('Please enter your UPI ID');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      validateForm();

      const address = {
        name: form.name,
        phone: form.phone,
        street: form.street,
        city: form.city,
        pincode: form.pincode,
      };

      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: cart,
        total: cartTotal,
        address,
        paymentMethod: form.paymentMethod,
        upiId: form.paymentMethod === 'UPI' ? form.upiId : '',
        status: 'Processing',
      };

      const userRes = await api.get(`/users/${user.id}`);
      const updatedUser = {
        ...userRes.data,
        orders: [...(userRes.data.orders || []), order],
        address,
        cart: [],
      };

      await api.patch(`/users/${user.id}`, updatedUser);

      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Checkout</h2>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">Shipping Address</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="street"
              placeholder="Street Address"
              value={form.street}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={form.paymentMethod === 'COD'}
                  onChange={handleChange}
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={form.paymentMethod === 'UPI'}
                  onChange={handleChange}
                />
                UPI Payment
              </label>
            </div>
          </div>

          {form.paymentMethod === 'UPI' && (
            <input
              type="text"
              name="upiId"
              placeholder="Enter your UPI ID"
              value={form.upiId}
              onChange={handleChange}
              className="input"
              required
            />
          )}

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Order Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
