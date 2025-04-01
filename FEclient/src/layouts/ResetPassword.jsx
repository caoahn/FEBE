import React from "react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserApi from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ToastService } from "../utils/toast";

export default function Reset() {
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const email = location.state.email || "";
  const navigate = useNavigate();
  const changePassword = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp. Vui lòng kiểm tra lại!");
      return;
    }
  
    const req = {
      email: email,
      password: password,
    };
  
    try {
      const data = await UserApi.changePassword(req);
      if (data.data.success) {
        ToastService.showSuccess("Đổi mật khẩu thành công. Vui lòng đăng nhập!");
        navigate("/login");
      }
      else {
        ToastService.showWarning("Không thấy tài khoản!")
      }
    } catch (error) { 
      if (error.response) {
        if (error.response.status === 404) {
          ToastService.showError("Không tìm thấy tài khoản!");
        } else if (error.response.status === 400) {
          ToastService.showError("Yêu cầu không hợp lệ!");
        } else {
          console.error("Lỗi kết nối: ", error);
          alert("Không thể kết nối đến máy chủ. Kiểm tra lại mạng!");
        }
      } else {
        console.error("Lỗi kết nối: ", error);
        alert("Không thể kết nối đến máy chủ. Kiểm tra lại mạng!");
      }
    }
  };
  

  return (
    <>
      <Header />
      <ToastContainer />
      <div>
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-20">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white text-center text-blue-300">
                Change Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onClick={() => setConfirmPassword("")}
                  ></input>
                </div>
              </form>
              <button
                onClick={changePassword}
                className="w-full text-white mt-8 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset passwod
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
