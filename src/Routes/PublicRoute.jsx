// components/PublicRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  // If logged in, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
