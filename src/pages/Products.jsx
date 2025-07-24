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

    if (selectedPrices.length > 0) {
      result = result.filter(product =>
        selectedPrices.some(range =>
          product.price >= range.min && product.price <= range.max
        )
      );
    }

    setFilteredProducts(result);
  }, [allProducts, selectedPrices]);

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
    e.preventDefault(); // so Link doesn't trigger
    addToCart(product);
  };

  if (loading) {
    return <div className="text-center py-10 text-lg font-semibold text-gray-700">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Filter Bar */}
      <div className="w-full bg-white px-4 py-3 rounded-lg shadow flex flex-wrap justify-between items-center gap-4 mb-6 border border-gray-200">
        <div className="text-base font-medium text-gray-800">
          Filter by Price:
        </div>
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

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found in selected price range.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
