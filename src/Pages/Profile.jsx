import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import { LogOut, Mail, User, Edit, Clock } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Loading from "./Loading";

const StatsCard = ({ value, label, bg, textColor }) => (
  <div className={`p-4 rounded-xl text-center ${bg}`}>
    <h3 className={`text-xl font-bold ${textColor}`}>{value}</h3>
    <p className="text-gray-600 text-sm">{label}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-xl p-4 border">
    <h3 className="font-semibold mb-3 text-gray-700">{title}</h3>
    {children}
  </div>
);

const EditProfileModal = ({
  isOpen,
  onClose,
  name,
  setName,
  photo,
  setPhoto,
  onSave,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
        >
          <form onSubmit={onSave} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Update Profile
            </h3>
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
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#a97173] text-white rounded-lg hover:bg-[#94605f]"
              >
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main Component ---
const Profile = () => {
  const { user, logOut, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
  }, [user]);

  useEffect(() => {
    if (!user?.email) return;
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [{ data: providerStats }, { data: services }] = await Promise.all(
          [
            axios.get(
              `https://kajwala-server.vercel.app/provider-stats/${user.email}`
            ),
            axios.get(
              `https://kajwala-server.vercel.app/my-services/${user.email}`
            ),
          ]
        );

        setStats(providerStats);
        setChartData(
          services.map((s) => ({
            name: s.serviceName || s.title || "Unnamed Service",
            price: parseFloat(s.price) || 0,
            bookings: s.bookings?.length || 0,
          }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch analytics.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("You have been logged out!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, { displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#f6c29f] to-[#8e78c0] text-white">
        <h2 className="text-3xl font-semibold mb-4">You are not logged in</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-[#8e78c0] px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Go to Login
        </button>
        <Toaster position="top-center" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#f6c29f] to-[#8e78c0] px-4 py-10">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8 md:p-10 w-full max-w-5xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <motion.img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#a97173] mb-6 shadow-md"
            whileHover={{ scale: 1.05 }}
          />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <User className="text-rose-400 w-5 h-5" />{" "}
              {user?.displayName || "Unnamed User"}
            </h2>
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <Mail className="text-rose-400 w-5 h-5" /> {user.email}
            </p>
          </div>
          <div className="flex justify-center items-center mt-2 gap-2 text-gray-600">
            <Clock className="w-5 h-5 text-rose-400" />
            Last login:{" "}
            {user?.metadata?.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleString()
              : "N/A"}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-[#a97173] hover:bg-[#94605f] text-white font-medium px-5 py-2 rounded-lg transition"
            >
              <Edit className="w-5 h-5" /> Update Profile
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogOut}
              className="flex items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white font-medium px-5 py-2 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" /> Log Out
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        {loading ? (
          <Loading />
        ) : stats ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <StatsCard
                value={stats.serviceCount}
                label="Services"
                bg="bg-rose-100"
                textColor="text-rose-600"
              />
              <StatsCard
                value={stats.totalBookings}
                label="Total Bookings"
                bg="bg-yellow-100"
                textColor="text-yellow-600"
              />
              <StatsCard
                value={`$${stats.totalRevenue.toFixed(2)}`}
                label="Total Revenue"
                bg="bg-green-100"
                textColor="text-green-600"
              />
              <StatsCard
                value={`⭐ ${stats.averageRating.toFixed(1)}`}
                label="Avg Rating"
                bg="bg-blue-100"
                textColor="text-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ChartCard title="Service Prices Overview">
                <ResponsiveContainer width="100%" height={500}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="price" fill="#f87171" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Revenue Distribution">
                <ResponsiveContainer width="100%" height={500}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="price"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={
                            [
                              "#f87171",
                              "#fbbf24",
                              "#34d399",
                              "#60a5fa",
                              "#a78bfa",
                              "#f472b6",
                            ][i % 6]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            No analytics data available.
          </div>
        )}

        <EditProfileModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          name={name}
          setName={setName}
          photo={photo}
          setPhoto={setPhoto}
          onSave={handleUpdateProfile}
        />
      </motion.div>
    </div>
  );
};

export default Profile;
