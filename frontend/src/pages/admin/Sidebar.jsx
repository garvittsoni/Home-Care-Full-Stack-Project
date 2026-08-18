import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaList,
  FaTools,
  FaUserCheck,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import { FaGauge } from "react-icons/fa6";

const Sidebar = ({ closeSidebar }) => {
  return (
    // 'fixed' hata diya kyunki wo layout component handle kar raha hai
    <aside className="w-64 h-full bg-[#1f2937] text-white p-6 flex flex-col shadow-xl overflow-y-auto">
      
      <h1 className="text-2xl font-bold flex gap-2 justify-center items-center border-b-2 border-[#334155] pb-5 w-full mb-8 hidden md:flex">
        <FaGauge />
        HOME <span className="text-[#10b981]">ADMIN</span>
      </h1>

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink
          to="/admin"
          end
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive ? "bg-[#10b981] text-white" : "hover:bg-[#374151]"
            }`
          }
        >
          <FaHome /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/categories"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive ? "bg-[#10b981] text-white" : "hover:bg-[#374151]"
            }`
          }
        >
          <FaList /> Categories
        </NavLink>

        <NavLink
          to="/admin/services"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive ? "bg-[#10b981] text-white" : "hover:bg-[#374151]"
            }`
          }
        >
          <FaTools /> Services
        </NavLink>

        <NavLink
          to="/admin/partner-requests"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive ? "bg-[#10b981] text-white" : "hover:bg-[#374151]"
            }`
          }
        >
          <FaUserCheck /> Partner Requests
        </NavLink>

        <NavLink
          to="/admin/reviews"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive ? "bg-[#10b981] text-white" : "hover:bg-[#374151]"
            }`
          }
        >
          <FaStar /> Reviews
        </NavLink>
      </nav>

      <div className="mt-auto border-t-2 border-[#334155] pt-5">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-[#374151]"
        >
          <FaArrowRight className="bg-[#10b981] text-white h-8 w-8 p-2 rounded-lg" /> 
          Back To Website
        </NavLink>
      </div>

    </aside>
  );
};

export default Sidebar;