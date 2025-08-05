import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000); // stop confetti after 5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-900 px-4">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-slate-800 rounded-xl shadow-lg p-8 text-center max-w-md w-full"
      >
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          <CheckCircle2 className="text-green-400 mx-auto mb-4" size={64} />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-3xl font-bold text-green-300 mb-2"
        >
          Payment Successful!
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-gray-300 mb-6"
        >
          Thank you for your order. It has been placed and is being processed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/orders"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            View Orders
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
