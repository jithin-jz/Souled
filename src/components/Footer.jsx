import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Logo */}
        <h2 className="text-xl font-bold text-white tracking-tight mb-4">
          THE SOULED STORE
        </h2>

        {/* New Links */}
        <div className="flex justify-center gap-8 text-sm mb-6">
          <Link
            to="/about"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Marvel Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
