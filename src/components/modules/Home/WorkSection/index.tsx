"use client";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Select A Room",
    description: "Choose the perfect meeting room for your needs.",
    img: "https://res.cloudinary.com/dwelabpll/image/upload/v1725459170/png-transparent-select-product-ecommerce-item-shopping-and-ecommerce-icon-thumbnail-removebg-preview_bdzhcx.png",
  },
  {
    number: "02",
    title: "Choose Date",
    description: "Select your preferred date and time for the booking.",
    img: "https://res.cloudinary.com/dwelabpll/image/upload/v1725458696/date_jaqrfi.png",
  },
  {
    number: "03",
    title: "Confirm Booking",
    description: "Review your details and confirm your reservation.",
    img: "https://res.cloudinary.com/dwelabpll/image/upload/v1725458870/booking_cg8oje.png",
    highlight: true,
  },
  {
    number: "04",
    title: "Receive Confirmation",
    description: "A confirmation will be sent to you shortly.",
    img: "https://res.cloudinary.com/dwelabpll/image/upload/v1725458950/9156007_l06vit.png",
  },
];

const WorkSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-200 pb-32">
      {/* Steps Section */}
      <div className="max-w-7xl mx-auto mt-20 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className={`flex flex-col items-center text-center p-6 rounded-xl shadow-md transition-all duration-300 ${
              step.highlight ? "bg-indigo-600 text-white -mt-10" : "bg-white"
            }`}
          >
            <Image
              width={500}
              height={500}
              src={step.img}
              alt={step.title}
              className="w-20 h-20 mb-4"
            />
            <h2
              className={`text-2xl font-bold ${
                step.highlight ? "text-white" : "text-indigo-700"
              }`}
            >
              {step.number}
            </h2>
            <h3
              className={`text-lg font-semibold mt-2 mb-2 ${
                step.highlight ? "text-white" : "text-indigo-700"
              }`}
            >
              {step.title}
            </h3>
            <p
              className={`text-sm ${
                step.highlight ? "text-indigo-100" : "text-gray-600"
              }`}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
