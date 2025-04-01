import Header from "../components/Header";
const ShippingPage = () => {
  return (
    <>
    <Header />
    <div className="flex items-center justify-center">
      <form
        className="w-full max-w-md p-8 bg-white shadow-lg"
        // onSubmit={submitHandler}
      >
        <h6 className="text-xl font-semibold text-gray-700 mb-6 text-center">DELIVERY ADDRESS</h6>

        <input
          type="text"
          placeholder="Enter address"
          // value={address}
          required
          // onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Enter city"
          // value={city}
          required
          // onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Enter postal code"
          // value={postalCode}
          required
          // onChange={(e) => setPostalCode(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Enter country"
          // value={country}
          required
          // onChange={(e) => setCountry(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Continue
        </button>
      </form>
    </div>
    </>
  );
}

export default ShippingPage;