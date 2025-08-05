import { useAuth } from '../context/AuthContext';

const ProfileDetails = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-slate-900 text-white px-4">
        <div className="bg-slate-800 p-6 rounded-lg shadow max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">Please Log In</h2>
          <p className="text-slate-400">You need to be logged in to view your profile details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-slate-900 text-white rounded-lg shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold text-red-500 mb-6">Profile Details</h2>
      <div className="space-y-4 text-slate-300">
        <div>
          <span className="font-semibold text-white">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold text-white">Email:</span> {user.email}
        </div>
        {/* Extend with more fields if needed */}
      </div>
    </div>
  );
};

export default ProfileDetails;
