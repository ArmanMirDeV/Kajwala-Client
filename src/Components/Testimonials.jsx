import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Zabeen Yusuf Nur",
    title: "IT Consultant, Australia",
    quote:
      "Such service platforms are available in other countries. I’ve personally used those when I was abroad. I’m very pleased that such a portal is available here in Bangladesh as well. Thank you Sheba.xyz.",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    id: 2,
    name: "Darshan Patel",
    title: "Marketing Manager, Dhaka",
    quote:
      "The experience was seamless and professional. The team ensured safety and top-quality service every time I booked through the platform.",
    image:
      "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
  },
  {
    id: 3,
    name: "Slav Romanov",
    title: "Teacher, Chittagong",
    quote:
      "I love how convenient and trustworthy the services are. Everything from booking to payment is handled effortlessly!",
    image:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    title: "Entrepreneur, Sylhet",
    quote:
      "This platform has made my life much easier. The support and safety measures are top-notch. Highly recommended!",
    image:
      "https://images.unsplash.com/photo-1762708548538-4a61066f5aa4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const nextStory = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevStory = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 overflow-hidden">
      {/* Header */}
      <div className="text-left mb-10">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Some Happy Faces
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-2">
          Real Happy Customers, Real Stories
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Quote Section */}
        <div className="relative md:w-1/2 flex items-center">
          {/* Left Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-600 rounded-full" />
          {/* Left Arrow */}
          <button
            onClick={prevStory}
            className="absolute -left-4 bg-white shadow-md rounded-full p-2 text-gray-600 hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[index].id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
              className="ml-10"
            >
              <p className="italic text-gray-600 text-lg mb-4">
                “{testimonials[index].quote}”
              </p>
              <p className="font-semibold text-gray-800">
                - {testimonials[index].name}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials[index].title}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image Section */}
        <div className="relative md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[index].image}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="rounded-lg shadow-md w-full h-80 object-cover"
              />
              {/* Play Button */}
              <button className="absolute inset-0 flex items-center justify-center">
                <div className="bg-pink-600 text-white rounded-full p-5 shadow-lg hover:bg-pink-700 transition">
                  <FaPlay className="text-xl" />
                </div>
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow */}
          <button
            onClick={nextStory}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-600 hover:bg-gray-100"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
