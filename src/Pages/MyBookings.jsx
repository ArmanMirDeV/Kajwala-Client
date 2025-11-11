import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch user bookings
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

  // Cancel booking
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
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to cancel booking.", "error");
      }
    }
  };

  // Submit review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewModal) return toast.error("No service selected.");
    if (rating === 0) return toast.error("Please select a rating.");
    if (!comment.trim()) return toast.error("Please write a comment.");

    try {
      const reviewData = {
        userEmail: user.email,
        userName: user.displayName || "Anonymous",
        rating,
        comment: comment.trim(),
        date: new Date().toISOString(),
      };

      const res = await axios.patch(
        `http://localhost:3000/services/${reviewModal.serviceId}/review`,
        reviewData
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Review submitted successfully!");

        // Mark booking as reviewed in UI
        setBookings((prev) =>
          prev.map((b) =>
            b._id === reviewModal._id ? { ...b, reviewed: true } : b
          )
        );

        // Reset modal
        setReviewModal(null);
        setRating(0);
        setComment("");
      } else {
        toast.error("Failed to submit review. Try again.");
      }
    } catch (err) {
      console.error("Review submission error:", err.response || err.message);
      toast.error(
        err.response?.data?.error || "Failed to submit review. Try again."
      );
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

                    <button
                      onClick={() => setReviewModal(booking)}
                      className={`text-rose-500 hover:text-rose-700 transition ${
                        booking.reviewed ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={booking.reviewed}
                      title={
                        booking.reviewed ? "Already Reviewed" : "Add Review"
                      }
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-2xl font-bold text-rose-600 mb-2">
                Review {reviewModal.serviceName}
              </h3>
              <p className="text-gray-500 mb-4">
                Provider: {reviewModal.providerName}
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating Stars */}
                <div className="flex gap-2 justify-center text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer transition ${
                        star <= rating
                          ? "text-yellow-400 scale-110"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <textarea
                  placeholder="Write your review..."
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-400"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReviewModal(null)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
                  >
                    Submit
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

export default MyBookings;
