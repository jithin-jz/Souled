import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Heart, Heart as HeartOutline, Search, Filter, X } from 'lucide-react';

const priceRanges = [
  { label: '₹0 - ₹999', min: 0, max: 999 },
  { label: '₹1000 - ₹1999', min: 1000, max: 1999 },
  { label: '₹2000 - ₹2999', min: 2000, max: 2999 },
  { label: '₹3000+', min: 3000, max: Infinity },
];

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setAllProducts(res.data);
      } catch (err) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...allProducts];

    if (selectedPrices.length) {
      result = result.filter(product =>
        selectedPrices.some(range => product.price >= range.min && product.price <= range.max)
      );
    }

    if (searchTerm.trim()) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [allProducts, selectedPrices, searchTerm]);

  const togglePriceFilter = (range) => {
    setSelectedPrices(prev =>
      prev.some(r => r.label === range.label)
        ? prev.filter(r => r.label !== range.label)
        : [...prev, range]
    );
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please log in to add items to cart');
      return;
    }

    addToCart(product);
    removeFromWishlist(product.id);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please log in to manage wishlist');
      return;
    }

    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Filter Button (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 text-gray-600" />
          <span>Filters</span>
          {selectedPrices.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {selectedPrices.length}
            </span>
          )}
        </button>

        {/* Price Filters (Desktop) */}
        <div className="hidden md:flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
          <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Price:</span>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map(range => (
              <button
                key={range.label}
                onClick={() => togglePriceFilter(range)}
                className={`px-3 py-1 text-sm rounded-full transition ${
                  selectedPrices.some(r => r.label === range.label)
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {showFilters && (
        <div className="md:hidden bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-800">Filters</h3>
            <button onClick={() => setShowFilters(false)}>
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Price Range</h4>
            <div className="space-y-2">
              {priceRanges.map(range => (
                <label
                  key={range.label}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedPrices.some(r => r.label === range.label)}
                    onChange={() => togglePriceFilter(range)}
                    className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {selectedPrices.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedPrices.map(range => (
            <div
              key={range.label}
              className="flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm"
            >
              {range.label}
              <button
                onClick={() => togglePriceFilter(range)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {selectedPrices.length > 0 && (
            <button
              onClick={() => setSelectedPrices([])}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <p className="text-center py-10 text-gray-500">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden relative group"
            >
              <Link to={`/products/${product.id}`} className="block">
                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleWishlistToggle(product, e)}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-red-50 transition"
                  >
                    {isInWishlist(product.id) ? (
                      <Heart className="text-red-600 fill-red-600" size={20} />
                    ) : (
                      <HeartOutline className="text-gray-500 group-hover:text-red-500" size={20} />
                    )}
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                  <p className="text-red-600 font-bold text-xl">₹{product.price}</p>
                </div>
              </Link>

              {/* Add to Cart Button */}
              <div className="px-4 pb-4">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;