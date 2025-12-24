import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between">
        {/* Info Section */}
        <div className="mb-6 md:mb-0">
          <Link to="/">
            {/* Replace with your actual Mittal Mart logo path */}
            <h2 className="text-2xl font-bold text-pink-600">Mittal Mart</h2>
          </Link>
          <p className="mt-2 text-sm max-w-xs">
            Powering Your World with the Best in Electronics and Lifestyle.
          </p>
          <div className="mt-4 text-sm space-y-1">
            <p>123 Electronics St, Style City, NY 10001</p>
            <p>Email: support@mittalmart.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Customer Service Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Customer Service</h3>
          <ul className="mt-2 text-sm space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Order Tracking</li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <FaFacebook className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-colors" />
            <FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer transition-colors" />
            <FaTwitterSquare className="w-6 h-6 hover:text-blue-400 cursor-pointer transition-colors" />
            <FaPinterest className="w-6 h-6 hover:text-red-600 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="max-w-xs">
          <h3 className="text-xl font-semibold">Stay in the Loop</h3>
          <p className="mt-2 text-sm text-gray-400">
            Subscribe to get special offers, free giveaways, and more.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
              required
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 rounded-r-md hover:bg-pink-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-pink-600 font-semibold">Mittal Mart</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
