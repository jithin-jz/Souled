import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../utils/api";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();

    // ✅ Always scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart({ ...product, quantity: 1 });
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to buy products");
      return;
    }
    addToCart({ ...product, quantity: 1 });
    toast.success("Item added to cart!");
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-white animate-pulse bg-slate-900">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white bg-slate-900">
        <p className="text-red-600 font-semibold mb-4">Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen px-4 pt-10 pb-0">
      {/* Product Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-slate-800 p-6 rounded-2xl shadow-md">
        {/* Product Image */}
        <div className="bg-slate-700 rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            <p className="text-2xl text-green-400 font-semibold">
              ₹{product.price.toFixed(2)}
            </p>
            <p className="text-slate-300 text-sm">
              {product.description || "No description available."}
            </p>

            <div className="text-sm">
              <span className="font-medium text-slate-100">Category: </span>
              <Link
                to={`/products?category=${product.category}`}
                className="text-green-400 hover:underline"
              >
                {product.category}
              </Link>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-6 py-3 rounded-md font-medium bg-red-600 hover:bg-slate-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full sm:w-auto px-6 py-3 rounded-md font-medium bg-slate-700 hover:bg-slate-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
