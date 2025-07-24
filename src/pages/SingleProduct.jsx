import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import api from '../utils/api';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product');
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 h-96 bg-gray-300 rounded"></div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="h-12 bg-gray-300 rounded w-1/3 mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
          {error || 'Product not found'}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-green-600">Home</Link></li>
          <li>/</li>
          <li><Link to="/products" className="hover:text-green-600">Products</Link></li>
          <li>/</li>
          <li className="text-gray-800 font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-white rounded-xl shadow p-4">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl object-cover w-full h-[450px]"
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl text-green-600 font-semibold">₹{product.price.toFixed(2)}</p>

          <p className="text-gray-600">{product.description || 'No description available.'}</p>

          <div>
            <span className="font-medium text-gray-700">Category:</span>{' '}
            <Link
              to={`/products?category=${product.category}`}
              className="text-green-500 hover:underline"
            >
              {product.category}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                handleAddToCart();
                navigate('/cart');
              }}
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg shadow"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
