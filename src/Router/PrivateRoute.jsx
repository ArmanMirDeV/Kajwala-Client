import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen text-rose-600 text-lg font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading...
      </motion.div>
    );
  }

  if (user) {
    return children;
  }
  toast.error("Please login to access this page!");
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
