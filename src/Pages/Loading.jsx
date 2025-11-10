// Loading.jsx
import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const dotVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 0.6,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="flex space-x-2">
        <motion.span
          className="w-4 h-4 bg-pink-400 rounded-full"
          variants={dotVariants}
          animate="animate"
          transition={{ delay: 0 }}
        />
        <motion.span
          className="w-4 h-4 bg-pink-500 rounded-full"
          variants={dotVariants}
          animate="animate"
          transition={{ delay: 0.2 }}
        />
        <motion.span
          className="w-4 h-4 bg-pink-600 rounded-full"
          variants={dotVariants}
          animate="animate"
          transition={{ delay: 0.4 }}
        />
      </div>
    </div>
  );
};

export default Loading;
