import React from "react";
import { Button } from "./ui/button"; // Ensure this path matches your Shadcn UI folder

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-purple-600 text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="z-10 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Upgrade Your Tech with{" "}
              <span className="text-pink-400">Mittal Mart</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-lg">
              Discover cutting-edge technology and unbeatable deals on the
              latest gadgets. From smartphones to smart homes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-pink-600 text-white hover:bg-pink-700 px-8 py-6 text-lg"
              >
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent px-8 py-6 text-lg"
              >
                View Deals
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center">
            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full blur-[100px] opacity-30"></div>

            <img
              src="/phone.jpg"
              alt="Mittal Mart Electronics"
              className="relative z-10 w-full max-w-md h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
