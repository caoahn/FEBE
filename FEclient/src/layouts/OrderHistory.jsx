import React, { useState, useEffect } from 'react';
// Import biểu tượng X từ lucide-react
import { X } from 'lucide-react';

function OrderHistory({ customerId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Lấy danh sách đơn hàng
  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        // Nếu bạn có customer ID
        if (customerId) {
          const response = await fetch(`http://localhost:5000/api/checkout-sessions?customer=${customerId}`);
          const data = await response.json();
          setOrders(data);
        } else {
          // Không có customer ID - hiển thị tất cả sessions (chỉ nên dùng cho admin)
          const response = await fetch(`http://localhost:5000/api/checkout-sessions?limit=20`);
          const data = await response.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Lỗi khi lấy lịch sử đơn hàng:', err);
        setError('Không thể tải lịch sử đơn hàng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrders();
  }, [customerId]);

  // Lấy chi tiết đơn hàng
  const viewOrderDetails = async (sessionId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkout-sessions/${sessionId}`);
      const data = await response.json();
      setSelectedOrder(data);
      setShowModal(true); // Thiếu dòng này - cần bật modal khi có dữ liệu
    } catch (err) {
      console.error('Lỗi khi lấy chi tiết đơn hàng:', err);
      setError('Không thể tải chi tiết đơn hàng. Vui lòng thử lại sau.');
    }
  };

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount, currency) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency || 'VND'
    });
    return formatter.format(amount); // Stripe lưu tiền dưới dạng đơn vị nhỏ nhất
  };

  if (loading) return (
    <div className="flex justify-center items-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const closeModal = () => {
    setShowModal(false);
  };
  
  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Lịch sử đơn hàng</h2>
      
      {orders.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.created)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(order.amount_total, order.currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 
                          order.payment_status === 'unpaid' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}
                      >
                        {order.payment_status === 'paid' ? 'Đã thanh toán' : 
                         order.payment_status === 'unpaid' ? 'Chưa thanh toán' : 'Đang xử lý'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => viewOrderDetails(order.id)}
                        className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Popup for Order Details */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeModal}></div>
          
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 border-t-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Chi tiết đơn hàng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className='grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 mb-5'>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Mã đơn</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedOrder.id}</dd>
                    </div>
                  </div>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Ngày đặt</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatDate(selectedOrder.created)}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Tổng tiền</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedOrder.amount_total, selectedOrder.currency)}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Trạng thái</dt>
                      <dd className="mt-1 text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${selectedOrder.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 
                            selectedOrder.payment_status === 'unpaid' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                        >
                          {selectedOrder.payment_status === 'paid' ? 'Đã thanh toán' : 
                           selectedOrder.payment_status === 'unpaid' ? 'Chưa thanh toán' : 'Đang xử lý'}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-base font-medium text-gray-900 mb-4">Sản phẩm đã mua</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sản phẩm
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số lượng
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Đơn giá
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thành tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.line_items?.data.map(item => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(item.price.unit_amount, selectedOrder.currency)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(item.amount_total, selectedOrder.currency)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;