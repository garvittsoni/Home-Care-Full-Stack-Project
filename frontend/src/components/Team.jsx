import React from "react";
import { FaArrowLeft, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Yashvendra Singh Jadaun",
      role: "Full Stack Developer",
      image: "https://res.cloudinary.com/dpzuoyw88/image/upload/v1786988128/Picsart_26-03-28_03-39-38-041_l4idco.jpg",
      github: "https://github.com/iamyashvendra",
    },{
      name: "Garvitt Soni",
      role: "Full Stack Developer",
      image: "https://res.cloudinary.com/dn0pwidh2/image/upload/v1786948781/homecare_partners/i2ozyamncmmzsq8aqb73.jpg",
      github: "https://github.com/garvittsoni",
    },
    {
      name: "Sparsh Singhal",
      role: "Backend Developer",
      image: "https://res.cloudinary.com/dpzuoyw88/image/upload/v1787030965/IMG_4073_mbi32q.jpg",
      github: "https://github.com/",
    },
    {
      name: "Yuvraj Rajput",
      role: "UI/UX Designer",
      image: "https://via.placeholder.com/150",
      github: "https://github.com/",
    },
    {
      name: "Arpit Jain",
      role: "Database Manager",
      image: "https://via.placeholder.com/150",
      github: "https://github.com/",
    },
    {
      name: "Ankit Verma",
      role: "Frontend Manager",
      image: "https://via.placeholder.com/150",
      github: "https://github.com/",
    },
  ];

  return (
    <section className="bg-gray-100 min-h-screen pb-20 overflow-hidden">
      {/* Responsive Header */}
      <header className="bg-white px-4 sm:px-6 py-4 sm:py-5 shadow-sm flex items-center justify-between sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-green-600 transition cursor-pointer"
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-xl sm:text-2xl font-black uppercase text-[#001f3f]">
          HOME<span className="text-green-600">CARE</span>
        </h2>
        <div className="w-16 sm:w-24"></div>
      </header>

      {/* Responsive Hero Banner */}
      <div className="bg-[#072B61] py-12 sm:py-16 md:py-20 text-center text-white px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-5 uppercase tracking-wide">
          Meet Our Team
        </h1>
        <p className="text-sm sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
          The passionate minds behind HomeCare working hard to deliver the best experience.
        </p>
      </div>

      {/* Responsive Team Members Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-md p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green-500"
            >
              {/* Clean Image Container without Green Border */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 shadow-md bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#08244D]">{member.name}</h3>
              <p className="text-xs sm:text-sm font-semibold text-green-600 mt-1">{member.role}</p>

              {/* GitHub Button */}
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-green-600 transition-colors duration-300 shadow-sm"
              >
                <FaGithub className="text-base" /> GitHub Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;