import { useAuth } from '../context/AuthContext';
import NotAuthorized from '../components/NotAuthorized';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'Admin') {
    return <NotAuthorized />;
  }

  return children;
};

export default AdminRoute;
