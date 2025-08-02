import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import AdminNavbar from './AdminNavbar';
import { Eye, Ban, CheckCircle, Trash2 } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <AdminNavbar />

      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold mb-6 text-center uppercase tracking-widest">Manage Users</h2>

        <div className="overflow-x-auto rounded-xl bg-gray-800 shadow-inner">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="bg-gray-700 text-sm text-gray-300">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-700/30">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4">
                    <span className={`font-medium ${user.isBlock ? 'text-red-400' : 'text-green-400'}`}>
                      {user.isBlock ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-4 justify-center flex-wrap">
                    <button
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      className="hover:scale-110 transition-transform"
                      title="View"
                    >
                      <Eye className="w-5 h-5 text-blue-400 hover:text-blue-300" />
                    </button>
                    <button
                      onClick={() => toggleBlock(user.id, user.isBlock)}
                      className="hover:scale-110 transition-transform"
                      title={user.isBlock ? 'Unblock' : 'Block'}
                    >
                      {user.isBlock ? (
                        <CheckCircle className="w-5 h-5 text-green-400 hover:text-green-300" />
                      ) : (
                        <Ban className="w-5 h-5 text-yellow-400 hover:text-yellow-300" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="hover:scale-110 transition-transform"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-400 hover:text-red-300" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="text-center text-sm p-4 bg-gray-950 text-gray-400 border-t border-gray-800">
        &copy; {new Date().getFullYear()}{' '}
        <span className="text-white font-semibold">Souled Admin</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminUsers;
