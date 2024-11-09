import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUserPlus, FaSearch, FaClipboard, FaImage } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col h-screen shadow-lg">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-16 border-b border-blue-800 bg-blue-800">
        <div className="text-2xl font-bold">Gurukrupa | Admin</div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-4">
        <ul>
          {[
            { to: "/", icon: <FaTachometerAlt />, label: "Dashboard" },
            { to: "/add-student", icon: <FaUserPlus />, label: "Add Student" },
            { to: "/get-exam", icon: <FaClipboard />, label: "Get Exam" },
            { to: "/search-exam", icon: <FaSearch />, label: "Search Exam" },
            { to: "/exam", icon: <FaClipboard />, label: "Add Exam" },
            { to: "/question", icon: <FaClipboard />, label: "Add Questions" },
            { to: "/image-upload", icon: <FaImage />, label: "Post Images" },
            { to: "/delete-image", icon: <FaImage />, label: "Get Images" },
          ].map(({ to, icon, label }, index) => (
            <li key={index} className="mb-4 group">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-lg transition-all duration-200 ${
                    isActive ? "bg-blue-800 text-white" : "text-blue-300 hover:text-white hover:bg-blue-700"
                  }`
                }
              >
                {/* Icon */}
                <span className="text-xl">{icon}</span>
                <span className="ml-3 text-lg font-medium">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
