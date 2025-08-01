// pages/Products/Products.jsx
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';

import Filters from './Filters';
import Section from './Section';

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
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setAllProducts(res.data);
      } catch {
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
    setSelectedPrices(prev =>
      prev.some(r => r.label === range.label)
        ? prev.filter(r => r.label !== range.label)
        : [...prev, range]
    );
  };

  const toggleCategoryFilter = (category) => {
    setSelectedCategories(prev =>
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
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        selectedPrices={selectedPrices}
        togglePriceFilter={togglePriceFilter}
        selectedCategories={selectedCategories}
        toggleCategoryFilter={toggleCategoryFilter}
        priceRanges={priceRanges}
        categories={categories}
      />

      {loading ? (
        <Loader />
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        groupedByCategory.map(({ category, products, banner }) => (
          <Section
            key={category}
            category={category}
            banner={banner}
            products={products}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
          />
        ))
      )}
    </div>
  );
};

export default Products;
