import { useState } from 'react';
// import { useCart } from '../../context/CartContext';
import { CartProvider } from '../../context/CartContext';
import { toast } from 'react-toastify';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  return (
    <div className="flex py-4">
      <div className="flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-20 h-20 object-cover rounded-md"
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{item.name}</h3>
          <p className="ml-4">${(item.price * quantity).toFixed(2)}</p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center">
            <label htmlFor={`quantity-${item.id}`} className="mr-2">Qty:</label>
            <select
              id={`quantity-${item.id}`}
              value={quantity}
              onChange={handleQuantityChange}
              className="border rounded p-1"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="font-medium text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;