import React, { useState } from "react";
import {
  FaChevronRight,
  FaCog,
  FaHeart,
  FaShoppingBag,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useLinks, useSideHeader } from "../../Hooks/uiStore";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const { Links } = useLinks();
  const [links] = useState(Links || []);
  const { closeSideHeader } = useSideHeader();
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-full bg-white shadow-xl flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={closeSideHeader}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="text-gray-600" />
          </button>
          {/* User section */}
        </div>
        <div className="p-4 bg-gray-50">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-600" />
            </div>
            <div>
              <p className="font-medium">Hello, a</p>
              <p className="text-sm text-gray-500">a@gmail.com</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              // onClick={() => navigateTo("/profile")}
              className="flex items-center justify-center btn btn-wide border-0 shadow bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm"
            >
              <FaUser className="text-gray-600 text-xs" />
              <span className="text-gray-600 ">Profile</span>
            </button>
            <button
              // onClick={() => navigateTo("/profile")}
              className="flex items-center justify-center btn btn-wide border-0 shadow bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm"
            >
              <FaHeart className="text-gray-600 text-xs" />
              <span className="text-gray-600 ">Wishlist</span>
            </button>
            <button
              // onClick={() => navigateTo("/profile")}
              className="flex items-center justify-center btn btn-wide border-0 shadow bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm"
            >
              <FaShoppingBag className="text-gray-600 text-xs" />
              <span className="text-gray-600 ">Orders</span>
            </button>
            <button
              // onClick={() => navigateTo("/profile")}
              className="flex items-center justify-center btn btn-wide border-0 shadow bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm"
            >
              <FaCog className="text-gray-600 text-xs" />
              <span className="text-gray-600 ">Admin</span>
            </button>
          </div>
        </div>
        <div className="p-4 bg-gray-50">
          <button
            //   onClick={() => navigateTo("/register")}
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Sign In / Register
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="py-2">
            <h3 className="px-4 py-2 text-sm font-medium text-gray-500">
              Navigation
            </h3>
            {links.map((link, index) => (
              <NavLink
                to={link.url}
                key={index}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3 px-4 cursor-pointer border-b border-gray-100 
                  ${isActive ? "bg-gray-50 font-medium" : "hover:bg-gray-50"}`
                }
                onClick={closeSideHeader}
              >
                <span>{link.name}</span>
                <FaChevronRight className="text-xs text-gray-400" />
              </NavLink>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            // onClick={handleLogout}
            className="w-full py-2 flex items-center justify-center space-x-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            <FaSignOutAlt className="text-gray-600" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
