import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
  const [session, setSession] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    // Lấy session_id từ URL query params
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');
    
    if (sessionId) {
      // Tùy chọn: Gọi API để lấy thông tin session
      fetch(`http://localhost:5000/api/checkout-session?sessionId=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setSession(data);
        })
        .catch(err => console.error('Lỗi khi lấy thông tin session:', err));
    }
  }, [location]);

  return (
    <div className="success-page">
      <h1>Thanh toán thành công!</h1>
      <p>Cảm ơn bạn đã mua hàng.</p>
      {session && (
        <div className="order-details">
          <h2>Chi tiết đơn hàng</h2>
          <p>Mã đơn hàng: {session.id}</p>
          {/* Hiển thị thêm thông tin khác nếu cần */}
        </div>
      )}
      <a href="/">Tiếp tục mua hàng</a>
    </div>
  );
}

export default Success;