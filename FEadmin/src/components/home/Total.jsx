import React  from "react";
import { FaShoppingBag, FaShoppingBasket } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

const TopTotal = (props) => {
  const { orders, products } = props;
  let totalSale = 0;
  if (orders) {
    orders.map((order) =>
      order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sales */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center space-x-4">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
              <FaDollarSign className="text-blue-800" />
            </span>
            <div>
              <h6 className="text-gray-600 text-sm font-semibold">Total Sales</h6>
              <span className="text-lg font-bold">${totalSale.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center space-x-4">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
              <FaShoppingBag className="text-green-800" />
            </span>
            <div>
              <h6 className="text-gray-600 text-sm font-semibold">Total Orders</h6>
              <span className="text-lg font-bold">{orders ? orders.length : 0}</span>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center space-x-4">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100">
              <FaShoppingBasket className="text-yellow-800" />
            </span>
            <div>
              <h6 className="text-gray-600 text-sm font-semibold">Total Products</h6>
              <span className="text-lg font-bold">{products ? products.length : 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopTotal;