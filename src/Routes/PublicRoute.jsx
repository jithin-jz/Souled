import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is logged in and not blocked
  if (user && !user.isBlock) {
    if (user.role === 'Admin') {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  // If blocked or not logged in, allow access
  return children;
};

export default PublicRoute;