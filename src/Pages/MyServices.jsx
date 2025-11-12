import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "./Loading";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editService, setEditService] = useState(null);
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!user?.email) return;

    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/my-services/${user.email}`
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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axios.delete(`http://localhost:3000/services/${id}`);
      if (res.data.deletedCount > 0) {
        setServices((prev) => prev.filter((s) => s._id !== id));
        Swal.fire("Deleted!", "Service has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Service not found.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to delete service.", "error");
    }
  };

  const openEditModal = (service) => {
    setEditService(service);
    setFormData({
      serviceName: service.serviceName,
      category: service.category,
      price: service.price,
      imageUrl: service.imageUrl,
    });
  };

  const closeEditModal = () => setEditService(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/services/${editService._id}`,
        formData
      );
      setServices((prev) =>
        prev.map((s) => (s._id === editService._id ? { ...s, ...formData } : s))
      );
      toast.success("Service updated successfully!");
      closeEditModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update service!");
    }
  };

  if (loading)
    return (
      <Loading />
    );

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
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg text-sm md:text-base">
              <thead className="bg-rose-500 text-white">
                <tr>
                  <th className="px-3 md:px-4 py-2 text-left">Image</th>
                  <th className="px-3 md:px-4 py-2 text-left">Service Name</th>
                  <th className="px-3 md:px-4 py-2 text-left">Category</th>
                  <th className="px-3 md:px-4 py-2 text-left">Price</th>
                  <th className="px-3 md:px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr
                    key={service._id}
                    className="border-b hover:bg-rose-50 transition"
                  >
                    <td className="px-3 md:px-4 py-2">
                      <img
                        src={service.imageUrl}
                        alt={service.serviceName}
                        className="w-12 md:w-16 h-12 md:h-16 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="px-3 md:px-4 py-2 font-medium text-gray-700">
                      {service.serviceName}
                    </td>
                    <td className="px-3 md:px-4 py-2 text-gray-600">
                      {service.category}
                    </td>
                    <td className="px-3 md:px-4 py-2 text-gray-600">
                      ${service.price}
                    </td>
                    <td className="px-3 md:px-4 py-2 flex items-center justify-center mt-5 gap-2 md:gap-3">
                      <button
                        onClick={() => toast(`Viewing ${service.serviceName}`)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => openEditModal(service)}
                        className="text-green-500 hover:text-green-700 transition "
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {editService && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 z-50 px-4">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md md:max-w-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className="text-xl font-bold mb-4">Edit Service</h3>
            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                placeholder="Service Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <div className="flex flex-col md:flex-row justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyServices;
