// src/pages/ProfileDetails.jsx
import { useAuth } from '../context/AuthContext';

const ProfileDetails = () => {
  const { user } = useAuth();

  if (!user) return <div className="p-6">Please log in to view your profile.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Profile Details</h2>
      <div className="space-y-4 text-gray-700">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add more user info as needed */}
      </div>
    </div>
  );
};

export default ProfileDetails;
