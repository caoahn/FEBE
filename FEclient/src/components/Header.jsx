import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaChevronDown, FaShoppingBag, FaUser } from "react-icons/fa";
import { faFacebookF, faInstagram, faLinkedinIn, faYoutube, faPinterestP } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import UserApi from "../apis/userApi";
 
const Header = () =>  {
    const navigate = useNavigate();
    const [isOpen,setIsOpen] = useState(false);
    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
    const drowdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (drowdownRef.current && !drowdownRef.current.contains(e.target)) {
                setIsOpen(false);   
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const logoutHandler = async () => {
        try {
            const data = await UserApi.logout();
            localStorage.removeItem("userInfo");
            navigate("/login");
        }
        catch (error) {
            console.error(error);
        }
    }

    return(
<div className="sticky top-0 w-full z-50 shadow-lg">
  <header className="bg-white">
    <div className="container mx-auto px-4">
      {/* MOBILE HEADER */}
      <div className="md:hidden flex justify-between items-center py-5">
        <Link to="/" className="flex items-center">
          <img src="/images/hyw.png" alt="logo" className="h-10" />
        </Link>

        <div className="flex items-center space-x-4">
          {userInfo ? (
            <div className="relative group">
              <button className="px-4 py-2 bg-white font-sans text-gray-800 border border-gray-300 flex items-center hover:bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
                <FaUser className="text-lg" />
                <FaChevronDown className="ml-2 w-2 h-4 text-black" />
              </button>
              <div ref={drowdownRef} className={`absolute right-0 mt-2 w-32 bg-black transition-transform transform-gpu duration-300 ${
                isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                <Link className="block px-4 py-2 hover:bg-blue-400 text-white font-sans" to="/profile" onClick={() => setIsOpen(!isOpen)}>
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-blue-400 text-white font-sans"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-black">
                <FaUser className="text-lg" />
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg hidden group-hover:block">
                <Link className="block px-4 py-2 hover:bg-gray-100" to="/login">
                  Login
                </Link>
                <Link className="block px-4 py-2 hover:bg-gray-100" to="/register">
                  Register
                </Link>
              </div>
            </div>
          )}

          <Link to="/cart" className="relative">
            <i className="fas fa-shopping-bag text-xl"></i>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* PC HEADER */}
      <div className="hidden md:flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link to="/"> 
            <img src="/images/hyw.png" alt="logo" className="h-14" />
          </Link>
        </div>

        <div className="flex items-center space-x-16 ml-6 text-gray-800 font-semibold">
          <Link to="/" className="hover:text-blue-600 transition-transform transform hover:scale-110 duration-300">Home</Link>
          <Link to="/product" className="hover:text-blue-600 transition-transform transform hover:scale-110 duration-300">Product</Link>
          <Link to="/about-us" className="hover:text-blue-600 transition-transform transform hover:scale-110 duration-300">About Us</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-transform transform hover:scale-110 duration-300">Contact</Link>
        </div>

        <div className="flex items-center space-x-8" ref={drowdownRef}>
          {userInfo ? ( 
            <div className="relative group">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white font-sans text-gray-800 border border-gray-300 flex items-center hover:bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
                  Hi, {userInfo.name}
                  <FaChevronDown className="ml-2 w-2 h-4 text-black" />
                </button>
                <img
                  src={userInfo.avatar?.url || "/default-avatar.png"}
                  alt="userprofileimage"
                  className="w-[50px] h-[50px] object-cover rounded-full"
                />
              </div>
              {/* Dropdown menu */}
              <div className={`absolute right-0 mt-2 w-32 bg-black transition-transform transform-gpu duration-300 ${
                isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                <Link className="block px-4 py-2 hover:bg-blue-400 text-white font-sans" to="/profile" onClick={() => setIsOpen(!isOpen)}>
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-blue-400 text-white font-sans"
                  onClick={() => {setIsOpen(!isOpen); logoutHandler()}}
                >
                Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/register" className="px-4 py-2 bg-pink-300 text-white font-sans rounded hover:bg-pink-400 transition-colors">
                Register
              </Link>
              <Link to="/login" className="px-4 py-2 bg-blue-400 text-white font-sans rounded hover:bg-blue-500 transition-colors">
                Login
              </Link>
            </>
          )}

          {userInfo && (
            <Link to="/cart" className="relative">
              <FaShoppingBag className="text-xl text-black-500" />
              {cartItems.length > 0 && (
                <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs rounded-full px-2">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  </header>
</div>

    )
}

export default Header;