import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const user = await login(email, password);
      if (user) {
        navigate(user.role === 'Admin' ? '/admin/dashboard' : '/');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12">
      <div className="max-w-md w-full space-y-8 border border-slate-700 bg-slate-800 rounded-xl shadow-md p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Login</h2>
          <p className="mt-2 text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-red-500 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm font-medium text-center">{errorMessage}</div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
