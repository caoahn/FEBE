import React, { useRef, useEffect, useState } from "react";
import ContactForm from "../components/home/ContactForm";
import { MapPin } from "lucide-react";
import { Phone, Mail } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactApi from "../apis/contactApi";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ToastService } from "../utils/toast";

const Contact = () => {
    const userInfo =  localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    // State để lưu dữ liệu form
    const [formData, setFormData] = useState({
        user: "",
        name: "",
        description: "",
    });

    // Xử lý khi nhập form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const createContactMutation = useMutation({
        mutationFn: ContactApi.createContact,
        onSuccess: (data) => {
            ToastService.showSuccess("Gửi thành công");
            setFormData({
                user: "",
                name: "",
                description: "",
            });
        },
        onError: (error) => {
            console.error("Error creating contact:", error);
        },
    })

    // Xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.user = userInfo._id;
        createContactMutation.mutate(formData);
    };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="flex overflow-hidden flex-col pb-7 bg-white">
        <div
          className=""
          style={{
            backgroundImage: `url(/images/c2.jpg)`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <div className="max-w-[1261px] mx-auto mt-[83px] mb-[132px] max-md:mt-[29px] max-md:mb-0">
            <div className="w-[90%] max-md:w-full text-center">
              <h2 className="text-7xl font-black font-mulish text-white max-md:text-[38px]">
                Contact With Us
              </h2>
              <p className="mt-6 text-xl text-white font-mulish max-md:px-[20px]">
                Please fill out the form below to contact us.
              </p>
            </div>

            {/* Phần thông tin liên hệ */}
            <div className="w-[95%] bg-white p-6 rounded-lg shadow-lg mt-8 mx-auto flex flex-col md:flex-row">
              {/* Cột thông tin liên hệ */}
              <div className="w-full md:w-2/3 p-4">
                <h1 className="text-2xl font-bold text-blue-900">CAO ANH</h1>
                <div className="w-full flex flex-col md:flex-row items-center justify-between mt-4">
                  <div className="w-full md:w-1/2">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-blue-700" />
                      <p className="text-gray-800">ADDRESS</p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="flex items-center gap-2">
                      <Phone className="text-blue-700" />
                      <a className="text-gray-800">PHONE</a>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Mail className="text-blue-700" />
                      <a className="text-gray-800 hover:underline">EMAIL</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cột Form Liên Hệ */}
              <div className="w-full md:w-1/3 p-4 bg-gray-50 rounded-md shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Liên hệ với chúng tôi</h3>
                {
                  userInfo ? (
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6 max-w-md mx-auto">
                      {/* Input Tên */}
                      <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold text-sm mb-2">Tên của bạn</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Nhập tên của bạn"
                          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                          required
                        />
                      </div>

                      {/* Textarea Mô tả */}
                      <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold text-sm mb-2">Mô tả</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="4"
                          placeholder="Nhập mô tả của bạn"
                          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition-all duration-200"
                          required
                        />
                      </div>

                      {/* Nút gửi form */}
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
                      >
                        Send
                      </button>
                    </form>
                  ) : (
                    <div className="max-w-md mx-auto text-center p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
                      <p className="text-red-600 font-medium">Vui lòng đăng nhập để tiếp tục.</p>
                      <a
                        href="/login"
                        className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-semibold underline transition-colors duration-200"
                      >
                        Đăng nhập ngay
                      </a>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;