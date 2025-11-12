import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const AddServices = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to add a service!");
      return;
    }

    const newService = {
      ...formData,
      providerName: user.displayName || "Unknown Provider",
      providerEmail: user.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/services",
        newService
      );
      if (response.status === 201 || response.status === 200) {
        setFormData({
          serviceName: "",
          category: "",
          price: "",
          description: "",
          imageUrl: "",
        });
        toast.success("Service added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add service!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-rose-600 mb-6">
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Service Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              placeholder="Enter service name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Plumbing, Cleaning, Electrical"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description"
              required
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {/* Provider Info */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-gray-600 font-medium mb-1">
                Provider Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServices;
