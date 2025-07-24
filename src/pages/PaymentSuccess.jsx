import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
        <CheckCircle2 className="text-green-500 mx-auto mb-4" size={64} />
        <h2 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. It has been placed and is being processed.
        </p>
        <Link
          to="/orders"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
