import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div className="flex items-center justify-center">
      <form
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg"
        // onSubmit={submitHandler}
      >
        <h6 className="text-xl font-semibold text-gray-700 mb-6 text-center">SELECT PAYMENT METHOD</h6>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              // value={paymentMethod}
              // onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-radio text-blue-600 focus:ring-blue-500"
            />
            <label className="text-gray-700">PayPal or Credit Card</label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <Link to="/placeorder" className="text-white">Continue</Link>
        </button>
      </form>
    </div>
  )
}

export default Payment;