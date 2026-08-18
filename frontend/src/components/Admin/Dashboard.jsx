import { useState, useContext } from "react";
import { Trash2, Users, Grid, Wrench, Clock } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { partners, categories, services, deletePartner } = useContext(AppContext);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    if(window.confirm("Do you really want to remove this partner?")) {
      deletePartner(id)
        .then(() => console.log("Partner deleted"))
        .catch((err) => console.error("Error:", err));
    }
  };

  const filteredPartners = partners.filter((item) =>
    item.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  );

  const realStats = [
    { id: 1, title: "Total Categories", value: categories.length, icon: Grid, border: "#3b82f6", bg: "#eff6ff", color: "#3b82f6" },
    { id: 2, title: "Total Services", value: services.length, icon: Wrench, border: "#10b981", bg: "#ecfdf5", color: "#10b981" },
    { id: 3, title: "Total Partners", value: partners.length, icon: Users, border: "#8b5cf6", bg: "#f5f3ff", color: "#8b5cf6" },
    { id: 4, title: "Pending Requests", value: partners.filter(p => p.status === 'Pending').length, icon: Clock, border: "#f59e0b", bg: "#fffbeb", color: "#f59e0b" }
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[1700px]">
        <div className="mb-6 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl lg:text-4xl">Overview Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {realStats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} style={{ borderLeftColor: item.border }} className="flex min-h-[100px] sm:min-h-[120px] items-center justify-between rounded-2xl border-l-4 bg-white p-4 sm:p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
                <div>
                  <p className="text-xs sm:text-sm text-slate-500">{item.title}</p>
                  <h2 className="mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">{item.value}</h2>
                </div>
                <div style={{ background: item.bg }} className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl">
                  {Icon && <Icon size={24} className="sm:w-[30px] sm:h-[30px]" style={{ color: item.color }} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100">
          <div className="flex flex-col gap-3 border-b p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">All Partners Directory</h2>
            <input
              type="text"
              placeholder="Search Provider..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981] lg:w-80 text-sm sm:text-base"
            />
          </div>

          <div className="overflow-x-auto w-full">
            <table className="min-w-[800px] w-full text-sm sm:text-base">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-slate-600">Provider Name</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-slate-600">Category</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-slate-600">Experience</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-slate-600">City</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-slate-600">Status</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-semibold text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.length > 0 ? (
                  filteredPartners.map((item) => (
                    <tr key={item._id} className="border-b transition hover:bg-slate-50">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* NAYA: Yahan item.image ki jagah item.profileImage kar diya */}
                          <img src={item.profileImage || "https://via.placeholder.com/150"} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" alt="" />
                          <div>
                            <p className="font-medium text-slate-800">{item.fullName}</p>
                            <p className="text-xs text-gray-500">{item.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap capitalize">{item.category}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">{item.experience} Years</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 capitalize whitespace-nowrap">{item.city}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`rounded-full px-3 py-1 text-xs sm:text-sm font-semibold ${item.status === 'Approved' ? 'bg-emerald-100 text-[#10b981]' : item.status === 'Pending' ? 'bg-yellow-100 text-[#f59e0b]' : 'bg-red-100 text-red-600'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                        <button onClick={() => handleDelete(item._id)} className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-500 hover:text-white transition">
                          <Trash2 size={16} className="sm:w-5 sm:h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={6} className="py-8 text-center text-slate-500">Koi partner nahi mila</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;