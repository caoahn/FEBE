import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    purpose: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    industry: "",
    country: "",
    message: "",
    bookingDate: "",
    bookingTime: ""
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {showNotification && (
        <div className="fixed top-8 right-8 bg-green-500 text-white p-4 rounded-lg shadow-lg transition-transform transform translate-x-0">
          Submit successful, we will contact you soon!
        </div>
      )}
      <form
      onSubmit={handleSubmit}
      className="bg-white max-md:rounded-none max-md:shadow-none rounded-xl px-8 py-10 shadow-lg w-full max-w-[768] mx-auto"
      >
        <div className="mb-6">
          <label htmlFor="purpose" className="block text-xl font-medium text-gray-700">
            Purpose<span className="text-red-600">*</span>
          </label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
          >
            <option value="">Please Select</option>
            <option value="business">Business Inquiry</option>
            <option value="partnership">Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-xl font-medium text-gray-700">
              First Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xl font-medium text-gray-700">
              Last Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="email" className="block text-xl font-medium text-gray-700">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xl font-medium text-gray-700">
              Phone Number<span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <div>
            <label htmlFor="company" className="block text-xl font-medium text-gray-700">
              Company Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="jobTitle" className="block text-xl font-medium text-gray-700">
              Job Title<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
          <div>
            <label htmlFor="industry" className="block text-xl font-medium text-gray-700">
              Industry
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
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
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-xl font-medium text-gray-700">
            Message<span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg px-4"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="bookingDate" className="block text-xl font-medium text-gray-700">
              Book Meeting<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="bookingDate"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              required
              className="mt-3 block w-full rounded-lg border border-solid border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg h-[50px] px-4"
            />
          </div>
          <div>
            <label htmlFor="bookingTime" className="block text-xl font-medium text-gray-700">
              Time (GMT +7)<span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              id="bookingTime"
              name="bookingTime"
              value={formData.bookingTime}
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
          Next
        </button>
      </form >
    </>
  );
}
