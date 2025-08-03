import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../utils/api';
import AdminNavbar from './AdminNavbar';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
      toast.error('Failed to fetch products');
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${productId}`);
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <AdminNavbar />

      <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-300">
            Manage Products
          </h2>
          <Link
            to="/admin/products/add"
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold px-5 py-2 rounded-xl shadow-lg text-sm"
          >
            + Add Product
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl bg-gray-800 border border-gray-700">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-700 text-gray-300 uppercase tracking-widest text-xs">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-400">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} className="border-t border-gray-700 hover:bg-gray-700/20">
                    <td className="p-4 text-white">{product.name}</td>
                    <td className="p-4 text-green-300 font-semibold">₹{product.price}</td>
                    <td className="p-4 text-gray-200">{product.category}</td>
                    <td className="p-4 flex justify-center gap-4 text-sm">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="text-blue-400 hover:text-blue-300"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="text-center text-sm p-4 bg-gray-950 text-gray-400 border-t border-gray-800">
        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Souled Admin</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminProducts;
