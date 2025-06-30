"use client";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Avatar } from "antd";
import Aos from "aos";
import Image from "next/image";

const testimonials = [
  {
    name: "Rahim Uddin",
    role: "Birthday Client",
    testimonial:
      "The decorations were magical and the staff went above and beyond. Our child’s birthday was unforgettable!",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
  },
  {
    name: "Sadia Khatun",
    role: "Wedding Client",
    testimonial:
      "Flawless execution! From the venue to the catering, everything was just perfect. Highly recommended!",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1727161931/Testimonial-Videos-1_di6gde.png",
  },
  {
    name: "Tanvir Hasan",
    role: "Corporate Event",
    testimonial:
      "Professional and punctual. They handled our annual gala smoothly. Will definitely book again!",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1727162014/images_5_oyzjjc.jpg",
  },
  {
    name: "Jannatul Ferdous",
    role: "Client",
    testimonial:
      "Everything was handled beautifully — from seating to sound. Thank you for a memorable evening!",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1727161859/positive-mindset-positive-life-portrait-happy-young-woman-home_590464-22422_pxuwht.avif",
  },
  {
    name: "Nabil Chowdhury",
    role: "Seminar Organizer",
    testimonial:
      "Excellent service, great communication, and attention to detail. Our seminar ran perfectly.",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1727161761/portrait-young-indian-woman-happy-with-internship-human-resources-opportunity-mission-vision-company-values-goals-face-headshot-gen-z-pe_lsoixl.avif",
  },
];

const TestimonialSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  const [slidePercentage, setSlidePercentage] = useState(
    typeof window !== "undefined" && window.innerWidth < 640 ? 100 : 33.333
  );

  useEffect(() => {
    const handleResize = () => {
      setSlidePercentage(window.innerWidth < 640 ? 100 : 33.333);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="min-h-screen pt-8 pb-32">
      <div className="relative flex flex-col lg:flex-row items-center justify-between bg-gray-100 p-8 lg:px-28 space-y-12 lg:space-y-0">
        {/* Left Side Image */}
        <div className="w-full lg:w-1/2" data-aos="zoom-in-left">
          <Image
            src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Event Moments"
            width={600}
            height={400}
            className="rounded-lg w-full h-auto object-cover shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div
          className="w-full lg:w-1/2 space-y-6 text-left lg:pl-12"
          data-aos="fade-up"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            What Our Clients Say About Their Events
          </h2>
          <p className="text-gray-600">
            Whether it’s a wedding, corporate seminar, or a birthday
            celebration, our clients trust us to deliver exceptional
            experiences. Their satisfaction is our biggest reward.
          </p>
          <button className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition">
            Book Your Event
          </button>
        </div>

        {/* Carousel */}
        <div
          className="absolute bottom-[-30%] lg:bottom-[-25%] right-0 w-full lg:w-4/5 bg-gray-100 shadow-xl p-6 rounded-md"
          data-aos="fade-up"
        >
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3000}
            stopOnHover
            showIndicators={false}
            centerMode
            centerSlidePercentage={slidePercentage}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="max-w-xl bg-white rounded-lg shadow p-4 mx-2 flex items-start gap-4"
              >
                <Avatar
                  src={testimonial.imgSrc}
                  className="w-[30%]"
                  size={64}
                />
                <div className="w-[70%] lg:h-[120px]">
                  <p className="text-gray-800 font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-blue-800">{testimonial.role}</p>
                  <p className="text-gray-600 text-sm">
                    {testimonial.testimonial}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
