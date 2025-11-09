import React, { useState } from "react";
import { NavLink } from "react-router"; 
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import {
  FaHome,
  FaServicestack,
  FaClipboardList,
  FaPlusCircle,
  FaBook,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const pages = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Services", path: "/services", icon: <FaServicestack /> },
  { name: "My Services", path: "/my-services", icon: <FaClipboardList /> },
  { name: "Add Service", path: "/add-service", icon: <FaPlusCircle /> },
  { name: "My Bookings", path: "/my-bookings", icon: <FaBook /> },
  { name: "Profile", path: "/profile", icon: <FaUser /> },
  { name: "Login", path: "/login", icon: <FaSignInAlt /> },
  { name: "Register", path: "/register", icon: <FaUserPlus /> },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow-sm  w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <motion.img
              src={logo}
              alt="KajWala Logo"
              className="w-10 h-10 rounded-full"
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9, rotate: -10 }}
            />
            <span className="text-xl font-bold">KajWala</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.path}
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-200 transition ${
                    isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                {page.icon} {page.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none hover:bg-gray-200 transition"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-base-100 shadow-lg">
          <ul className="flex flex-col p-2 gap-1">
            {pages.map((page) => (
              <li key={page.name}>
                <NavLink
                  to={page.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 transition ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {page.icon} {page.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
