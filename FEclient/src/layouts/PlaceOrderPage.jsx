import { Link } from "react-router-dom";
import { FaUser, FaTruckMoving, FaMapMarkerAlt  } from "react-icons/fa";
import Header from "../components/Header";
const PlaceOrderPage = () => {
  const cart = {
    cartItems: [
      {
        product: "67b0943b8b5f80f9140a6bec",
        name: "lalal",
        image: {
            public_id: "ShoeShop/imm2c5r6axlcftvg7zud",
            url: "https://res.cloudinary.com/djrnau5bl/image/upload/v1739625528/ShoeShop/imm2c5r6axlcftvg7zud.jpg"
        },
        price: 123,
        countInStock: 450,
        qty: 1
        }
      ],
        shippingAddress: {
        address: "ha noi",
        city: "ha noi",
        postalCode: "10020",
        country: "vietnam"
        },
        itemsPrice: "123.00",
        shippingPrice: "10.00",
        taxPrice: "12.30",
        totalPrice: "145.30"
  }
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-screen-desktop bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 bg-green-50 p-8 shadow-md">
            {/* Customer Info */}
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-green-100 rounded-full">
                <FaUser className="text-green-600 text-2xl" />
              </div>
              <div>
                <h5 className="font-semibold text-lg">Customer</h5>
                {/* <p>{userInfo.name}</p> */}
                <p>caoanh</p>
                <p>email</p>
                {/* <p>{userInfo.email}</p> */}
              </div>
            </div>

            {/* Order Info */}
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-green-100 rounded-full">
                <FaTruckMoving className="text-green-600 text-2xl" />
              </div>
              <div>
                <h5 className="font-semibold text-lg">Order Info</h5>
                <p>Shipping: aaa</p>
                <p>Pay method: aaaa</p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-green-100 rounded-full">
                <FaMapMarkerAlt className="text-green-600 text-2xl" />
              </div>
              <div>
                <h5 className="font-semibold text-lg">Deliver To</h5>
                <p>
                  Address:
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-white rounded-2xl w-full max-w-4xl mx-auto">
              {cart.cartItems.length === 0 ? (
                <Message variant="alert-info mt-5">Your cart is empty</Message>
              ) : (
                cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-6 mb-6 border-b border-gray-300">
                    <img src={item.image.url} alt={item.name} className="w-24 h-24 object-contain" />
                    <Link to={`/products/${item.product}`} className="flex-1 ml-8">
                      <h6 className="text-lg font-semibold text-gray-800">{item.name}</h6>
                    </Link>
                    <div className="text-center mx-10">
                      <h4 className="text-lg font-bold text-gray-700">QUANTITY</h4>
                      <h6 className="text-lg text-gray-600">{item.qty}</h6>
                    </div>
                    <div className="text-center mx-10">
                      <h4 className="text-lg font-bold text-gray-700">SUBTOTAL</h4>
                      <h6 className="text-lg text-gray-600">${item.qty * item.price}</h6>
                    </div>
                  </div>
                ))
              )}
            </div>


              {/* Order Summary */}
              <div className="bg-white p-8">
              <div className="p-8 border-t border-gray-300 mt-8">
                <table className="w-full text-lg">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="font-semibold py-4 px-3">Products</td>
                      <td className="text-right">${cart.itemsPrice}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="font-semibold py-4 px-3">Shipping</td>
                      <td className="text-right">${cart.shippingPrice}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="font-semibold py-4 px-3">Tax</td>
                      <td className="text-right">${cart.taxPrice}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold py-4 px-3">Total</td>
                      <td className="text-right text-blue-600 font-bold">${cart.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>

                {cart.cartItems.length > 0 && (
                  <button
                    type="submit"
                    // onClick={placeOrderHandler}
                    className="mt-6 w-full py-4 text-white bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-lg text-lg font-semibold"
                  >
                    PLACE ORDER
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceOrderPage;