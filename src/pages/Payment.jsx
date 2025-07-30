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
    if (!name || !phone || !street || !city || !pincode) throw new Error('All address fields are required');
    if (!/^\d{6}$/.test(pincode)) throw new Error('Pincode must be 6 digits');
    if (!/^\d{10}$/.test(phone)) throw new Error('Phone must be 10 digits');
    if (paymentMethod === 'UPI' && !upiId.trim()) throw new Error('Please enter your UPI ID');
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Shipping Information</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input name="name" label="Full Name" value={form.name} onChange={handleChange} />
                  <Input name="phone" label="Phone Number" value={form.phone} onChange={handleChange} />
                  <Input name="street" label="Street Address" value={form.street} onChange={handleChange} full />
                  <Input name="city" label="City" value={form.city} onChange={handleChange} />
                  <Input name="pincode" label="Pincode" value={form.pincode} onChange={handleChange} />
                </div>
              </section>

              {/* Payment Section */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Payment Method</h2>
                <div className="space-y-4">
                  <Radio name="paymentMethod" value="COD" label="Cash on Delivery (COD)" checked={form.paymentMethod === 'COD'} onChange={handleChange} />
                  <Radio name="paymentMethod" value="UPI" label="UPI Payment" checked={form.paymentMethod === 'UPI'} onChange={handleChange} />
                </div>

                {form.paymentMethod === 'UPI' && (
                  <div className="mt-4">
                    <Input name="upiId" label="UPI ID" value={form.upiId} onChange={handleChange} required />
                    <p className="mt-1 text-xs text-gray-500">e.g. 9876543210@ybl or yourname@okhdfcbank</p>
                  </div>
                )}
              </section>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Processing Order...
                  </span>
                ) : (
                  'Place Order & Pay'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:w-1/3 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      {item.quantity} × <span className="font-medium">{item.name}</span>
                    </div>
                    <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
                <div className="flex justify-between font-bold pt-2 border-t"><span>Total</span><span>₹{cartTotal.toFixed(2)}</span></div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-xs text-blue-700">
              <h3 className="font-medium mb-1">Secure Payment</h3>
              Your transaction is secured with 256-bit encryption. No payment data is stored.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component (without placeholder)
const Input = ({ name, label, value, onChange, full = false, required = true }) => (
  <div className={full ? 'sm:col-span-2' : ''}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>
);

// Reusable Radio Component
const Radio = ({ name, value, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      id={value}
      name={name}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    />
    <label htmlFor={value} className="ml-3 block text-sm text-gray-700">{label}</label>
  </div>
);

export default Payment;
