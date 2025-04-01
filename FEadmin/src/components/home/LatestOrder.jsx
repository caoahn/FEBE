import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaEye } from "react-icons/fa";


const LatestOrder = ({ loading, error, orders }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h5 className="text-lg font-semibold text-gray-800 mb-4">New Orders</h5>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id} className="border-b last:border-b-0">
                  {/* Tên người dùng */}
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    {order.user?.name}
                  </td>
                  {/* Email người dùng */}
                  <td className="py-3 px-4 text-gray-600">
                    {order.user?.email}
                  </td>
                  {/* Tổng tiền */}
                  <td className="py-3 px-4 text-gray-800">
                    ${order.totalPrice}
                  </td>
                  {/* Trạng thái thanh toán */}
                  <td className="py-3 px-4">
                    {order.isPaid ? (
                      <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                        Paid At {moment(order.paidAt).format("MMM Do YY")}
                      </span>
                    ) : (
                      <span className="inline-block bg-red-100 text-red-700 text-sm font-medium px-3 py-1 rounded-full">
                        Not Paid
                      </span>
                    )}
                  </td>
                  {/* Ngày tạo đơn */}
                  <td className="py-3 px-4 text-gray-600">
                    {moment(order.createdAt).calendar()}
                  </td>
                  {/* Nút xem chi tiết */}
                  <td className="py-3 px-4 text-right">
                    <Link to={`/order/${order._id}`} className="text-green-600 hover:text-green-800">
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default LatestOrder;
