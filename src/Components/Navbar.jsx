import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router";
import logo from "../assets/logo.png";
import { FaHome, FaServicestack, FaUser } from "react-icons/fa";
import { FcServices } from "react-icons/fc";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();

  const desktopDropdownRef = useRef();
  const mobileDropdownRef = useRef();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target)
      ) {
        setDesktopDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Services", path: "/services", icon: <FcServices /> },
    { name: "My Services", path: "/my-services", icon: <FcServices /> },
    { name: "Add Service", path: "/add-services", icon: <FcServices /> },
    { name: "My Bookings", path: "/my-bookings", icon: <FcServices /> },
  ];

  const dropdownItems = [
    { name: "Profile", path: "/profile" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/registration" },
  ];

  const renderMenuLink = (item, closeMenu) => (
    <Link
      key={item.name}
      to={item.path}
      className={`flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition-colors ${
        location.pathname === item.path ? "text-blue-600 font-semibold" : ""
      }`}
      onClick={closeMenu}
    >
      {item.icon && <span>{item.icon}</span>}
      {item.name}
    </Link>
  );

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={logo}
            alt="LocalServe Logo"
            className="w-12 h-12 rounded-full"
          />
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 tracking-wide"
          >
            KajWala
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => renderMenuLink(item, () => {}))}

          {/* Desktop Dropdown */}
          <div className="relative" ref={desktopDropdownRef}>
            <button
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
            >
              Account
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  desktopDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {desktopDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md"
                >
                  {dropdownItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setDesktopDropdownOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-inner"
          >
            <nav className="flex flex-col px-6 py-4 space-y-3">
              {menuItems.map((item) =>
                renderMenuLink(item, () => setMenuOpen(false))
              )}

              {/* Mobile Dropdown */}
              <div
                className="border-t border-gray-200 pt-3"
                ref={mobileDropdownRef}
              >
                <button
                  className="flex items-center justify-between w-full text-gray-700 font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                >
                  Account
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      mobileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col mt-2 space-y-1"
                    >
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block text-gray-700 px-2 py-1 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                          onClick={() => {
                            setMenuOpen(false);
                            setMobileDropdownOpen(false);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
