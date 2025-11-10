import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking modal state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/services/${id}`);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center text-gray-500 mt-10">Service not found.</div>
    );
  }

  // Check if the logged-in user is the provider
  const isOwner = user?.email === service.providerEmail;

  // Handle booking
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingDate) {
      toast.error("Please select a booking date.");
      return;
    }
    if (isOwner) {
      toast.error("You cannot book your own service!");
      return;
    }

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
      await axios.post("http://localhost:3000/bookings", bookingData);
      toast.success("Booking successful!");
      setBookingModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to book service.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-10 px-4">
      <motion.div
        className={`max-w-4xl mx-auto p-6 rounded-2xl shadow-xl ${
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-800"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={service.imageUrl}
          alt={service.serviceName}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h2 className="text-3xl font-bold text-rose-600 mb-3">
          {service.serviceName}
        </h2>
        <p className="mb-2">
          <span className="font-semibold">Category:</span> {service.category}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Price:</span> ${service.price}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Provider:</span>{" "}
          {service.providerName}
        </p>
        <p className="mb-4">{service.description}</p>

        <button
          onClick={() => {
            if (isOwner) toast.error("You cannot book your own service!");
            else setBookingModalOpen(true);
          }}
          disabled={isOwner}
          className={`px-6 py-2 rounded-lg text-white transition ${
            isOwner
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-rose-500 hover:bg-rose-600"
          }`}
        >
          {isOwner ? "Cannot Book Your Own Service" : "Book Now"}
        </button>
      </motion.div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-40">
          <motion.div
            className={`w-full max-w-md p-6 rounded-2xl shadow-xl ${
              document.documentElement.getAttribute("data-theme") === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className="text-2xl font-bold text-rose-600 mb-4">
              Book {service.serviceName}
            </h3>

            <form className="space-y-4" onSubmit={handleBooking}>
              <div>
                <label className="block mb-1">Your Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1">Service Name</label>
                <input
                  type="text"
                  value={service.serviceName}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="text"
                  value={`$${service.price}`}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1">Booking Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
