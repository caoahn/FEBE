import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaStream,
  FaHome,
  FaShoppingBag,
  FaCartPlus,
  FaList,
  FaShoppingBasket,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

const Sidebar = ({isOpen, toggleSidebar}) => {
  
  const linkClass = ({ isActive }) =>
    `flex items-center space-x-3 p-3 rounded-lg transition ${
      isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div>
      <aside
        className={`${
          isOpen ? "max-w-[260px]" : "max-w-[80px]"
        } block fixed top-0 bottom-0 w-full overflow-y-auto bg-white shadow-sm z-10 border-r border-gray-400/50 transition-all duration-300`}
      >
        <div className="p-4 px-2 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {isOpen && (
                <img
                src="/images/hyw.png"
                className={`h-[46px] mx-5`}
                alt="Ecommerce dashboard template"
              />
              )}
            </Link>
            {isOpen && <div className="text-gray-500 text-sm">CMS</div>}
          </div>
          <div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-200 transition"
            >
              <FaStream className="text-gray-500 mx-2 text-2xl" />
            </button>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <NavLink to="/" className={linkClass} end>
                <FaHome className="text-xl" />
                {isOpen && <span>Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={linkClass}>
                <FaShoppingBag className="text-xl" />
                {isOpen && <span>Products</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/addproduct" className={linkClass}>
                <FaCartPlus className="text-xl" />
                {isOpen && <span>Add Product</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" className={linkClass}>
                <FaList className="text-xl" />
                {isOpen && <span>Categories</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" className={linkClass}>
                <FaShoppingBasket className="text-xl" />
                {isOpen && <span>Orders</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className={linkClass}>
                <FaUser className="text-xl" />
                {isOpen && <span>Users</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass}>
                <FaEnvelope className="text-xl" />
                {isOpen && <span>Contact</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
