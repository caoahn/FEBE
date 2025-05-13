import { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/checkout-sessions?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const viewOrderDetails = async (sessionId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkout-sessions/${sessionId}`);
      const data = await response.json();
      setSelectedOrder(data);
      setShowModal(true);
    } catch (err) {
      console.error('Lỗi khi lấy chi tiết đơn hàng:', err);
      setError('Không thể tải chi tiết đơn hàng. Vui lòng thử lại sau.');
    }
  };

  const formatCurrency = (amount, currency) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency || 'VND'
    });
    return formatter.format(amount);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchOrders();
  }, [limit]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Orders Management</h1>
        <div className="flex space-x-2">
          <select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="10">10 orders</option>
            <option value="20">20 orders</option>
            <option value="50">50 orders</option>
          </select>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading &&
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      }
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Created</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-b hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="py-3 px-6">{order.id}</td>
                  <td className="py-3 px-6">
                    {formatCurrency(order.amount_total, order.currency)}
                  </td>
                  <td className="py-3 px-6 capitalize">{order.payment_status}</td>
                  <td className="py-3 px-6">
                    {new Date(order.created * 1000).toLocaleString()}
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => viewOrderDetails(order.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No orders found.</p>
      )}

      {showModal && selectedOrder && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          {/* Overlay mờ */}
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm" onClick={closeModal}></div>

          {/* Popup container */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto animate-fadeIn">
            {/* Close button */}
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1 focus:outline-none"
              >
                ✖
              </button>
            </div>

            <div className="p-6 border-t-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Chi tiết đơn hàng</h3>

              {/* Thông tin đơn hàng */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className='mb-5'>
                    <dt className="text-sm font-medium text-gray-500">Mã đơn</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedOrder.id}</dd>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Ngày đặt</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatDate(selectedOrder.created)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Tổng tiền</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatCurrency(selectedOrder.amount_total, selectedOrder.currency)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Trạng thái</dt>
                      <dd className="mt-1">
                        <span className={`px-2 py-1 inline-block text-xs font-semibold rounded-full ${
                          selectedOrder.payment_status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : selectedOrder.payment_status === 'unpaid'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedOrder.payment_status === 'paid'
                            ? 'Đã thanh toán'
                            : selectedOrder.payment_status === 'unpaid'
                            ? 'Chưa thanh toán'
                            : 'Đang xử lý'}
                        </span>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bảng sản phẩm */}
              <div className="mt-6">
                <h4 className="text-base font-semibold text-gray-900 mb-4">Sản phẩm đã mua</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số lượng</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đơn giá</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.line_items?.data.map(item => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatCurrency(item.price.unit_amount, selectedOrder.currency)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatCurrency(item.amount_total, selectedOrder.currency)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Nút đóng */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>

          {/* Animation */}
          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
          `}</style>
        </div>
      )}

    </div>
  );
};

export default Orders;
