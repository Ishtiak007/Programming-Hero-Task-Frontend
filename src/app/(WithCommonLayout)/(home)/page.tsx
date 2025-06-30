import React from "react";
import Banner from "../../../components/modules/Home/Banner";
import TestimonialSection from "../../../components/modules/Home/Testimonials";
import CategoriesOverview from "../../../components/modules/Home/CategoryOverview";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <CategoriesOverview />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
