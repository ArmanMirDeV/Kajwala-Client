import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings for the logged-in user
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/bookings/${user.email}`
        );
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your bookings!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Handle booking cancellation
  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:3000/bookings/${id}`);
        if (res.data.deletedCount > 0) {
          setBookings((prev) => prev.filter((b) => b._id !== id));
          Swal.fire(
            "Cancelled!",
            "Your booking has been cancelled.",
            "success"
          );
        } else {
          Swal.fire("Error!", "Booking not found.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to cancel booking.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-10 px-4">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 overflow-x-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-rose-600 mb-6 text-center">
          My Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">You have no bookings yet.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg text-sm md:text-base">
            <thead className="bg-rose-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Service Name</th>
                <th className="px-4 py-3 text-left">Provider</th>
                <th className="px-4 py-3 text-left">Booking Date</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-rose-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {booking.serviceName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {booking.providerName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {booking.bookingDate}
                  </td>
                  <td className="px-4 py-3 text-gray-600">${booking.price}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {booking.status || "Pending"}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Cancel Booking"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
};

export default MyBookings;
