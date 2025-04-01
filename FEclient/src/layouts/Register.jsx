import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import UserApi from '../apis/userApi';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchRegister = async () => {
    const request = {
      name: name,
      email: email,
      password: password,
    }
    try {
      const data = await UserApi.register(request);
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      }
      window.location.href = "/";
    }
    catch (error) {
      console.error(error);
    }
  }

  const submitHandler = (e) =>  {
    e.preventDefault();
    fetchRegister();
  }

  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center">
      {/* {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />} */}
      <form
        className="w-full max-w-md p-10 bg-white shadow-newsEventsBox"
        onSubmit={submitHandler}
      >
        <div>
          <h1 className="text-3xl font-bold text-center text-blue-500 mb-10 tracking-wide">Register</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-5 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-5 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full p-5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>

        <p className="mt-4 text-center text-gray-600">
          <Link
            to="/login"
            className="text-blue-500"
          >
            I Have Account <strong className='hover:underline'>Login</strong>
          </Link>
        </p>
      </form>
    </div>
    </>
  )
}

export default Register;