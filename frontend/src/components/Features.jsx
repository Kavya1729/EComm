import { Headphones, Shield, Truck } from "lucide-react";
import React from "react";

const Features = () => {
  const featureList = [
    {
      icon: <Truck className="h-6 w-6 text-blue-600" />,
      title: "Free Shipping",
      desc: "On orders over $50",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Secure Payment",
      desc: "100% secure transactions",
      bgColor: "bg-green-100",
    },
    {
      icon: <Headphones className="h-6 w-6 text-purple-600" />,
      title: "24/7 Support",
      desc: "Always here to help",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Consistent Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white hover:shadow-sm transition-all"
            >
              <div
                className={`h-12 w-12 ${feature.bgColor} rounded-full flex items-center justify-center shrink-0`}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
