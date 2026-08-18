import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Experience_project() {
  const { partners, services, categories, reviews } = useContext(AppContext);

  const statsData = [
    {
      id: 1,
      value: `${partners.length}+`,
      label: "Expert Partners",
    },
    {
      id: 2,
      value: `${services.length}+`,
      label: "Home Services",
    },
    {
      id: 3,
      value: `${categories.length}+`,
      label: "Service Categories",
    },
    {
      id: 4,
      value: `${reviews.length}+`,
      label: "Happy Customers",
    },
  ];

  return (
    <section className="bg-[#f8f7f2] py-14 sm:py-20 lg:py-24 overflow-hidden border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {statsData.map((stat, index) => (
            <div 
              key={stat.id} 
              data-aos="zoom-in" 
              data-aos-delay={index * 150}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#10b981] group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </h2>
   
              <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-gray-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                <p className="text-xs sm:text-sm lg:text-base tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
 
        </div>
      </div>
    </section>
  );
}
 
export default Experience_project;