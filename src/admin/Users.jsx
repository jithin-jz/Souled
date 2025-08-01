import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import AdminNavbar from './AdminNavbar';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const toggleBlock = async (id, currentStatus) => {
    try {
      await api.patch(`/users/${id}`, { isBlock: !currentStatus });
      toast.success(`User ${!currentStatus ? 'blocked' : 'unblocked'} successfully`);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar /> {/* ✅ Navbar inserted */}

      <main className="flex-grow p-6 bg-white">
        <h2 className="text-2xl font-bold text-red-600 mb-4">All Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.isBlock ? 'Blocked' : 'Active'}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleBlock(user.id, user.isBlock)}
                      className={`px-3 py-1 rounded text-white text-sm ${
                        user.isBlock ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {user.isBlock ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;
