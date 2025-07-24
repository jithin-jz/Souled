import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import { toast } from 'react-toastify';

const priceRanges = [
  { label: '₹0 - ₹999', min: 0, max: 999 },
  { label: '₹1000 - ₹1999', min: 1000, max: 1999 },
  { label: '₹2000 - ₹2999', min: 2000, max: 2999 },
  { label: '₹3000 and above', min: 3000, max: Infinity },
];

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setAllProducts(response.data);
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...allProducts];

    // Filter by price
    if (selectedPrices.length > 0) {
      result = result.filter(product =>
        selectedPrices.some(range =>
          product.price >= range.min && product.price <= range.max
        )
      );
    }

    // Filter by search
    if (searchTerm.trim()) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [allProducts, selectedPrices, searchTerm]);

  const handlePriceToggle = (range) => {
    const exists = selectedPrices.find(r => r.label === range.label);
    if (exists) {
      setSelectedPrices(prev => prev.filter(r => r.label !== range.label));
    } else {
      setSelectedPrices(prev => [...prev, range]);
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6 space-y-4">

        {/* Search Bar */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Price Filter */}
        <div>
          <h2 className="text-base font-medium text-gray-800 mb-2">Filter by Price:</h2>
          <div className="flex flex-wrap gap-3">
            {priceRanges.map(range => (
              <label
                key={range.label}
                className={`flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-full cursor-pointer transition 
                  ${selectedPrices.some(r => r.label === range.label)
                    ? 'bg-red-100 border-red-400'
                    : 'hover:bg-gray-100'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selectedPrices.some(r => r.label === range.label)}
                  onChange={() => handlePriceToggle(range)}
                  className="accent-red-600"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-10 text-lg font-semibold text-gray-700">Loading...</div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                  <p className="text-red-600 font-bold text-xl">₹{product.price}</p>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="mt-2 w-full bg-red-600 text-white text-sm py-2 rounded-lg hover:bg-red-700 transition"
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
