import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import { LogOut, Mail, Clock, User, Edit } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

const Profile = () => {
  const { user, logOut, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  // Prefill the modal inputs with current user data
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
  }, [user]);

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("You have been logged out!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });
      setUser({ ...user, displayName: name, photoURL: photo });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#f6c29f] to-[#8e78c0] text-white">
        <h2 className="text-3xl font-semibold mb-4">
          You are not logged in 😔
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-[#8e78c0] px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Go to Login
        </button>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6c29f] to-[#8e78c0] px-4 py-8">
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8 md:p-10 w-full max-w-lg flex flex-col items-center"
      >
        {/* Profile Picture */}
        <motion.img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="User"
          className="w-32 h-32 rounded-full object-cover border-4 border-[#a97173] mb-6 shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        {/* User Info */}
        <div className="text-center space-y-3 mb-8">
          <div className="flex justify-center items-center gap-2 text-gray-800 font-semibold text-xl">
            <User className="w-5 h-5 text-rose-400" />
            {user?.displayName || "Unnamed User"}
          </div>

          <div className="flex justify-center items-center gap-2 text-gray-600">
            <Mail className="w-5 h-5 text-rose-400" />
            {user?.email || "No email available"}
          </div>

          <div className="flex justify-center items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5 text-rose-400" />
            Last login:{" "}
            {user?.metadata?.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleString()
              : "N/A"}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#a97173] hover:bg-[#94605f] text-white font-medium px-5 py-2 rounded-lg transition"
          >
            <Edit className="w-5 h-5" />
            Update Profile
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogOut}
            className="flex items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white font-medium px-5 py-2 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </motion.button>
        </div>
      </motion.div>

      {/* Update Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
            >
              {/* Header Section */}
              <div className="flex flex-col items-center mb-6">
                <motion.img
                  src={
                    photo || user?.photoURL || "https://via.placeholder.com/100"
                  }
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#a97173] mb-3"
                  whileHover={{ scale: 1.05 }}
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {name || user?.displayName || "Unnamed User"}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              {/* Update Form */}
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#a97173] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#a97173] focus:outline-none"
                  />
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#a97173] text-white rounded-lg hover:bg-[#94605f] transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
