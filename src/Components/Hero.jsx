import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnZD830WI5P9946cxoIVj1SrlHFz8iD_SvZA&s",
    headline: "Professional Plumbing Services",
    details: "Fast and reliable plumbing solutions at your doorstep.",
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjDuagUH7J93xp7jVhIG_soL2zhIV3mjukOA&s",
    headline: "Certified Electricians",
    details: "Safe and efficient electrical services for your home and office.",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl4RiHjq-YogTRPCJo6TMWutDeWp6QMrKOeA&s",
    headline: "Expert Cleaning Services",
    details: "Spotless cleaning services to keep your spaces sparkling.",
  },
];

const SLIDE_INTERVAL = 5000;

const HeroFixed = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <AnimatePresence key={slide.id}>
          {index === current && (
            <motion.div
              key={slide.id}
              className="absolute inset-0 w-full h-full rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={slide.image}
                alt={slide.headline}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start md:pl-16 text-center md:text-left text-white px-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                  {slide.headline}
                </h2>
                <p className="mb-4 text-sm md:text-lg">{slide.details}</p>
                <Link
                  to="/services"
                  className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors duration-200 font-medium">
                  Explore
                </Link>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-blue-600" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroFixed;
