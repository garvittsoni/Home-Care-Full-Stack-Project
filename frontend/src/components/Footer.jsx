import React from "react";
import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#07294D] text-gray-300 py-10 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {/* Logo & About */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Home<span className="text-green-500">Care</span>
          </h1>
          <p className="mt-4 sm:mt-5 leading-6 sm:leading-7 text-gray-400 text-xs sm:text-sm md:text-base">
            We provide reliable home services with experienced professionals.
            Whether it's repairs, cleaning, appliance servicing, or maintenance,
            our goal is to make everyday home care simple and hassle-free.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white relative inline-block">
            Quick Links
            <span className="absolute left-0 -bottom-2 h-1 w-12 bg-green-500 rounded"></span>
          </h2>

          <ul className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 text-sm sm:text-base">
            {[
              { name: "About Us", path: "/#about" },
              { name: "How It Works", path: "/#how-it-works" },
              { name: "Become A Partner", path: "/PartnerRegistration" },
              { name: "Our Team", path: "/Team" },
              { name: "Contact Us", path: "/#contact" },
            ].map((link) => (
              <li key={link.name} className="transition duration-300 hover:translate-x-2">
                <Link
                  to={link.path}
                  className="flex items-center gap-3 hover:text-green-500 cursor-pointer"
                >
                  <FaChevronRight className="text-green-500 text-xs flex-shrink-0" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Services */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white relative inline-block">
            Top Services
            <span className="absolute left-0 -bottom-2 h-1 w-12 bg-green-500 rounded"></span>
          </h2>

          <ul className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 text-sm sm:text-base">
            {[
              { name: "Home Repair", slug: "Home Repair" },
              { name: "Appliance Service", slug: "Appliance Service" },
              { name: "Deep Cleaning", slug: "Deep Cleaning" },
              { name: "Electrician", slug: "Electrician" },
              { name: "Medical Services", slug: "Medical Services" },
            ].map((service) => (
              <li key={service.name} className="transition duration-300 hover:translate-x-2">
                <Link
                  to={`/subcategory/${encodeURIComponent(service.slug)}`}
                  className="flex items-center gap-3 hover:text-green-500 cursor-pointer"
                >
                  <FaChevronRight className="text-green-500 text-xs flex-shrink-0" />
                  <span>{service.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white relative inline-block">
            Contact Info
            <span className="absolute left-0 -bottom-2 h-1 w-12 bg-green-500 rounded"></span>
          </h2>

          <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 text-xs sm:text-sm md:text-base">
            <div className="flex gap-3 sm:gap-4">
              <FaMapMarkerAlt className="text-green-500 mt-1 flex-shrink-0" />
              <p className="leading-5 sm:leading-6">
                Karauli, rajasthan, India
              </p>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <FaPhoneAlt className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <p>+91 784547 8516</p>
                <p>+91 14578 45789</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <FaEnvelope className="text-green-500 mt-1 flex-shrink-0" />
              <p className="break-all">yashvender720@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 mt-10 sm:mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-400 text-xs sm:text-sm gap-4 text-center">
        <p>© {new Date().getFullYear()} HomeCare. All Rights Reserved.</p>
        <p className="font-medium tracking-wide">
          Powered by <span className="text-green-400 font-semibold">Ktech Education Group</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;