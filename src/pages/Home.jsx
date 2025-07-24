import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth(); // ✅ Get logged-in user

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

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.warn('Please login to add items to cart');
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="text-center text-white mt-10 text-xl font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* Hero Banner */}
      <section>
        <img
          src="https://prod-img.thesouledstore.com/public/theSoul/uploads/themes/2636120250326110100.jpg?format=webp&w=1500&dpr=1.5"
          alt="Spider-Man Banner"
          className="w-full max-h-[500px] object-cover rounded-xl shadow-xl"
        />
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          FEATURED SPIDER STYLES
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-black-600 mb-8">
          NEW ARRIVALS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
