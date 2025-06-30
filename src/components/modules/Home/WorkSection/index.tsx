"use client";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Select A Venue",
    description: "Choose the perfect event venue for your needs.",
    img: "https://res.cloudinary.com/dwelabpll/image/upload/v1725459170/png-transparent-select-product-ecommerce-item-shopping-and-ecommerce-icon-thumbnail-removebg-preview_bdzhcx.png",
  },
  {
    number: "02",
    title: "Choose Date",
    description: "Pick a convenient date and time for your event.",
    img: "https://res.cloudinary.com/dwelabpll/image/upload/v1725458696/date_jaqrfi.png",
  },
  {
    number: "03",
    title: "Confirm Booking",
    description: "Review the details and lock in your reservation.",
    img: "https://res.cloudinary.com/dwelabpll/image/upload/v1725458870/booking_cg8oje.png",
    highlight: false,
  },
  {
    number: "04",
    title: "Get Confirmation",
    description: "Receive a confirmation email instantly.",
    img: "https://res.cloudinary.com/dwelabpll/image/upload/v1725458950/9156007_l06vit.png",
  },
];

const WorkSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-100 pb-32">
      {/* Banner */}

      <section className="overflow-x-clip py-10 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="lg:flex gap-10 items-center">
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center lg:text-left px-4">
            <h1 className="md:text-2xl font-semibold text-indigo-600">
              How It Works
            </h1>
            <p className="my-4 text-gray-700 max-w-lg">
              Planning your perfect event is easy with us. Just follow three
              simple steps to make your celebration unforgettable.
            </p>
            <ol className="list-decimal list-inside text-gray-600 max-w-md space-y-3">
              <li>
                <strong>Tell Us Your Vision:</strong> Share your event ideas and
                requirements.
              </li>
              <li>
                <strong>We Plan & Organize:</strong> Our expert team handles all
                the details.
              </li>
              <li>
                <strong>Enjoy Your Event:</strong> Relax and celebrate while we
                take care of everything.
              </li>
            </ol>
          </div>

          {/* Image Collage */}
          <div className="flex-1 flex justify-center items-center relative px-4">
            <div className="relative w-[290px] sm:w-[350px]">
              {/* <Image
                width={500}
                height={500}
                className="lg:w-[160px] w-[120px] h-[130px] absolute top-5 -right-12 rounded-lg shadow-2xl shadow-gray-900"
                src="https://images.unsplash.com/photo-1653821355168-144695e5c0e6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Friends celebrating birthday with cake"
              />
              <Image
                width={500}
                height={500}
                className="lg:w-[160px] h-[120px] w-[130px] absolute top-10 -left-10 rounded-lg shadow-2xl shadow-gray-900"
                src="https://images.unsplash.com/photo-1468359601543-843bfaef291a?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Event planner coordinating guests"
              /> */}
              <Image
                width={500}
                height={500}
                className="rounded-lg shadow-lg w-full object-cover"
                src="https://images.unsplash.com/photo-1653821355226-6def361cc7ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Elegant event setup with tables and lighting"
              />
              <Image
                width={500}
                height={500}
                className="lg:w-[160px] h-[130px] w-[130px] absolute -bottom-10 -right-12 rounded-lg shadow-2xl shadow-gray-900"
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Guests enjoying event celebration"
              />
              <Image
                width={500}
                height={500}
                className="lg:w-[160px] w-[130px] h-[130px] absolute -bottom-10 -left-10 rounded-lg shadow-2xl shadow-gray-900"
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Stylish event decor with lights"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <div className="max-w-7xl mx-auto mt-20 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className={`flex flex-col items-center text-center p-6 rounded-xl shadow-lg transition-all duration-300 ${
              step.highlight
                ? "bg-indigo-600 text-white -mt-12 lg:-mt-16"
                : "bg-white"
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
              className={`text-sm leading-relaxed ${
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
