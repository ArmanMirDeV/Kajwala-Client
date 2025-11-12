import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const Registration = () => {
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must include at least one number.";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must include at least one special character (!@#$%^&*).";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.value.trim();
    const password = form.password.value.trim();

    const validationError = validatePassword(password);
    if (validationError) {
      toast.error(validationError);
      setErrorMsg(validationError);
      return;
    }

    try {
      const result = await createUser(email, password, name, photo);
      setUser(result.user);
      toast.success(" Account created successfully!");
      form.reset();
      navigate("/"); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account. Please try again.");
      setErrorMsg(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success(` Welcome ${result.user.displayName || "User"}!`);
      navigate("/"); 
    } catch (error) {
      console.error(error);
      toast.error("Google login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#c49b8c] to-[#b58474] px-4 rounded-2xl">
      <div className="bg-white shadow-lg rounded-3xl flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center md:text-left">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col space-y-4">
            <input
              required
              name="name"
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a97173]"
            />
            <input
              required
              name="email"
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a97173]"
            />
            <input
              required
              name="photo"
              type="text"
              placeholder="Photo URL"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a97173]"
            />

            {/* Password Input with Toggle */}
            <div className="relative">
              <input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`border ${
                  errorMsg ? "border-red-400" : "border-gray-300"
                } rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ${
                  errorMsg ? "focus:ring-red-400" : "focus:ring-[#a97173]"
                }`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errorMsg && (
              <p className="text-sm text-red-500 text-center md:text-left">
                ⚠️ {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-lg font-semibold transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center md:text-left">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#a97173] font-medium hover:underline"
            >
              Login
            </Link>
          </p>

          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 h-56 sm:h-72 md:h-auto bg-gradient-to-tr from-[#f6c29f] to-[#8e78c0] flex items-center justify-center">
          <img
            src="https://i.pinimg.com/736x/6c/42/0e/6c420ecb7635db086f7ad72fafba8afe.jpg"
            alt="Registration Illustration"
            className="w-full h-full object-cover md:rounded-l-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
