import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    toast.success('Proceeding to checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/products" 
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-medium text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl shadow-md p-6 sticky top-20">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Order Summary</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-base font-semibold text-gray-800">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/payment"
              onClick={handleCheckout}
              className="block mt-6 w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-300 shadow-sm"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline CartItem Component
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onUpdateQuantity(item.id, newQty);
    }
  };

  const handleIncrease = () => {
    if (quantity < 10) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      onUpdateQuantity(item.id, newQty);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-xl border border-gray-100"
      />

      {/* Product Info */}
      <div className="flex-1 w-full sm:w-auto">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-green-600 font-bold mt-1">
          ₹{(item.price * quantity).toFixed(2)}
        </p>
      </div>

      {/* Quantity and Remove */}
      <div className="flex items-center gap-6 w-full sm:w-auto">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
          >
            −
          </button>
          <span className="px-4 py-1 text-sm font-medium text-gray-800">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={handleRemove}
          className="text-red-500 text-sm hover:text-red-700 font-medium transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Cart;
