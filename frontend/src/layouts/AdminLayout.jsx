import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/admin/Sidebar";
import { Menu, X } from "lucide-react"; // Hamburger icons ke liye

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Mobile Top Header - Sirf choti screen par dikhega */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1f2937] text-white px-4 flex justify-between items-center z-50 shadow-md">
        <h1 className="text-xl font-bold flex gap-2 items-center">
          HOME <span className="text-[#10b981]">ADMIN</span>
        </h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay (Background dark karne ke liye) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar ko prop pass kiya taaki link click karne par mobile menu band ho jaye */}
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      {/* NAYA: Mobile par top padding (pt-20) di hai taaki content header ke neeche na chhupe */}
      <main className="flex-1 md:ml-64 p-4 pt-20 md:pt-8 md:p-8 bg-gray-100 min-h-screen w-full overflow-x-hidden">
        <Outlet />
      </main>
      
    </div>
  );
};

export default AdminLayout;