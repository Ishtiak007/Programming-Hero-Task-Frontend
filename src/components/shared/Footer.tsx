"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest,
} from "react-icons/bs";

const Footer = () => {
  return (
    <motion.footer
      initial={{ height: 0 }}
      whileInView={{ height: "auto" }}
      transition={{ duration: 0.3 }}
      className="bg-[#1E293B] text-white px-6 py-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="text-center sm:text-left">
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Event
              <span className="text-indigo-400">Manager</span>
            </h1>
          </Link>
          <p className="mt-3 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
            Simplify your event planning, booking, and management experience.
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="font-bold text-base mb-4">Services</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Event Scheduling & Management
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Venue Booking Assistance
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ticketing & Registration
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Custom Event Promotion
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                24/7 Customer Support
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="font-bold text-base mb-4">Customer Support</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Refund & Cancellation Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Event Guidelines
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="font-bold text-base mb-4">Contact</h2>
          <p className="text-sm mb-2">support@EventManagement.com</p>
          <p className="text-sm mb-6">+1 (555) 123-4567</p>

          <h2 className="font-bold text-base mb-3">Follow Us</h2>
          <div className="flex gap-4 text-xl">
            <a
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <BsFacebook />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <BsInstagram />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="Twitter"
            >
              <BsTwitter />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="Pinterest"
            >
              <BsPinterest />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="mt-10 border-t border-indigo-400 pt-4 text-center text-sm text-indigo-300">
        © {new Date().getFullYear()} EventManagement. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
