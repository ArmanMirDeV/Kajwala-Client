import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/services");
        setServices(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Loading services...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-10 px-4">
      <motion.h2
        className="text-3xl font-bold text-rose-600 mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Available Services
      </motion.h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden p-4 flex flex-col"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={service.imageUrl}
                alt={service.serviceName}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {service.serviceName}
              </h3>
              <p className="text-gray-500 mb-2">Category: {service.category}</p>
              <p className="text-gray-700 font-medium mb-4">${service.price}</p>
              <button
                onClick={() => navigate(`/service-details/${service._id}`)}
                className="mt-auto bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition"
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
