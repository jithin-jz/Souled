import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import NotAuthorized from '../components/NotAuthorized';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <NotAuthorized />;

  if (user.isBlock) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        Your account has been blocked. Please contact support.
      </div>
    );
  }

  if (user.role === 'Admin') return <NotAuthorized />;

  return children;
};

export default ProtectedRoute;
