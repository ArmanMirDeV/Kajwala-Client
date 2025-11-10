// NotFound.jsx
import React from "react";
import { useNavigate } from "react-router";
import errorImg from "../assets/404.png"; 

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 p-4">
      <img
        src={errorImg}
        alt="404 Not Found"
        className="w-80 max-w-full mb-8"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4">
        Oops! Page not found
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={goHome}
        className="px-6 py-3 bg-rose-500 text-white rounded-lg shadow hover:bg-rose-600 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
