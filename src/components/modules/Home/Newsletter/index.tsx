"use client";
import Image from "next/image";
import newsletterBg from "../../../../assets/newsletter.jpg";

const SubscribeSection = () => {
  return (
    <section className="relative w-full py-20 px-4 sm:px-8">
      {/* Background Image */}
      <Image
        src={newsletterBg}
        alt="Newsletter Background"
        fill
        className="object-cover object-center z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-2xl mx-auto text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-indigo-300">
          Stay in the Loop
        </h2>
        <p className="text-lg mb-6">
          Subscribe to receive exclusive updates, early-bird offers, and the
          latest event announcements.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-full text-black border border-indigo-600 placeholder-white outline-none focus:ring-2 ring-indigo-600"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-r-full font-semibold transition border border-indigo-600 border-l-0 cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
