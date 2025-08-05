import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-900 min-h-[80vh] text-white">
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <p className="text-gray-400 text-xl mb-4">💔 Your wishlist is empty.</p>
          <Link
            to="/products"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full object-contain"
                />
              </Link>
              <div className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-green-400 font-semibold">₹{product.price}</p>
                </Link>
              </div>
              <div className="px-4 pb-4 mt-auto flex justify-between items-center">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="text-red-400 hover:text-red-500 text-sm font-medium"
                >
                  Remove
                </button>
                <button
                  onClick={() => {
                    addToCart(product);
                    removeFromWishlist(product.id);
                  }}
                  className="text-green-400 hover:text-green-500 text-sm font-medium"
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

export default Wishlist;
