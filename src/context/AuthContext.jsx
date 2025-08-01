import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login Function (corrected)
  const login = async (email, password) => {
    try {
      const res = await api.get(`/users?email=${email}&password=${password}`);
      const foundUser = res.data[0];

      if (!foundUser) throw new Error('Invalid email or password');
      if (foundUser.isBlock) throw new Error('Your account is blocked');

      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      toast.success(`Welcome back, ${foundUser.name}`);

      // Route redirection will be handled in Login.jsx
      return foundUser;
    } catch (err) {
      toast.error(err.message);
      return null;
    }
  };

  // Register Function
  const register = async (name, email, password) => {
    try {
      const res = await api.get(`/users?email=${email}`);
      if (res.data.length > 0) throw new Error('Email already exists');

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role: 'User',
        isBlock: false,
        cart: [],
        wishlist: [],
        orders: [],
        created_at: new Date().toISOString(),
      };

      await api.post('/users', newUser);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
