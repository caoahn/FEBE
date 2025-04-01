import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaChevronDown, FaBell, FaMoon, FaBars } from "react-icons/fa";
 
const Header = ({toggleSidebar}) =>  {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null)
    const userInfo =  localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    useEffect(() => {
      const handleClickOutside = (e) => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
          }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  }

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <header className="isolate flex justify-between items-center px-6 py-4 shadow-md bg-white">
          <div>
            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition  block lg:hidden"
              data-trigger="#offcanvas_aside"
              onClick={toggleSidebar}
            >
              <FaBars className="text-2xl text-gray-600" />
            </button>
          </div>
    
          <div className="flex items-center space-x-6">
            <Link title="Dark mode" to="#" className="p-2 rounded-lg hover:bg-gray-200 transition">
              <FaMoon className="text-xl text-gray-600" />
            </Link>
    
            <Link to="#" className="p-2 rounded-lg hover:bg-gray-200 transition">
              <FaBell className="text-xl text-gray-600" />
            </Link>
    
            <span className="font-semibold text-gray-800">Hi, {userInfo?.name}</span>
    
            <div className="relative" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="flex items-center gap-2 p-2 rounded-lg transition duration-300 ease-in-out transform hover:bg-gray-100 hover:scale-105 focus:bg-gray-200 active:scale-95">
                  <img
                    src={userInfo.avatar?.url || "/default-avatar.png"}
                    alt="userprofileimage"
                    className="w-[50px] h-[50px] object-cover rounded-full"
                  />
                  <FaChevronDown
                      className={`text-gray-600 transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <Link to={`/users/create/${userInfo._id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Exit
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
    );
}

export default Header;