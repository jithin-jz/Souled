import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="w-full bg-white border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
      <Link to={`/products/${product.id}`}>
        <div className="w-full h-56 md:h-64 lg:h-72 overflow-hidden">
          <img
            src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name || 'Product Image'}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mt-1">₹{product.price}</p>

        <button
          onClick={() => onAddToCart(product)}
          className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
