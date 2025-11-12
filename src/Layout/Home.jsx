import React from "react";
import Hero from "../Components/Hero";
import DynamicSection from "../Components/TopRatedServiceSection";
import ChooseUs from "../Components/ChooseUs";
import Testimonials from "../Components/Testimonials";

const Home = () => {
  return (
    <div>
      <h1 class="text-4xl md:text-6xl font-extrabold text-center text-gray-800 leading-tight">
        <span class="text-rose-600">KajWala</span> — Your Trusted Local Service
        Partner
      </h1>
      <p class="text-gray-600 text-center mt-4 text-lg mb-12">
        Connect instantly with verified electricians, plumbers, cleaners, and
        more.
      </p>

      <Hero />
      <DynamicSection />
      <ChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;
