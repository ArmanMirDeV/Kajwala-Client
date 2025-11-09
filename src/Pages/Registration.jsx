import React, { useContext } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const Registration = () => {
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    try {
      const result = await createUser(email, password, name, photo);
      console.log("User created:", result.user);
      toast.success(" Account created successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success(`Welcome ${result.user.displayName || "User"}!`);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#c49b8c] to-[#b58474] px-4 rounded-2xl">
      <div className="bg-white shadow-lg rounded-3xl flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
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
            <div className="relative">
              <input
                required
                name="password"
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#a97173]"
              />
              <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
                <FaEye />
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-lg transition"
            >
              Create account
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center md:text-left">
            Already have an account?{" "}
            <Link to="/login" className="text-[#a97173] hover:underline">
              Login
            </Link>
          </p>

          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 h-56 sm:h-72 md:h-auto bg-gradient-to-tr from-[#f6c29f] to-[#8e78c0] flex items-center justify-center">
          <img
            src="https://i.pinimg.com/736x/6c/42/0e/6c420ecb7635db086f7ad72fafba8afe.jpg"
            alt="Illustration"
            className="w-full h-full object-cover md:rounded-l-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
