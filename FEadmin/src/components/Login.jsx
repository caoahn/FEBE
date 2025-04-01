import { Link } from "react-router-dom";
import UserApi from "../apis/userApi";
import { useState, useEffect } from "react";
import {ToastService} from "../utils/toast";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchLogin = async () => {
    try {
      const request = {
        email: email,
        password: password,
      }

      const data = await UserApi.login(request);
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      window.location.href = "/";
    }
    catch (error) {
      if(error.response.status === 401) {
        ToastService.showError("Email or password is incorrect!");
      }
      console.error(error);
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    fetchLogin();
  }

  return (
    <>
    <ToastContainer />
    <form
      className="Login mx-auto w-full max-w-md p-10 m-5 bg-white shadow-newsEventsBox mt-28"
      onSubmit={submitHandler}
    >
      <div>
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6 tracking-wide">Login</h1>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-5 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-5 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full p-5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 text-xl"
      >
        Login
      </button>

      <div className="mt-6 flex flex-row justify-between items-center">
        <p className="mt-4 text-center text-gray-600">
          <Link
            to = "/register"
            className="text-blue-500 hover:underline"
          >
            Create Account
          </Link>
        </p>
        <p className="mt-4 text-center text-gray-600">
          <Link
            to={"/forgot-password"}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </form>
    </>
  )
}

export default Login;