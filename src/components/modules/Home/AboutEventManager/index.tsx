/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";

const AboutEventManager = () => {
  return (
    <div className="my-20">
      <div className="flex flex-col md:flex-row items-center justify-between p-4 sm:p-6 md:p-8 bg-white layout-padding space-y-6 md:space-y-0 md:space-x-6">
        {/* Image with stat */}
        <div className="flex-1 relative mt-6 md:mt-0">
          <Image
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Event Management"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            height={400}
            width={600}
            data-aos="fade-left"
          />
          <div
            className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-3 sm:p-4 rounded-lg shadow-md"
            data-aos="zoom-out"
            data-aos-delay="300"
          >
            <h3 className="text-indigo-600 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">
              300+
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base">
              Events Successfully Managed
            </p>
          </div>
        </div>

        {/* Text Content */}
        <div
          data-aos="fade-up"
          className="flex-1 space-y-4 md:space-y-6 text-center md:text-left"
        >
          <p className="text-indigo-700 font-semibold text-lg">
            About EventFlow
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Turning Your Dream Events into Reality
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mx-auto md:mx-0 w-full sm:w-4/5">
            EventFlow is your trusted partner in creating unforgettable
            experiences. Whether it's a wedding, corporate gala, or birthday
            bash, we bring creativity, professionalism, and precision to every
            detail.
          </p>
          <p className="text-gray-600 text-sm sm:text-base pb-4 sm:pb-8 mx-auto md:mx-0 w-full sm:w-4/5">
            With a passionate team and years of experience, we ensure your event
            runs smoothly while you focus on making memories. From planning to
            execution, we've got you covered.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutEventManager;
