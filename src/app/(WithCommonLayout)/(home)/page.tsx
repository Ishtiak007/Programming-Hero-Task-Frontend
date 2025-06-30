import React from "react";
import Banner from "../../../components/modules/Home/Banner";
import TestimonialSection from "../../../components/modules/Home/Testimonials";
import CategoriesOverview from "../../../components/modules/Home/CategoryOverview";
import WorkSection from "../../../components/modules/Home/WorkSection";
import AddYourEvent from "../../../components/modules/Home/PostYourEvent";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <CategoriesOverview />
      <TestimonialSection />
      <AddYourEvent />
      <WorkSection />
    </div>
  );
};

export default HomePage;
