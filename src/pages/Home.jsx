import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products?_limit=4');
        setProducts(response.data);
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
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
          {products.map((product) => (
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
