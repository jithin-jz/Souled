import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';

// Routes
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';

// Pages
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

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Protected Routes */}
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileDetails /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <CartProvider>
        <AppContent />
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar
          toastClassName={() =>
            "backdrop-blur-md bg-white/10 text-white text-sm rounded-xl shadow-lg w-72 h-16 flex items-center"
          }
          bodyClassName={() => "text-sm"}
        />
      </CartProvider>
    </AuthProvider>
  </Router>
);

export default App;
