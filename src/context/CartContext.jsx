import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserCart();
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [user]);

  const fetchUserCart = async () => {
    try {
      if (!user) return;
      
      const response = await api.get(`/users/${user.id}`);
      setCart(response.data.cart || []);
    } catch (error) {
      toast.error('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    try {
      const existingItem = cart.find(item => item.id === product.id);
      
      let updatedCart;
      if (existingItem) {
        updatedCart = cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
      }
      
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      setCart(updatedCart);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter(item => item.id !== productId);
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      setCart(updatedCart);
      toast.success('Removed from cart');
    } catch (error) {
      toast.error('Failed to remove from cart');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    try {
      const updatedCart = cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      setCart(updatedCart);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    try {
      await api.patch(`/users/${user.id}`, { cart: [] });
      setCart([]);
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading, 
      cartCount, 
      cartTotal,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);