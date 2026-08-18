import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaArrowLeft } from "react-icons/fa6";

const SubCategorie = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const { categories, services } = useContext(AppContext);

  const currentCategory = categories.find(
    (cat) => cat.name.toLowerCase() === slug?.toLowerCase()
  ) || { name: slug || "Home Repair" };

  // NAYA: Yahan humne add kiya hai `&& service.status === "active"`
  const filteredServices = services.filter(
    (service) => 
      service.categoryName?.toLowerCase() === currentCategory.name?.toLowerCase() &&
      service.status === "active"
  );

  return (
    <section className="bg-gray-50 min-h-screen pb-20">
      
      {/* --- RESPONSIVE HEADER --- */}
      <header className="bg-white px-4 sm:px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-green-600 transition cursor-pointer w-16 sm:w-24"
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-xl sm:text-2xl font-black uppercase text-[#001f3f] flex-1 text-center">
          HOME<span className="text-green-600">CARE</span>
        </h2>
        
        {/* Balancing div taaki logo hamesha center me rahe */}
        <div className="w-16 sm:w-24"></div>
      </header>

      {/* --- RESPONSIVE HERO SECTION --- */}
      <div className="bg-[#072B61] py-12 sm:py-16 md:py-20 text-center text-white px-4 shadow-inner">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-5 uppercase tracking-wide">
          {currentCategory.name}
        </h1>

        <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed">
          Select a specialized category below to find top-rated professionals for your {currentCategory.name?.toLowerCase()} needs.
        </p>
      </div>

      {/* --- RESPONSIVE GRID SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {filteredServices.length === 0 ? (
          <div className="text-center text-gray-500 text-lg sm:text-xl py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            No active services found for this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredServices.map((service) => {
              return (
                <Link
                  key={service._id}
                  to={`/workers/${service._id}`} 
                  className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden
                  border border-gray-100 sm:border-gray-200 shadow-sm sm:shadow-md
                  h-36 sm:h-48 flex flex-col justify-center items-center
                  cursor-pointer transition-all duration-300
                  hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-lg sm:hover:shadow-xl
                  hover:border-green-500 p-3 sm:p-5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                  <div
                    className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-50
                    flex items-center justify-center mb-2 sm:mb-4 overflow-hidden
                    transition-all duration-300 group-hover:shadow-md ring-4 ring-white"
                  >
                    <img 
                      src={service.icon || "https://via.placeholder.com/150"} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <h3
                    className="relative z-10 text-sm sm:text-base font-bold text-[#08244D]
                    text-center px-1 transition-all duration-300
                    group-hover:text-black line-clamp-2 leading-tight"
                  >
                    {service.title}
                  </h3>

                  <span className="relative z-10 text-[10px] sm:text-xs font-bold text-green-600 mt-1.5 sm:mt-2 bg-green-50 px-2 py-1 rounded-full">
                    Starts at ₹{service.startingPrice}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubCategorie;