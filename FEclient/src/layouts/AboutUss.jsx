import React from 'react';
import CheckoutButton from './CheckOut';

function App() {
  // Đây là ví dụ sản phẩm, bạn có thể lấy từ giỏ hàng hoặc state của ứng dụng
  const products = [
    {
      id: 1,
      name: 'Sản phẩm A',
      price: 100000, // Giá tính bằng đơn vị nhỏ nhất (xu với VND)
      quantity: 1,
      image: 'https://example.com/product-a.jpg',
    },
    {
      id: 2,
      name: 'Sản phẩm B',
      price: 200000,
      quantity: 2, 
      image: 'https://example.com/product-b.jpg',
    },
  ];

  return (
    <div className="App">
      <h1>Giỏ hàng của bạn</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>Giá: {product.price} VNĐ</p>
            <p>Số lượng: {product.quantity}</p>
          </div>
        ))}
      </div>
      <div className="checkout-section">
        <h2>Tổng tiền: {products.reduce((sum, item) => sum + item.price * item.quantity, 0)} VNĐ</h2>
        <CheckoutButton products={products} />
      </div>
    </div>
  );
}

export default App;