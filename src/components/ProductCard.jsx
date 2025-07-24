import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="w-full max-w-xs bg-white border rounded-md p-2 shadow-sm">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image || 'https://via.placeholder.com/100x100?text=No+Image'}
          alt={product.name || 'Product Image'}
          className="w-full h-32 object-cover rounded"
        />
      </Link>
      <div className="mt-2">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 truncate hover:text-green-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mt-1">₹{product.price}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-2 w-full text-sm bg-green-500 hover:bg-green-600 text-white py-1 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
