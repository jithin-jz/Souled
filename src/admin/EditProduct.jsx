import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import AdminNavbar from './AdminNavbar';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Men',
    stock: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setFormData(res.data);
      } catch {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, category, stock, image } = formData;
    if (!name || !price || !category || !stock || !image) {
      toast.error('Please fill out all fields');
      return;
    }

    setSubmitting(true);
    try {
      await api.patch(`/products/${id}`, {
        ...formData,
        price: parseFloat(price),
        stock: parseInt(stock)
      });
      toast.success('Product updated');
      navigate('/admin/products');
    } catch {
      toast.error('Failed to update');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <AdminNavbar />

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        {loading ? (
          <p className="text-gray-400">Loading product...</p>
        ) : (
          <div className="w-full max-w-xl bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-6 text-center">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white outline-none border border-gray-700"
                />
              </div>

              <div>
                <label className="block mb-1">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white outline-none border border-gray-700"
                />
              </div>

              <div>
                <label className="block mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white outline-none border border-gray-700"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white outline-none border border-gray-700"
                />
              </div>

              <div>
                <label className="block mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white outline-none border border-gray-700"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-2 rounded font-medium ${
                  submitting
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500'
                } transition`}
              >
                {submitting ? 'Saving...' : 'Update Product'}
              </button>
            </form>
          </div>
        )}
      </main>

      <footer className="text-center text-xs p-4 text-gray-500 border-t border-gray-800">
        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Souled Admin</span>
      </footer>
    </div>
  );
};

export default EditProduct;
