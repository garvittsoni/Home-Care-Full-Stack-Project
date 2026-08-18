import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Services = () => {
  const { categories } = useContext(AppContext);
  const [showAll, setShowAll] = useState(false);

  // NAYA: Pehle sirf active categories ko filter kiya
  const activeCategories = categories.filter(cat => cat.status === "active");

  // Fir check kiya ki saari active dikhani hain ya sirf pehli 4
  const displayedCategories = showAll ? activeCategories : activeCategories.slice(0, 4);

  const bgColors = ["bg-sky-50", "bg-amber-50", "bg-emerald-50", "bg-purple-50", "bg-rose-50", "bg-indigo-50"];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden" id="services">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {displayedCategories.map((card, index) => {
          const cardBg = card.bgColor || bgColors[index % bgColors.length];

          return (
            <Link
              to={`/subcategory/${card.name}`}
              key={card._id || index}
              data-aos="fade-up" 
              data-aos-delay={index * 150} 
              className={`${cardBg} relative rounded-2xl p-6 h-52 overflow-hidden block hover:shadow-lg transition-shadow duration-300 border border-slate-100`}
            >
              {/* text content start */}
              <div className="relative z-10 w-[55%] h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 leading-tight">
                    {card.name} 
                  </h3>

                  <p className="text-xs font-semibold text-gray-600 mt-2 line-clamp-2">
                    {card.subtitle || "Explore expert professional services."}
                  </p>
                </div>
                
                {/* Explore / Book Link */}
                <span className="group/btn relative inline-flex items-center gap-1 text-left text-red-600 font-bold text-sm w-fit pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">
                  Explore 
                  <span className="transition-transform duration-300 ease-in-out group-hover/btn:translate-x-1.5">
                    &rarr;
                  </span>
                </span>
              </div>

              {/* Category Image from Cloudinary */}
              <img
                src={card.image}
                alt={card.name}
                className="absolute -right-3 top-1/2 -translate-y-1/2 h-[85%] w-[50%] object-contain object-right drop-shadow-md mix-blend-multiply pointer-events-none"
              />
            </Link>
          );
        })}
      </div>

      {/* View More / View Less Button */}
      {/* NAYA: Button tabhi dikhega jab active categories 4 se zyada hon */}
      {activeCategories.length > 4 && (
        <div className="mt-10 text-center" data-aos="fade-up">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="bg-[#072B61] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            {showAll ? "View Less" : "View All Services"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Services;