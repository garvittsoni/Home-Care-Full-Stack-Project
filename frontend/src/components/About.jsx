import React from 'react';
import artImg from '../assets/images/art.webp'; 

function About() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 overflow-hidden" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
 
          {/* Image - Left se aayegi */}
          <div 
            data-aos="fade-right" 
            className="flex justify-center order-1"
          >
            <img
              src={artImg}
              alt="Line Art Illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
            />
          </div>
 
          {/* Content - Right se aayega */}
          <div 
            data-aos="fade-left" 
            className="order-2 text-center lg:text-left"
          >
            <span className="inline-flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4">
              Trusted Cleaning Service
            </span>
 
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Homecare Solutions
              <br className="hidden sm:block" />
              Trusted Cleaning Services in Karauli
            </h2>
 
            <p className="mt-5 sm:mt-6 lg:mt-8 text-base sm:text-lg text-gray-600 leading-7 sm:leading-8">
              Homecare Solutions offers trusted cleaning services in Karauli for
              homes, apartments, villas, and offices. From deep cleaning, kitchen
              and bathroom cleaning to sofa and carpet care, services are designed
              for busy families, working professionals, and businesses. Serving key
              areas like Indiranagar, Whitefield, Marathahalli, Electronic City,
              and HSR Layout, the team ensures hygienic, spotless spaces with
              professional care and modern equipment.
            </p>
          </div>
 
        </div>
      </div>
    </section>
  );
}
 
export default About;