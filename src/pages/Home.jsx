import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const bannerImages = [
  'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/HOMEPAGE_3.jpg?format=webp&w=1500&dpr=1.5',
  'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_spB2jlk.jpg?format=webp&w=1500&dpr=1.5',
  'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Fantastic_4__-_Galactus_-_Homepage_Banner_copy.jpg?format=webp&w=1500&dpr=1.5',
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);

  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featuredRes = await api.get('/products?_limit=4');
        const newArrivalsRes = await api.get('/products?_start=16&_limit=4');
        setFeaturedProducts(featuredRes.data);
        setNewArrivals(newArrivalsRes.data);
      } catch (error) {
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

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return toast.warn('Please login to add to cart');
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

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
      <div className="text-center text-white mt-10 text-xl font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* Banner */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-black">
        {bannerImages.map((url, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={url} alt="Banner" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentBanner ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Running Offers */}
      <div className="w-full bg-white py-6 border-t border-b border-gray-200 shadow-sm overflow-hidden">
        <div className="flex gap-6 animate-offer-scroll whitespace-nowrap px-4">
          {[
            '🎉 Free Delivery Over ₹499',
            '🔥 Flat 50% Off - Marvel Gear',
            '🕸️ Spider-Verse Exclusive',
            '🚚 COD Available',
            '🔁 Easy 7-Day Returns',
            '💥 New Drops Every Week',
            '🛒 Shop Now - Limited Stock',
          ].map((offer, index) => (
            <div
              key={index}
              className="bg-red-100 text-red-700 px-6 py-3 rounded-xl shadow-md text-base font-semibold border border-red-300 min-w-max"
            >
              {offer}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-4xl text-center text-red-600 mb-8" style={{ fontFamily: "'Bangers', cursive" }}>
          FEATURED SPIDER STYLES
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
            />
          ))}
        </div>

        {/* View All Products Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/products"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
          >
            🔥 View All Products
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-4xl text-center text-red-600 mb-8" style={{ fontFamily: "'Bangers', cursive" }}>
          NEW ARRIVALS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
            />
          ))}
        </div>

        {/* View All Button Again */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/products"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
          >
            👀 Explore More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
