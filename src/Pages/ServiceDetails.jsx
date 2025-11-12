// src/Components/ServiceDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "./Loading";
import { Star, Info } from "lucide-react";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view service details");
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `https://kajwala-server.vercel.app/services/${id}`
        );
        setService(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch service details.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <Loading />;
  if (!service)
    return (
      <div className="text-center mt-10 text-gray-500">Service not found.</div>
    );

  const isOwner = user?.email === service.providerEmail;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (isOwner) return toast.error("You cannot book your own service!");
    if (!bookingDate) return toast.error("Please select a booking date.");

    const bookingData = {
      userEmail: user.email,
      serviceId: service._id,
      serviceName: service.serviceName,
      providerName: service.providerName,
      price: service.price,
      bookingDate,
      status: "Pending",
    };

    try {
      await axios.post(
        "https://kajwala-server.vercel.app/bookings",
        bookingData
      );
      setBookingModalOpen(false);
      setBookingDate("");
      toast.success("Booking successful!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to book service.");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-white text-gray-800">
      {/* Service Info */}
      <motion.div
        className="max-w-4xl mx-auto p-6 border rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={service.imageUrl}
          alt={service.serviceName}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{service.serviceName}</h2>
        <p className="mb-1">
          <strong>Category:</strong> {service.category}
        </p>
        <p className="mb-1">
          <strong>Price:</strong> ${service.price}
        </p>
        <p className="mb-1">
          <strong>Provider:</strong> {service.providerName}
        </p>
        <p className="mb-2">
          <strong>Contact:</strong> {service.providerEmail}
        </p>
        <p className="mb-4">{service.description}</p>

        {/* Book Button with Tooltip */}
        <div className="relative inline-block">
          <button
            onClick={() => {
              if (!isOwner) setBookingModalOpen(true);
            }}
            disabled={isOwner}
            className={`px-5 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
              isOwner
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 hover:scale-105"
            }`}
          >
            {isOwner ? "Cannot Book Your Own Service" : "Book Now"}
          </button>

          {isOwner && (
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
              You are the provider
            </span>
          )}
        </div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        className="max-w-4xl mx-auto mt-8 p-6 border rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-4">
          Reviews ({service.reviews?.length || 0})
        </h3>

        {service.reviews?.length > 0 ? (
          <div className="space-y-4">
            {service.reviews.map((review, idx) => (
              <div key={idx} className="border-b pb-3">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="italic">“{review.comment}”</p>
                <p className="text-sm mt-1">
                  — {review.userName || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic">No reviews yet.</p>
        )}
      </motion.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModalOpen && !isOwner && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <motion.div
              className="w-full max-w-md p-6 border rounded-lg shadow-lg bg-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4">
                Book {service.serviceName}
              </h3>
              <p className="mb-4 font-semibold">Price: ${service.price}</p>

              <form className="space-y-3" onSubmit={handleBooking}>
                <div>
                  <label className="block mb-1">Your Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-1">Booking Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="px-3 py-2 border rounded hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300 hover:scale-105"
                  >
                    Confirm Booking
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

export default ServiceDetails;
