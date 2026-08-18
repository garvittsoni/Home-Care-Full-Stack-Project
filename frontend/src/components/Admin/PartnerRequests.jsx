import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const PartnerRequests = () => {
  const { partners, updatePartnerStatus, deletePartner } = useContext(AppContext);
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRequests = partners.filter((item) => {
    return (
      (item.fullName?.toLowerCase().includes(search.toLowerCase()) || item.category?.toLowerCase().includes(search.toLowerCase()) || item.city?.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "All" || item.status === statusFilter)
    );
  });

  const handleApprove = async (id) => {
    try {
      const response = await updatePartnerStatus(id, "Approved");
      if (response.success) alert("Partner request approved!");
      else alert(response.message || "An error occurred during approval.");
    } catch (error) { console.error("Approve error:", error); }
  };

  const handleReject = async (id) => {
    try {
      const response = await updatePartnerStatus(id, "Rejected");
      if (response.success) alert("Partner request rejected!");
      else alert(response.message || "An error occurred while rejecting.");
    } catch (error) { console.error("Reject error:", error); }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Do you really want to delete this request?")) {
      try {
        const response = await deletePartner(id);
        if (response.success) alert("Partner request deleted!");
        else alert(response.message || "Delete error.");
      } catch (error) { console.error("Delete error:", error); }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Partner Requests</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">Review and manage partner applications.</p>
        </div>
        <div className="bg-[#10b981] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium self-start sm:self-auto">
          Total : {filteredRequests.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col md:flex-row gap-3 sm:gap-4 mb-6 md:mb-8">
        <input type="text" placeholder="Search Partner..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#10b981] text-sm sm:text-base" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#10b981] text-sm sm:text-base md:w-48">
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto w-full">
        <table className="min-w-[900px] w-full text-sm sm:text-base">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-left font-semibold text-slate-600">Partner</th>
              <th className="p-4 text-left font-semibold text-slate-600">Category</th>
              <th className="p-4 text-left font-semibold text-slate-600">City</th>
              <th className="p-4 text-left font-semibold text-slate-600">Experience</th>
              <th className="p-4 text-left font-semibold text-slate-600">Status</th>
              <th className="p-4 text-center font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 border-b">
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={item.profileImage || "https://via.placeholder.com/150"} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div>
                        <h3 className="font-semibold text-slate-800">{item.fullName}</h3>
                        <p className="text-xs text-gray-500">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 capitalize whitespace-nowrap">{item.category}</td>
                  <td className="p-4 capitalize whitespace-nowrap">{item.city}</td>
                  <td className="p-4 whitespace-nowrap">{item.experience} Years</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Pending" ? "bg-yellow-100 text-[#f59e0b]" : item.status === "Approved" ? "bg-green-100 text-[#10b981]" : "bg-red-100 text-red-600"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <button onClick={() => { setSelectedPartner(item); setIsModalOpen(true); }} className="bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg transition">View</button>
                      {item.status !== "Approved" && <button onClick={() => handleApprove(item._id)} className="bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg transition">Approve</button>}
                      {item.status !== "Rejected" && <button onClick={() => handleReject(item._id)} className="bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg transition">Reject</button>}
                      <button onClick={() => handleDeleteClick(item._id)} className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg transition">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center py-8 text-gray-500">Koi partner request nahi mili</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">Partner Details</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition text-2xl leading-none">&times;</button>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <div><p className="text-xs sm:text-sm text-gray-500">Name</p><p className="font-semibold text-slate-800">{selectedPartner.fullName}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Category</p><p className="font-semibold text-slate-800 capitalize">{selectedPartner.category}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">City</p><p className="font-semibold text-slate-800 capitalize">{selectedPartner.city}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Experience</p><p className="font-semibold text-slate-800">{selectedPartner.experience} Years</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Email</p><p className="font-semibold text-slate-800">{selectedPartner.email}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Status</p><p className="font-semibold text-slate-800">{selectedPartner.status}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PartnerRequests;