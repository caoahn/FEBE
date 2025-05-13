import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/product'); // Đổi '/shop' thành route phù hợp của bạn
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center"
      >
        <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-green-700 mb-2">Thanh toán thành công!</h2>
        <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
        <button
          onClick={handleBack}
          className="inline-flex items-center px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          Tiếp tục mua sắm
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
