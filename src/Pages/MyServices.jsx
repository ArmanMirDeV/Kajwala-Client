import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch provider's services
  useEffect(() => {
    if (!user?.email) return;

    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/services?providerEmail=${user.email}`
        );
        setServices(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your services!");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user]);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:3000/services/${id}`);
      if (res.data.deletedCount > 0) {
        setServices((prev) => prev.filter((s) => s._id !== id));
        toast.success("Service deleted successfully!");
      } else {
        toast.error("Service not found or already deleted!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete service!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Loading your services...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-10 px-4">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 overflow-x-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-rose-600 mb-6 text-center">
          My Services
        </h2>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services added yet.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm md:text-base">
            <thead className="bg-rose-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Service Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service._id}
                  className="border-b hover:bg-rose-50 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={service.imageUrl}
                      alt={service.serviceName}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {service.serviceName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {service.category}
                  </td>
                  <td className="px-4 py-3 text-gray-600">${service.price}</td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <button
                      onClick={() => toast(`Viewing ${service.serviceName}`)}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => toast(`Edit feature coming soon`)}
                      className="text-green-500 hover:text-green-700 transition"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete"
                    >
                      <FaTrash />
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

export default MyServices;
