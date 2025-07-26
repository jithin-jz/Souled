import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import Loader from '../components/Loader';

const bannerImages = [
  'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/HOMEPAGE_3.jpg?format=webp&w=1500&dpr=1.5',
  'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/The_Dragon_Queen_-_Homepage_banner_copy.2.jpg?format=webp&w=1500&dpr=1.5',
  'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_copy_xb3zHae.jpg?format=webp&w=1500&dpr=1.5',
];

const ProductCard = ({ product, onToggleWishlist, isWishlisted }) => {
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist(product);
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
        <div className="mt-3">
          <h3 className="text-gray-900 font-medium">{product.name}</h3>
          <p className="text-gray-900 font-bold">₹{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);

  const { wishlist, addToWishlist, removeFromWishlist } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [featuredRes, newArrivalsRes] = await Promise.all([
          api.get('/products?_limit=4'),
          api.get('/products?_start=18&_limit=4'),
        ]);
        setFeaturedProducts(featuredRes.data);
        setNewArrivals(newArrivalsRes.data);
      } catch {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleWishlist = (product) => {
    if (!user) return toast.warn('Please login to manage wishlist');
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
    toast[isInWishlist ? 'info' : 'success'](
      `${product.name} ${isInWishlist ? 'removed from' : 'added to'} wishlist`
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12">
      {/* ✅ Fixed Banner */}
      <div className="w-full overflow-hidden relative">
        <img
          src={bannerImages[currentBanner]}
          alt={`Banner ${currentBanner + 1}`}
          className="w-full h-auto object-cover transition-all duration-700"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Offers Marquee */}
      <div className="overflow-hidden py-2 bg-white">
        <div className="animate-marquee whitespace-nowrap flex gap-4 px-4">
          {[
            '🎉 Free Delivery Over ₹499',
            '🔥 Flat 50% Off - Marvel Gear',
            '🕸️ Spider-Verse Exclusive',
            '🚚 COD Available',
            '🔁 Easy 7-Day Returns',
            '🧙 Anime Merch From Naruto, One Piece & More!',
          ].map((offer, index) => (
            <div
              key={index}
              className="flex-shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium"
            >
              {offer}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold">New Arrivals</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
            />
          ))}
        </div>
      </section>

      {/* CTA Button */}
      <div className="container mx-auto px-4 text-center">
        <Link
          to="/products"
          className="inline-block rounded-full bg-black px-8 py-3 font-medium text-white hover:bg-gray-800"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
