import React, { useContext, useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";
import googleLogo from "../assets/images/google.svg";

const Feedback = () => {
  const { reviews } = useContext(AppContext);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-slate-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Trusted by Thousands of Homeowners
            </h2>
          </div>

          {/* Navigation Arrows for Slider */}
          {reviews.length > 3 && (
            <div className="hidden md:flex gap-3 mt-6 md:mt-0">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              >
                <FaChevronLeft size={16} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          
          {/* Left Badge / Google Rating Card */}
          <div className="w-full lg:w-[280px] bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 flex flex-col items-center text-center shrink-0 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl pointer-events-none"></div>
            
            <h3 className="text-2xl font-black text-slate-900 tracking-wide uppercase">
              EXCELLENT
            </h3>

            <div className="flex justify-center gap-1.5 text-amber-400 text-xl my-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="text-slate-500 text-sm mb-6">
              Based on <strong className="text-slate-800">{reviews.length > 0 ? `${reviews.length} verified reviews` : "2,612 reviews"}</strong>
            </p>

            <div className="pt-4 border-t border-slate-100 w-full flex justify-center">
              <img
                src={googleLogo}
                alt="Google"
                className="w-24 object-contain opacity-90"
              />
            </div>
          </div>

          {/* Right Modern Slider Container */}
          <div className="flex-1 w-full overflow-hidden relative">
            {reviews.length === 0 ? (
              <div className="text-center text-slate-400 py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
                No reviews available right now. Be the first to share your experience!
              </div>
            ) : (
              <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              >
                {reviews.map((review, index) => {
                  const userName = review.userName || review.name || "Anonymous";
                  const userComment = review.comment || review.review || "";
                  const initialLetter = userName.charAt(0).toUpperCase();

                  return (
                    <div
                      key={review._id || index}
                      className="bg-white border border-slate-100/80 rounded-3xl p-7
                      min-w-[320px] max-w-[320px] sm:min-w-[370px] sm:max-w-[370px] shrink-0
                      shadow-lg shadow-slate-100 hover:shadow-xl hover:-translate-y-1
                      transition-all duration-300 flex flex-col justify-between relative group"
                    >
                      <div className="absolute top-6 right-6 text-slate-100 group-hover:text-emerald-50 transition-colors pointer-events-none">
                        <FaQuoteRight size={36} />
                      </div>

                      <div>
                        {/* User Header */}
                        <div className="flex items-center gap-4 mb-5 relative z-10">
                          {review.image ? (
                            <img
                              src={review.image}
                              alt={userName}
                              className="w-13 h-13 rounded-full object-cover shadow-md border-2 border-emerald-50"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/20">
                              {initialLetter}
                            </div>
                          )}

                          <div>
                            <h4 className="font-bold text-base text-slate-900">
                              {userName}
                            </h4>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                              {review.time || "Verified Customer"}
                            </span>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 text-amber-400 mb-4 text-sm relative z-10">
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>

                        {/* Comment */}
                        <p className="text-slate-600 leading-relaxed text-sm relative z-10 line-clamp-4">
                          "{userComment}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Feedback;