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
    <div className="min-h-screen flex flex-col">
      <AdminNavbar /> {/* ✅ Navbar added */}

      <main className="flex-grow p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-red-600">Manage Products</h2>
          <Link
            to="/admin/products/add"
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded transition"
          >
            + Add Product
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">₹{product.price}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3 flex gap-4">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No products found.
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

export default AdminProducts;
