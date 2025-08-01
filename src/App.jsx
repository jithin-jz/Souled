import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';

// Route Guards
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';
import AdminRoute from './Routes/AdminRoute';

// User Pages
import Home from './pages/Home';
import Products from './pages/Products/Products';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import ProfileDetails from './pages/ProfileDetails';

// Auth Pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Admin Pages
import Dashboard from './admin/Dashboard';
import Users from './admin/Users';
import AdminProducts from './admin/Products';
import Reports from './admin/Reports';

const AppContent = () => {
  const { loading, user } = useAuth();

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Only show Navbar/Footer if not Admin */}
      {user?.role !== 'Admin' && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Protected User Routes */}
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileDetails /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/reports" element={<AdminRoute><Reports /></AdminRoute>} />
        </Routes>
      </main>

      {user?.role !== 'Admin' && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <CartProvider>
        <AppContent />
        <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar />
      </CartProvider>
    </AuthProvider>
  </Router>
);

export default App;
