import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../Provider/AuthProvider";

// Icons
import {
  MdHomeRepairService,
  MdAddCircleOutline,
  MdMiscellaneousServices,
  MdLogout,
  MdLogin,
} from "react-icons/md";
import { IoHomeOutline, IoPersonCircleOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);

  const desktopDropdownRef = useRef();
  const mobileDropdownRef = useRef();

  // Initialize theme from localStorage
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle click outside dropdowns
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

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const menuItems = [
    { name: "Home", path: "/", icon: <IoHomeOutline /> },
    {
      name: "All Services",
      path: "/services",
      icon: <MdMiscellaneousServices />,
    },
    ...(user
      ? [
          {
            name: "My Services",
            path: "/my-services",
            icon: <MdHomeRepairService />,
          },
          {
            name: "Add Service",
            path: "/add-services",
            icon: <MdAddCircleOutline />,
          },
          {
            name: "My Bookings",
            path: "/my-bookings",
            icon: <MdMiscellaneousServices />,
          },
        ]
      : []),
  ];

  const dropdownItems = user
    ? [
        { name: "Profile", path: "/profile", icon: <IoPersonCircleOutline /> },
        { name: "Logout", path: "#", icon: <MdLogout />, action: logOut },
      ]
    : [
        { name: "Login", path: "/login", icon: <MdLogin /> },
        { name: "Register", path: "/registration", icon: <FiUserPlus /> },
      ];

  const renderMenuLink = (item, closeMenu) => (
    <Link
      key={item.name}
      to={item.path}
      className={`flex items-center gap-2 font-medium text-gray-700 hover:text-rose-600 transition-colors ${
        location.pathname === item.path ? "text-rose-600 font-semibold" : ""
      }`}
      onClick={closeMenu}
    >
      <span className="text-lg">{item.icon}</span>
      {item.name}
    </Link>
  );

  return (
    <header
      className={`w-full sticky top-0 z-50 shadow-md ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-700"
      }`}
    >
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
            alt="KajWala Logo"
            className="w-12 h-12 rounded-full"
          />
          <Link
            to="/"
            className="text-2xl font-bold text-rose-600 tracking-wide"
          >
            KajWala
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {menuItems.map((item) => renderMenuLink(item, () => {}))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Profile Dropdown */}
          <div
            className="relative flex items-center gap-4"
            ref={desktopDropdownRef}
          >
            <button
              className="flex items-center gap-2 hover:text-rose-600 transition-colors"
              onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
            >
              {user ? (
                <img
                  src={user.photoURL || "https://i.pravatar.cc/40"}
                  alt={user.displayName || "User"}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              ) : (
                <span>Account</span>
              )}
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
                  className={`absolute right-0 mt-2 w-44 rounded-lg shadow-md ${
                    theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
                  }`}
                >
                  {dropdownItems.map((item) => (
                    <li key={item.name}>
                      {item.action ? (
                        <button
                          onClick={() => {
                            item.action();
                            setDesktopDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                          {item.icon}
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-gray-700 rounded transition-colors"
                          onClick={() => setDesktopDropdownOpen(false)}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
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
            className={`${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700"
            } lg:hidden shadow-inner`}
          >
            <nav className="flex flex-col px-6 py-4 space-y-3">
              {menuItems.map((item) =>
                renderMenuLink(item, () => setMenuOpen(false))
              )}

              {/* Mobile Dropdown */}
              <div
                className="border-t border-gray-200 dark:border-gray-700 pt-3"
                ref={mobileDropdownRef}
              >
                <button
                  className="flex items-center justify-between w-full font-medium hover:text-rose-600 transition-colors"
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                >
                  {user ? (
                    <img
                      src={user.photoURL || "https://i.pravatar.cc/40"}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                  ) : (
                    "Account"
                  )}
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
                      <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 px-2 py-2 hover:bg-rose-50 dark:hover:bg-gray-700 hover:text-rose-600 rounded transition-colors"
                      >
                        {theme === "light" ? (
                          <Moon size={18} />
                        ) : (
                          <Sun size={18} />
                        )}
                        Toggle Theme
                      </button>

                      {dropdownItems.map((item) =>
                        item.action ? (
                          <button
                            key={item.name}
                            onClick={() => {
                              item.action();
                              setMenuOpen(false);
                              setMobileDropdownOpen(false);
                            }}
                            className="flex items-center gap-2 px-2 py-2 hover:bg-rose-50 dark:hover:bg-gray-700 hover:text-rose-600 rounded transition-colors"
                          >
                            {item.icon}
                            {item.name}
                          </button>
                        ) : (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-2 px-2 py-2 hover:bg-rose-50 dark:hover:bg-gray-700 hover:text-rose-600 rounded transition-colors"
                            onClick={() => {
                              setMenuOpen(false);
                              setMobileDropdownOpen(false);
                            }}
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        )
                      )}
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
