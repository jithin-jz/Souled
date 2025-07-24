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
    if (!product || product.stock <= 0) return;
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading product...</p>
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

  const outOfStock = product.stock === 0;

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-6">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-[450px] rounded-xl"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>

          <p className="text-2xl text-green-600 font-semibold">₹{product.price.toFixed(2)}</p>

          <p className="text-gray-700 leading-relaxed">
            {product.description || 'No description available.'}
          </p>

          <div>
            <span className="font-medium text-gray-800">Category:</span>{' '}
            <Link
              to={`/products?category=${product.category}`}
              className="text-green-500 hover:underline"
            >
              {product.category}
            </Link>
          </div>

          {/* Stock Info */}
          <div className="flex items-center gap-3">
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`${
                outOfStock
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white font-semibold px-6 py-3 rounded-lg shadow`}
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                if (!outOfStock) {
                  handleAddToCart();
                  navigate('/cart');
                }
              }}
              disabled={outOfStock}
              className={`${
                outOfStock
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-gray-900'
              } text-white font-semibold px-6 py-3 rounded-lg shadow`}
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
