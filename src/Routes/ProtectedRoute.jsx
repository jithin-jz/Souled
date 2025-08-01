import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loader while checking auth status
  if (loading) return <Loader />;

  // Redirect if not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Optional: block check
  if (user.isBlock) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        Your account has been blocked. Please contact support.
      </div>
    );
  }

  // Authenticated and not blocked
  return children;
};

export default ProtectedRoute;
