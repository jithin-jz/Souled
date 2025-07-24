import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Logo */}
        <h2 className="text-xl font-bold mb-2">MARVEL STORE</h2>

        {/* Links */}
        <div className="flex justify-center gap-6 text-sm mb-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
          <Link to="/orders" className="hover:underline">Orders</Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Marvel Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
