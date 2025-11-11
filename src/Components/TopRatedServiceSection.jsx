
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const TopRatedServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRatedServices = async () => {
      try {
        // Fetch all services
        const { data: allServices } = await axios.get(
          "http://localhost:3000/services"
        );

        // Fetch average rating for each service
        const servicesWithRating = await Promise.all(
          allServices.map(async (service) => {
            const { data } = await axios.get(
              `http://localhost:3000/services/${service._id}/average-rating`
            );
            return { ...service, averageRating: data.averageRating || 0 };
          })
        );

        // Sort by rating and pick top 6
        const top6 = servicesWithRating
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 6);

        setServices(top6);
      } catch (err) {
        console.error("Failed to fetch top rated services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedServices();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Top Rated Services
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 animate-pulse h-72 rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4"
            >
              <img
                src={service.image}
                alt={service.serviceName}
                className="w-full h-44 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{service.serviceName}</h3>
              <p className="text-gray-500 text-sm">{service.category}</p>
              <p className="text-gray-800 font-medium mt-2">${service.price}</p>
              <p className="text-yellow-500 font-semibold mt-1">
                ⭐ {service.averageRating.toFixed(1)}
              </p>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {service.description}
              </p>
              <button
                type="button"
                onClick={() => navigate(`/service-details/${service._id}`)}
                className="mt-auto w-full bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors duration-200 font-medium"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/services")}
          className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors duration-200 font-medium"
        >
          Explore More Services
        </button>
      </div>
    </section>
  );
};

export default TopRatedServicesSection;
