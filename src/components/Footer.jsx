import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo and Tagline */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold tracking-wide">MARVEL STORE</h2>
          <p className="text-white/80 text-sm">Power up your style with your favorite heroes.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/products" className="hover:text-yellow-300 transition">Products</Link>
          <Link to="/cart" className="hover:text-yellow-300 transition">Cart</Link>
          <Link to="/orders" className="hover:text-yellow-300 transition">Orders</Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center mt-6 space-x-4">
          <Link to="#" className="text-white/80 hover:text-white transition">
            <FaFacebookF size={18} />
          </Link>
          <Link to="#" className="text-white/80 hover:text-white transition">
            <FaTwitter size={18} />
          </Link>
          <Link to="#" className="text-white/80 hover:text-white transition">
            <FaInstagram size={18} />
          </Link>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-white/70 text-xs mt-6 border-t border-white/30 pt-4">
          <p>&copy; {new Date().getFullYear()} Marvel Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
