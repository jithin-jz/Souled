import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white text-center px-4">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-400 mb-6">
        You are not authorized to view this page.
      </p>
      <Link
        to="/"
        className="px-5 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotAuthorized;
