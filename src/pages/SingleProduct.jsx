import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch {
        setError('Failed to fetch product');
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) return toast.warning('Please login to add to cart');
    if (!product || product.stock <= 0) return;
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!user) return toast.warning('Please login to continue');
    if (!product || product.stock <= 0) return;
    addToCart({ ...product, quantity: 1 });
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-xl text-gray-500 animate-pulse">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 font-medium mb-4">{error || 'Product not found'}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const outOfStock = product.stock === 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-green-600">Home</Link></li>
          <li>/</li>
          <li><Link to="/products" className="hover:text-green-600">Products</Link></li>
          <li>/</li>
          <li className="text-gray-800 font-semibold">{product.name}</li>
        </ol>
      </nav>

      {/* Product Display */}
      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">
        {/* Image */}
        <div className="rounded-xl overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl text-green-600 font-semibold">₹{product.price.toFixed(2)}</p>
            <p className="text-gray-700 text-sm leading-relaxed">{product.description || 'No description available.'}</p>
            <div className="text-sm">
              <span className="font-medium text-gray-800">Category: </span>
              <Link to={`/products?category=${product.category}`} className="text-green-500 hover:underline">
                {product.category}
              </Link>
            </div>
            <div>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  outOfStock
                    ? 'bg-red-100 text-red-700'
                    : product.stock < 10
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {outOfStock ? 'Out of Stock' : `${product.stock} in stock`}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-white shadow transition ${
                outOfStock
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={outOfStock}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-white shadow transition ${
                outOfStock
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-gray-900'
              }`}
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
