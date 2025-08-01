import ProductCard from './ProductCard';

const Section = ({ category, banner, products, onAddToCart, onToggleWishlist, wishlist }) => {
  if (products.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="mb-4">
        <img
          src={banner}
          alt={`${category} Banner`}
          className="w-full h-52 object-cover rounded-xl shadow-sm"
        />
        <h2 className="text-2xl font-semibold mt-3 text-gray-800">{category} Collection</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            isWishlisted={wishlist.some((item) => item.id === product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
