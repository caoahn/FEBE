import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Thay thế bằng Stripe publishable key của bạn
const stripePromise = loadStripe('pk_test_51RIQd0B0ADzeXvfTp2Dg90GG3MAqxZ0D1UTjyCaiGHA4y52iU04M0lu64RlLbHOiXMNNVp2qUTKltgR9D7r5wnFQ006t5BWsGc');

const CheckoutButton = ({ products }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }),
      });
      
      const { url } = await response.json();
      
      // Chuyển hướng đến trang thanh toán Stripe
      window.location.href = url;
    } catch (error) {
      console.error('Lỗi khi tạo phiên thanh toán:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading} 
      className="checkout-button"
    >
      {loading ? 'Đang xử lý...' : 'Thanh toán ngay'}
    </button>
  );
};

export default CheckoutButton;