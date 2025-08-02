import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import AdminNavbar from './AdminNavbar';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Men',
    stock: '',
    image: ''
  });

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

    try {
      await api.post('/products', {
        ...formData,
        price: parseFloat(price),
        stock: parseInt(stock),
      });
      toast.success('Product added successfully');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      <AdminNavbar />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider uppercase">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-1 font-semibold">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Iron Man T-Shirt"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="499"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="100"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 px-6 py-3 rounded-xl font-bold text-white transition duration-200 uppercase shadow-lg"
            >
              Add Product
            </button>
          </form>
        </div>
      </main>

      <footer className="text-center text-sm p-4 bg-gray-950 text-gray-400 border-t border-gray-800">
        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Souled Admin</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default AddProduct;
