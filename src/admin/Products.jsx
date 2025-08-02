import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
      setProducts((prev) => prev.filter((p) => p.id !== productId));
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

      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white tracking-wide">Manage Products</h2>
          <Link
            to="/admin/products/add"
            className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
          >
            + Add Product
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl bg-gray-800 shadow-inner">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-700 text-sm text-gray-300">
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Category</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-700 hover:bg-gray-700/30">
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">₹{product.price}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 flex gap-4">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-blue-400 hover:underline text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-400 hover:underline text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="text-center text-sm p-4 bg-gray-900 text-gray-400 border-t border-gray-700">
        &copy; {new Date().getFullYear()} SOULED Admin. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminProducts;
