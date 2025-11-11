import React from "react";
import Hero from "../Components/Hero";
import DynamicSection from "../Components/TopRatedServiceSection";
import ChooseUs from "../Components/ChooseUs";

const Home = () => {
  return (
    <div>
          <Hero />
      <DynamicSection />
      <ChooseUs />
    </div>
  );
};

export default Home;
