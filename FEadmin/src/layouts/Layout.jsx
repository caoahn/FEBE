import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Layout () {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    }

    return (
        <div className="">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-20"
            }`}
          >
            <Header toggleSidebar={toggleSidebar} />

            <main className="p-6 bg-gray-100 min-h-screen">
              <Outlet />
            </main>
          </div>
        </div>
      );
};
