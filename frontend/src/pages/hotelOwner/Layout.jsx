import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { isOwner } = useAppContext();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isOwner === false) navigate("/");
  }, [isOwner, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Left: Toggle + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="text-yellow-500 md:hidden focus:outline-none"
            >
              {/* Hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h1
              onClick={() => navigate("/")}
              className="text-xl sm:text-2xl font-bold tracking-wider cursor-pointer"
            >
              LUXURY<span className="text-yellow-500">HOTEL</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Body layout */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar (Desktop) */}
        <aside
          className={`hidden md:block bg-white border-r border-gray-200 transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-64"
          }`}
        >
          <Sidebar />
        </aside>

        {/* Sidebar (Mobile Overlay) */}
        <div
          className={`fixed inset-0 z-30 bg-black/50 md:hidden transition-opacity ${
            sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <aside
          className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-yellow-500">
              Dashboard
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-600 hover:text-black"
            >
              ✕
            </button>
          </div>
          <Sidebar collapsed={false} />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
