import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product, onToggleWishlist, isWishlisted }) => {
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div className="relative w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Wishlist Heart */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FiHeart className="text-gray-600 text-xl" />
        )}
      </button>

      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden">
          <img
            src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name || 'Product'}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-red-600 transition">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-red-600 mt-1">₹{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
