import moment from "moment";

const Orders = ({ orders, loading, error }) =>  {
  return (
    <>
      {orders.length === 0 ? (
        <div className="w-full bg-blue-100 text-blue-700 text-center p-4 rounded mt-5">
          No Orders
          <Link
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm mx-2"
            to="/"
          >
            START SHOPPING
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto w-full mt-5 pl-2">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="p-3">ID</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">DATE</th>
                <th className="p-3">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className={`${
                    order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  } text-center`}
                >
                  <td className="p-3">
                    <a href={`/order/${order._id}`} className="text-blue-500 hover:underline">
                      {order._id}
                    </a>
                  </td>
                  <td className="p-3">{order.isPaid ? "Paid" : "Not Paid"}</td>
                  <td className="p-3">
                    {order.isPaid
                      ? moment(order.paidAt).calendar()
                      : moment(order.createdAt).calendar()}
                  </td>
                  <td className="p-3">${order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Orders;