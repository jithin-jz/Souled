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
    if (!name || !phone || !street || !city || !pincode)
      throw new Error('All address fields are required');
    if (!/^\d{6}$/.test(pincode))
      throw new Error('Pincode must be 6 digits');
    if (!/^\d{10}$/.test(phone))
      throw new Error('Phone must be 10 digits');
    if (paymentMethod === 'UPI' && !upiId.trim())
      throw new Error('Please enter your UPI ID');
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

      const res = await api.get(`/users/${user.id}`);
      const updatedUser = {
        ...res.data,
        orders: [...(res.data.orders || []), order],
        address,
        cart: [],
      };

      await api.patch(`/users/${user.id}`, updatedUser);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/payment-success');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
          {/* Form */}
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Info */}
              <section>
                <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input name="name" label="Full Name" value={form.name} onChange={handleChange} />
                  <Input name="phone" label="Phone Number" value={form.phone} onChange={handleChange} />
                  <Input name="street" label="Street Address" value={form.street} onChange={handleChange} full />
                  <Input name="city" label="City" value={form.city} onChange={handleChange} />
                  <Input name="pincode" label="Pincode" value={form.pincode} onChange={handleChange} />
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <Radio name="paymentMethod" value="COD" label="Cash on Delivery (COD)" checked={form.paymentMethod === 'COD'} onChange={handleChange} />
                  <Radio name="paymentMethod" value="UPI" label="UPI Payment" checked={form.paymentMethod === 'UPI'} onChange={handleChange} />
                </div>

                {form.paymentMethod === 'UPI' && (
                  <div className="mt-4">
                    <Input name="upiId" label="UPI ID" value={form.upiId} onChange={handleChange} required />
                    <p className="mt-1 text-xs text-gray-400">Example: 9876543210@ybl</p>
                  </div>
                )}
              </section>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Place Order & Pay'
                )}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="md:w-1/3 space-y-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">Order Summary</h2>
              <div className="space-y-4 text-sm">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>{item.quantity} × {item.name}</div>
                    <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-600 mt-4 text-sm space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="text-green-400">Free</span></div>
                <div className="flex justify-between font-semibold pt-2 border-t border-gray-600"><span>Total</span><span>₹{cartTotal.toFixed(2)}</span></div>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg text-xs text-gray-300 border border-gray-600">
              <h3 className="font-medium mb-1 text-white">🔒 Secure Payment</h3>
              Payments are encrypted with 256-bit SSL. No data is stored.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dark input field
const Input = ({ name, label, value, onChange, full = false, required = true }) => (
  <div className={full ? 'sm:col-span-2' : ''}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
    />
  </div>
);

// Dark radio input
const Radio = ({ name, value, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      id={value}
      name={name}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-green-500 bg-gray-800 border-gray-600 focus:ring-green-500"
    />
    <label htmlFor={value} className="ml-3 block text-sm text-gray-300">{label}</label>
  </div>
);

export default Payment;
