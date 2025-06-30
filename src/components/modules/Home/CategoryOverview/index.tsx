"use client";
import Image from "next/image";
import React from "react";

const categories = [
  {
    title: "Wedding",
    description: "Crafting Your Unique Wedding Experience",
    img: "https://plus.unsplash.com/premium_photo-1681841695231-d674aa32f65b?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Anniversary",
    description: "Celebrating Your Marriage Milestones",
    img: "https://images.unsplash.com/photo-1633102467628-6511a5129a03?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Engagement",
    description: "Celebrating the Next Chapter",
    img: "https://images.unsplash.com/photo-1600396512484-5ab819b8dc6e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Birthday",
    description: "Honoring Your Past, Creating Your Future",
    img: "https://plus.unsplash.com/premium_photo-1681841125083-78fa9ee82169?q=80&w=1117&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Baby Shower",
    description: "Creative Ideas for a Unique Celebration",
    img: "https://images.unsplash.com/photo-1625990462521-a09e6b880d50?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Retirement Party",
    description: "Planning a Retirement Celebration",
    img: "https://plus.unsplash.com/premium_photo-1686783009584-0ef0afc5fb5b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CategoriesOverview = () => {
  return (
    <div className="bg-slate-100 p-4 sm:p-6 md:p-10 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="relative group w-full aspect-video overflow-hidden rounded-lg shadow-md"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <Image
              fill
              src={cat.img}
              alt={cat.title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/55 bg-opacity-60 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-500">
              <h1 className="text-indigo-500 text-xl font-mono font-bold mb-2">
                {cat.title}
              </h1>
              <p className="text-white text-sm px-4">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesOverview;
