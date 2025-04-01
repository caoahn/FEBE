import { ToastContainer } from "react-toastify";

export default function ContactForm() {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <ToastContainer />
      <form
        // onSubmit={handleSubmit}
        className="bg-white max-md:rounded-none max-md:shadow-none rounded-xl px-8 py-10 shadow-lg w-full max-w-[768] mx-auto"
      >
        <div className="mb-6">
          <label htmlFor="purpose" className="block text-xl font-medium text-gray-700">
            {("purpose")}<span className="text-red-600">*</span>
          </label>
          <select
            id="purpose"
            name="purpose"
            // value={formData.purpose}
            onChange={handleChange}
            required
            className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
          >
            <option value="">{("please-select")}</option>
            <option value="business">{("business-inquiry")}</option>
            <option value="partnership">{("partnership")}</option>
            <option value="other">{("other")}</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-xl font-medium text-gray-700">
            {("name")}<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              // value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xl font-medium text-gray-700">
              {("name")}<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              // value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="email" className="block text-xl font-medium text-gray-700">
              {("email")}<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              // value={formData.email}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xl font-medium text-gray-700">
              {("phone")}<span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              // value={formData.phone}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <div>
            <label htmlFor="company" className="block text-xl font-medium text-gray-700">
              {("company")}<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              // value={formData.company}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="jobTitle" className="block text-xl font-medium text-gray-700">
              {("job-title")}<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              // value={formData.jobTitle}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
          <div>
            <label htmlFor="industry" className="block text-xl font-medium text-gray-700">
              {("industry")}
            </label>
            <select
              id="industry"
              name="industry"
              // value={formData.industry}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            >
              <option value="">{("please-select")}</option>
              <option value="it_service">{("please-select")}</option>
              <option value="education">{("education")}</option>
              <option value="retail">{("retail")}</option>
              <option value="bfsi">{("bfsi")}</option>
              <option value="e-commerce">{("e-commerce")}</option>
              <option value="marketing-Media">{("marketing-media")}</option>
              <option value="other">{("other")}</option>
            </select>

          </div>
        </div>

        <div className="mb-6">
          <div>
            <label htmlFor="country" className="block text-xl font-medium text-gray-700">
              Country/Region<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              // value={formData.country}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-xl font-medium text-gray-700">
            {("describe-your-requirement")}<span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            // value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-4"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="bookingDate" className="block text-xl font-medium text-gray-700">
              {("booking-meeting")}<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="bookingDate"
              name="bookingDate"
              // value={formData.bookingDate}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
          <div>
            <label htmlFor="bookingTime" className="block text-xl font-medium text-gray-700">
              {("time")}(GMT +7)<span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              id="bookingTime"
              name="bookingTime"
              // value={formData.bookingTime}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-[20%] py-3 px-4 bg-gradient-to-r from-[#1F6398] to-[#33A5FE] text-white font-bold text-xl rounded-lg shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-700"
        >
          {("Next")}
        </button>
      </form >
    </>
  );
}
