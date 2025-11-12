import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Loading from "./Loading";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://kajwala-server.vercel.app/services"
        );
        setServices(res.data);
        setFilteredServices(res.data);

        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map((s) => s.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle filter
  const handleFilter = () => {
    let filtered = services;

    if (minPrice !== "" || maxPrice !== "") {
      filtered = filtered.filter((s) => {
        const price = parseFloat(s.price);
        if (minPrice !== "" && price < parseFloat(minPrice)) return false;
        if (maxPrice !== "" && price > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    if (category) {
      filtered = filtered.filter((s) => s.category === category);
    }

    setFilteredServices(filtered);
  };

  if (loading) {
    return <Loading />;
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

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sticky Filter Sidebar */}
        <div className="md:w-1/4">
          <div className="sticky top-20 bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Filters</h3>

            {/* Price Range */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Min Price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Max Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="1000"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <option value="">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleFilter}
                className="w-full px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
              >
                Apply Filter
              </button>
              <button
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  setCategory("");
                  setFilteredServices(services);
                }}
                className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length === 0 ? (
            <p className="text-center text-gray-500 md:col-span-3">
              No services found.
            </p>
          ) : (
            filteredServices.map((service) => (
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
                <p className="text-gray-500 mb-2">
                  Category: {service.category}
                </p>
                <p className="text-gray-700 font-medium mb-4">
                  ${service.price}
                </p>
                <button
                  onClick={() => navigate(`/service-details/${service._id}`)}
                  className="mt-auto bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition"
                >
                  View Details
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
