import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import Loader from '../components/Loader';
import { Search, Filter, X } from 'lucide-react';

const priceRanges = [
  { label: '₹0 - ₹999', min: 0, max: 999 },
  { label: '₹1000 - ₹1999', min: 1000, max: 1999 },
  { label: '₹2000 - ₹2999', min: 2000, max: 2999 },
  { label: '₹3000+', min: 3000, max: Infinity },
];

const categories = ['Men', 'Women'];

const sectionBanners = {
  Men: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/users/artists/20250507115108-cp-1.jpg?format=webp&w=1500&dpr=1.5',
  Women: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/users/artists/20241202232928-cp-1.jpg?format=webp&w=1500&dpr=1.5',
};

const ProductCard = ({ product, onToggleWishlist, isWishlisted, onAddToCart }) => {
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div className="group relative">
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FiHeart className="text-gray-500 group-hover:text-red-500" />
        )}
      </button>

      <Link to={`/products/${product.id}`} className="block">
        <div className="overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name || 'Product'}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-3 flex justify-between items-center gap-2">
          <div>
            <h3 className="text-gray-900 font-medium">{product.name}</h3>
            <p className="text-gray-900 font-bold">₹{product.price}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-gray-900 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const { wishlist, addToWishlist, removeFromWishlist, addToCart, cart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/products');
        setAllProducts(res.data);
      } catch {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    let result = [...allProducts];

    if (selectedPrices.length) {
      result = result.filter(product =>
        selectedPrices.some(range => product.price >= range.min && product.price <= range.max)
      );
    }

    if (selectedCategories.length) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    if (searchTerm.trim()) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [allProducts, selectedPrices, selectedCategories, searchTerm]);

  const togglePriceFilter = (range) => {
    setSelectedPrices((prev) =>
      prev.some(r => r.label === range.label)
        ? prev.filter(r => r.label !== range.label)
        : [...prev, range]
    );
  };

  const toggleCategoryFilter = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleToggleWishlist = (product) => {
    if (!user) return toast.warn('Please login to manage wishlist');
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
    toast[isInWishlist ? 'info' : 'success'](
      `${product.name} ${isInWishlist ? 'removed from' : 'added to'} wishlist`
    );
  };

  const handleAddToCart = (product) => {
    if (!user) return toast.warn('Please login to add items to cart');
    const isInCart = cart.some(item => item.id === product.id);
    if (isInCart) {
      toast.info(`${product.name} is already in the cart`);
    } else {
      addToCart(product);
      toast.success(`${product.name} added to cart`);
    }
  };

  const groupedByCategory = categories.map((cat) => ({
    category: cat,
    banner: sectionBanners[cat],
    products: filteredProducts.filter((p) => p.category === cat),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50"
        >
          <Filter className="w-5 h-5 text-gray-600" />
          <span>Filters</span>
        </button>

        {/* Desktop Filters */}
        <div className="hidden md:flex flex-wrap items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
          <span className="text-sm font-medium text-gray-600">Price:</span>
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

          <span className="text-sm font-medium text-gray-600 ml-4">Category:</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => toggleCategoryFilter(category)}
              className={`px-3 py-1 text-sm rounded-full transition ${
                selectedCategories.includes(category)
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="md:hidden bg-white p-4 rounded-lg shadow border border-gray-200 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800">Filters</h3>
            <button onClick={() => setShowFilters(false)}>
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700">Price Range</h4>
            <div className="space-y-2 mt-2">
              {priceRanges.map(range => (
                <label key={range.label} className="flex items-center space-x-2">
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

          <div>
            <h4 className="text-sm font-medium text-gray-700">Category</h4>
            <div className="space-y-2 mt-2">
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategoryFilter(category)}
                    className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product Sections */}
      {loading ? (
        <Loader />
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        groupedByCategory.map(({ category, products, banner }) =>
          products.length > 0 ? (
            <div key={category} className="mb-12">
              <div className="mb-4">
                <img
                  src={banner}
                  alt={`${category} Banner`}
                  className="w-full h-52 object-cover rounded-xl shadow-sm"
                />
                <h2 className="text-2xl font-semibold mt-3 text-gray-800">{category} Collection</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    isWishlisted={wishlist.some((item) => item.id === product.id)}
                  />
                ))}
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
};

export default Products;
