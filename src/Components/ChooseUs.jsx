import React from "react";
import { motion } from "framer-motion";

// Import images from assets
import maskIcon from "../assets/mask.png";
import supportIcon from "../assets/support.png";
import sanitiseIcon from "../assets/sanitise.png";
import glovesIcon from "../assets/gloves.png";
import safetyTeam from "../assets/safety-team.jpg";

const ChooseUs = () => {
  const features = [
    { icon: maskIcon, title: "Ensuring Masks" },
    { icon: supportIcon, title: "24/7 Support" },
    { icon: sanitiseIcon, title: "Sanitising Hands & Equipment" },
    { icon: glovesIcon, title: "Ensuring Gloves" },
  ];

  const stats = [
    { number: "15,000+", label: "Service Providers" },
    { number: "2,00,000+", label: "Orders Served" },
    { number: "1,00,000+", label: "5 Star Reviews" },
  ];

  return (
    <section className="bg-gray-50 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className=" text-4xl font-bold text-red-600 ">
          Why Choose Us
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
          Because we care about your safety
        </h2>
      </div>

      {/* Features & Image */}
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:space-x-12">
        {/* Left Features */}
        <div className="grid grid-cols-2 gap-6 flex-1 mb-10 lg:mb-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-6 text-center transition transform hover:shadow-2xl"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-16 h-16 mx-auto mb-3"
              />
              <h4 className="text-lg font-semibold text-gray-700">
                {feature.title}
              </h4>
            </motion.div>
          ))}
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-lg overflow-hidden shadow-lg relative"
          >
            <img
              src={safetyTeam}
              alt="Safety Ensured"
              className="w-full object-cover transition-transform duration-300"
            />
            <div className="absolute bottom-0 w-full bg-rose-600 text-white text-center py-2 text-sm font-medium">
              ✅ Safety Ensured
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-10 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-4 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-xl shadow-lg"
          >
            <h3 className="text-3xl font-bold">{stat.number}</h3>
            <p className="mt-1 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ChooseUs;
