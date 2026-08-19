import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHouseChimneyMedical, FaBars, FaXmark, FaUserPen } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();
  const { partners } = useContext(AppContext);

  const currentUserEmail = user?.primaryEmailAddress?.emailAddress;
  const loggedInProvider = partners?.find(p => p.email === currentUserEmail);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <header data-aos="fade-down" className="bg-white shadow-md sticky top-0 z-50">

        {/* Top Navbar Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Left Side: Logo & Brand Name (Fixed Link Wrapper) */}
          <div data-aos="fade-right" className="flex items-center">
            <Link to="/" className="flex items-center gap-3 cursor-pointer group">
              <div className="bg-green-100 text-green-600 w-10 h-10 flex items-center justify-center rounded-full shadow-sm group-hover:bg-green-200 transition duration-300">
                <FaHouseChimneyMedical className="text-lg" />
              </div>

              <span className="text-xl sm:text-2xl font-black tracking-wider uppercase text-slate-900 group-hover:text-green-600 transition duration-300">
                Home <span className="text-green-600">ZO</span>
              </span>
            </Link>
          </div>

          {/* Right Side: Login Button & Mobile Toggle */}
          <div data-aos="fade-left" className="flex items-center gap-4">

            {/* Desktop Login / Profile Section */}
            <div className="hidden sm:flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="flex items-center gap-2 border border-green-700 bg-gray-100 text-green-600 px-4 py-2 rounded-full hover:bg-green-50 transition duration-300 ease-in-out cursor-pointer font-semibold focus:outline-none">
                    <FaRegUser className="text-lg" />
                    <span>Login</span>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                {loggedInProvider && (
                  <Link 
                    to={`/edit-profile/${loggedInProvider._id}`}
                    className="flex items-center gap-2 bg-[#001f3f] text-white px-4 py-2 rounded-full hover:bg-blue-900 transition font-semibold text-sm cursor-pointer shadow-sm"
                  >
                    <FaUserPen /> Edit Profile
                  </Link>
                )}

                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10"
                    }
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 text-2xl focus:outline-none p-1 cursor-pointer flex items-center justify-center"
            >
              {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Bottom Navigation Links (Desktop) */}
        <div data-aos="fade-in" className="hidden md:flex justify-center items-center gap-8 py-3 border-t border-gray-200 text-sm font-semibold tracking-wide text-gray-800">
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-green-600 transition duration-200 cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-green-600 transition duration-200 cursor-pointer"
          >
            Contact
          </button>
          <Link to="/PartnerRegistration" className="hover:text-green-600 transition duration-200">
            Become a Partner | Worker's
          </Link>
          <button
            onClick={() => scrollToSection("services")}
            className="hover:text-green-600 transition duration-200 cursor-pointer"
          >
            Services
          </button>
          <Link to="/team" className="hover:text-green-600 transition duration-200">
            Our Team
          </Link>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div data-aos="fade-down" className="md:hidden bg-white border-t border-gray-200 py-4 px-6 space-y-4 shadow-xl">
            <button 
              onClick={() => { scrollToSection("about"); }} 
              className="block text-gray-700 font-medium hover:text-green-600 text-left w-full"
            >
              About Us
            </button>
            <button 
              onClick={() => { scrollToSection("contact"); }} 
              className="block text-gray-700 font-medium hover:text-green-600 text-left w-full"
            >
              Contact
            </button>
            <Link 
              to="/PartnerRegistration" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block text-gray-700 font-medium hover:text-green-600"
            >
              Become a Partner | Worker's
            </Link>
            <button 
              onClick={() => { scrollToSection("services"); }} 
              className="block text-gray-700 font-medium hover:text-green-600 text-left w-full"
            >
              Services
            </button>
            <Link 
              to="/team" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block text-gray-700 font-medium hover:text-green-600"
            >
              Our Team
            </Link>

            {/* Login Button / Avatar inside Mobile Menu */}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4 items-center">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="relative overflow-hidden w-full flex justify-center items-center gap-2 bg-gray-100 text-green-600 py-3 rounded-full font-semibold shadow-md cursor-pointer">
                    <FaRegUser /> Login
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                {loggedInProvider && (
                  <Link 
                    to={`/edit-profile/${loggedInProvider._id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex justify-center items-center gap-2 bg-[#001f3f] text-white py-3 rounded-full font-semibold shadow-md cursor-pointer"
                  >
                    <FaUserPen /> Edit Profile
                  </Link>
                )}
                
                <div className="py-1">
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-11 h-11"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;