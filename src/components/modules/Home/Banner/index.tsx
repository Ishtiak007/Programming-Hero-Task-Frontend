"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // event crowd
      heading: "Experience Unforgettable Events",
      desc: "Join and organize conferences, workshops, and celebrations with our seamless event management platform.",
    },
    {
      img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // conference room
      heading: "Plan Your Perfect Event",
      desc: "Choose venues, schedule sessions, and coordinate effortlessly with real-time updates and communication tools.",
    },
    {
      img: "https://images.unsplash.com/photo-1651313948618-31644c7fec18?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // stage lighting
      heading: "Bring Your Vision to Life",
      desc: "From lighting to logistics, manage every detail to create memorable experiences for your guests.",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        navigation
        className="relative"
      >
        {data.map((d, index) => (
          <SwiperSlide key={index}>
            <motion.div
              key={activeIndex}
              className="relative w-full h-[400px] sm:h-[500px] md:h-[650px] lg:h-[750px] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg"
              style={{ backgroundImage: `url(${d.img})` }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#0B1D51] to-transparent"
                aria-hidden="true"
              />

              {/* Content Container */}
              <div className="absolute inset-0 flex items-center justify-center text-white px-4 sm:px-8 lg:px-16">
                <div
                  className="max-w-3xl text-center md:text-left"
                  data-aos="fade-left"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase mb-5 sm:mb-7">
                    {d.heading}
                  </h2>
                  <p
                    className="text-base sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg"
                    data-aos="fade-left"
                    data-aos-delay="300"
                  >
                    {d.desc}
                  </p>
                  <Link href="/events">
                    <button
                      className="px-8 py-3 text-base sm:text-lg font-semibold rounded-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-all duration-300 shadow-lg"
                      data-aos="flip-right"
                      aria-label="Explore Events"
                    >
                      Explore Events
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
