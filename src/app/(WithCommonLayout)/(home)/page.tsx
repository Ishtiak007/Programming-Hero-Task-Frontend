import React from "react";
import Banner from "../../../components/modules/Home/Banner";
import TestimonialSection from "../../../components/modules/Home/Testimonials";
import CategoriesOverview from "../../../components/modules/Home/CategoryOverview";
import WorkSection from "../../../components/modules/Home/WorkSection";
import AddYourEvent from "../../../components/modules/Home/PostYourEvent";
import SubscribeSection from "../../../components/modules/Home/Newsletter";
import AboutEventManager from "../../../components/modules/Home/AboutEventManager";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <AboutEventManager />
      <CategoriesOverview />
      <AddYourEvent />
      <WorkSection />
      <TestimonialSection />
      <SubscribeSection />
    </div>
  );
};

export default HomePage;
