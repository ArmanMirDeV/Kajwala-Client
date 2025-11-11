import React from "react";
import Hero from "../Components/Hero";
import DynamicSection from "../Components/TopRatedServiceSection";
import ChooseUs from "../Components/ChooseUs";
import Testimonials from "../Components/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <DynamicSection />
      <ChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;
