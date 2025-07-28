// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const response = await api.get(`/users?email=${email}`);
      if (response.data.length === 0) {
        throw new Error('User not found');
      }

      const foundUser = response.data[0];

      if (foundUser.password !== password) {
        throw new Error('Invalid credentials');
      }

      if (foundUser.isBlock) {
        throw new Error('User is blocked');
      }

      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ✅ Register function
  const register = async (name, email, password) => {
    try {
      const existing = await api.get(`/users?email=${email}`);
      if (existing.data.length > 0) {
        throw new Error('User already exists');
      }

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
        created_at: new Date().toISOString()
      };

      await api.post('/users', newUser);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ✅ Logout function
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
