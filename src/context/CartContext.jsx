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
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  // ========== CART ==========
  const addToCart = async (product) => {
    if (!user) return;

    const existing = cart.find(item => item.id === product.id);
    const updatedCart = existing
      ? cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    try {
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      setCart(updatedCart);
    } catch {
      // Silently fail
    }
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);

    try {
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      setCart(updatedCart);
    } catch {
      // Silently fail
    }
  };

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return removeFromCart(productId);

    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );

    try {
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
      setCart(updatedCart);
    } catch {
      // Silently fail
    }
  };

  const clearCart = async () => {
    try {
      await api.patch(`/users/${user.id}`, { cart: [] });
      setCart([]);
    } catch {
      // Silently fail
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
      // Silently fail
    }
  };

  const removeFromWishlist = async (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);

    try {
      const res = await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
      setWishlist(updatedWishlist);
      updateUserData && updateUserData(res.data);
    } catch {
      // Silently fail
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

        // Other
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

