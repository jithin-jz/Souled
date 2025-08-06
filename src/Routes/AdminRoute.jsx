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

// If there's no logged-in user (!user)

// OR the user is not an admin (user.role !== 'Admin')
// → then show the <NotAuthorized /> component.