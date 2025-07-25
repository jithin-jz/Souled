import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, updateUserData } = useAuth();

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setCart([]);
      setWishlist([]);
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const res = await api.get(`/users/${user.id}`);
      setCart(res.data.cart || []);
      setWishlist(res.data.wishlist || []);
    } catch {
      // Handle silently
    } finally {
      setLoading(false);
    }
  };

  // ========== CART ==========
  const addToCart = async (product) => {
    if (!user) return;

    try {
      const existing = cart.find(item => item.id === product.id);
      let updatedCart;

      if (existing) {
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
    } catch {
      // Handle silently
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter(item => item.id !== productId);
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      setCart(updatedCart);
    } catch {
      // Handle silently
    }
  };

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return removeFromCart(productId);

    try {
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: newQty } : item
      );
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      setCart(updatedCart);
    } catch {
      // Handle silently
    }
  };

  const clearCart = async () => {
    try {
      await api.patch(`/users/${user.id}`, { cart: [] });
      setCart([]);
    } catch {
      // Handle silently
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  // ========== WISHLIST ==========
  const addToWishlist = async (product) => {
    if (!user) return;

    const exists = wishlist.some(item => item.id === product.id);
    if (exists) return;

    const updatedWishlist = [...wishlist, product];

    try {
      const res = await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
      setWishlist(updatedWishlist);
      updateUserData && updateUserData(res.data);
    } catch {
      // Handle silently
    }
  };

  const removeFromWishlist = async (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);

    try {
      const res = await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
      setWishlist(updatedWishlist);
      updateUserData && updateUserData(res.data);
    } catch {
      // Handle silently
    }
  };

  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        // Cart
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,

        // Wishlist
        wishlist,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,

        // Loading
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
