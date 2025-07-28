import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {wishlist.length === 0 ? (
        <div className="flex items-center justify-center h-60">
          <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <p className="text-red-600 font-semibold">₹{product.price}</p>
                </div>
              </Link>
              <div className="px-4 pb-4 flex justify-between items-center">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
                <button
                  onClick={() => {
                    addToCart(product);
                    removeFromWishlist(product.id);
                  }}
                  className="text-green-600 text-sm hover:underline"
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
