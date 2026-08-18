import React, { useContext } from "react";
import { FaArrowLeft, FaCircleCheck, FaStar, FaBriefcase, FaLocationDot } from "react-icons/fa6";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; 

const WorkerCard = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const { partners, services } = useContext(AppContext);

  const currentService = services.find(srv => srv._id === serviceId);

  const filteredWorkers = partners.filter(worker => {
    const isApproved = worker.status?.toLowerCase() === "approved";
    const matchesService = currentService ? worker.service === currentService.title : true;
    return isApproved && matchesService;
  });

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      
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
        
        {/* Balancing div taaki logo center me rahe */}
        <div className="w-16 sm:w-24"></div>
      </header>

      {/* --- RESPONSIVE HERO SECTION --- */}
      <section className="text-center py-8 sm:py-12 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#001f3f] leading-tight">
          {currentService ? currentService.title : "Available Professionals"}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3">
          Choose from our top-rated, verified experts.
        </p>
      </section>

      {/* --- RESPONSIVE GRID SECTION --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-5 pb-12">
        {filteredWorkers.length === 0 ? (
           <div className="text-center text-lg sm:text-xl text-gray-500 py-16 sm:py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
             No approved professionals found for this service yet.
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {filteredWorkers.map((worker) => (
              <div
                key={worker._id}
                className="relative bg-white rounded-2xl p-5 sm:p-6 text-center border border-gray-100 shadow-sm hover:-translate-y-2 hover:border-green-500 hover:shadow-xl transition-all duration-300"
              >
                {/* Verified Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-emerald-50 text-emerald-600 text-[10px] sm:text-xs font-bold rounded-full px-2 py-1 sm:px-3 sm:py-1 flex items-center gap-1">
                  <FaCircleCheck /> Verified
                </div>

                {/* Profile Image */}
                <img
                  src={worker.profileImage || "https://via.placeholder.com/150"}
                  alt={worker.fullName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-green-100 mx-auto"
                />

                {/* Name & Category */}
                <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-[#001f3f] line-clamp-1">{worker.fullName}</h3>
                <p className="text-green-600 font-semibold text-xs sm:text-sm mt-1 line-clamp-1">{worker.service || worker.category}</p>

                {/* Worker Details Tags */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 border-y border-gray-100 py-3 sm:py-4 my-4 sm:my-5 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> {worker.rating || "New"}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBriefcase className="text-gray-500" /> {worker.experience} Yrs
                  </div>
                  <div className="flex items-center gap-1">
                    <FaLocationDot className="text-gray-500" /> {worker.city}
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-bold">
                    ₹{worker.visitingCharge}
                  </div>
                </div>

                {/* View Profile Button */}
                <Link
                  to={`/provider-profile/${worker._id}`}
                  className="block w-full py-2.5 sm:py-3 rounded-xl bg-[#001f3f] text-white text-sm sm:text-base font-semibold hover:bg-green-600 transition-colors shadow-sm hover:shadow-md"
                >
                  View Full Profile
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default WorkerCard;