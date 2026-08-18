import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { heroData } from '../assets/data/data';
import { FaLocationDot, FaChevronDown, FaMagnifyingGlass } from "react-icons/fa6";

const Hero = () => {
    const navigate = useNavigate();
    const { searchServices } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (!searchTerm.trim()) return;

        const redirectUrl = searchServices(searchTerm);
        
        if (redirectUrl) {
            navigate(redirectUrl);
        } else {
            alert("No matching service found. Please try checking our categories directly!");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header
            className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 py-20 text-center bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${heroData.bgImage}')` }}
        >
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            <div className="relative z-10 w-full max-w-5xl mx-auto">
                <h1 data-aos="fade-up" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                    <span className="text-green-600">{heroData.title.split(' ')[0]}</span>{' '}
                    {heroData.title.split(' ').slice(1).join(' ')}
                    <br className="hidden sm:block" /> {heroData.subtitle}
                </h1>

                <p data-aos="fade-up" data-aos-delay="200" className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
                    {heroData.description}
                </p>

                <div data-aos="zoom-in" data-aos-delay="400" className="w-full max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl md:rounded-full p-2 shadow-2xl">
                        
                        <div className="relative flex items-center w-full md:w-auto px-5 py-3 md:py-2.5 hover:bg-gray-50 rounded-2xl md:rounded-full transition-all duration-300 cursor-pointer group border border-transparent hover:border-gray-200">
                            <FaLocationDot className="text-[#27a14e] text-xl mr-3 group-hover:scale-110 transition-transform duration-300" />
                            <select className="bg-transparent text-[#001f3f] font-extrabold text-base focus:outline-none cursor-pointer w-full md:w-32 appearance-none outline-none relative z-10 hover:text-[#27a14e] transition-colors duration-200">
                                <option value="Karauli" className="bg-white text-gray-800 font-semibold py-2">Karauli</option>
                                <option value="hyderabad" className="bg-white text-gray-800 font-semibold py-2">Hyderabad</option>
                                <option value="chennai" className="bg-white text-gray-800 font-semibold py-2">Chennai</option>
                                <option value="mumbai" className="bg-white text-gray-800 font-semibold py-2">Mumbai</option>
                                <option value="delhi" className="bg-white text-gray-800 font-semibold py-2">Delhi NCR</option>
                            </select>
                            <FaChevronDown className="text-gray-400 text-sm ml-1 group-hover:text-[#27a14e] transition-colors" />
                        </div>

                        <div className="hidden md:block w-px h-10 bg-gray-300 mx-2"></div>
                        <div className="md:hidden w-full h-px bg-gray-200 my-1"></div>

                        <div className="flex-1 w-full px-4 py-3 md:py-2">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Search for a service (e.g., Cleaning, Plumber...)"
                                className="w-full bg-transparent text-gray-800 font-medium focus:outline-none placeholder-gray-400 text-base outline-none"
                            />
                        </div>

                        <button 
                            onClick={handleSearch}
                            className="w-full md:w-auto bg-[#27a14e] hover:bg-green-700 text-white font-bold py-3.5 px-8 rounded-2xl md:rounded-full transition duration-300 shadow-md flex justify-center items-center gap-2 mt-2 md:mt-0 cursor-pointer"
                        >
                            <FaMagnifyingGlass className="text-lg" /> Search
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;