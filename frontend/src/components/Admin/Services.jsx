import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Services = () => {
  const { services, categories, addService, deleteService, updateService } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("active");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredServices = services.filter((service) =>
    service.title?.toLowerCase().includes(search.toLowerCase()) || service.categoryName?.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => { setIsModalOpen(false); setTitle(""); setCategoryName(""); setStartingPrice(""); setImage(null); setStatus("active"); setEditingId(null); };

  const handleEditClick = (item) => { setEditingId(item._id); setTitle(item.title); setCategoryName(item.categoryName); setStartingPrice(item.startingPrice); setImage(null); setStatus(item.status); setIsModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title); formData.append("categoryName", categoryName); formData.append("startingPrice", startingPrice); formData.append("status", status);
    if (image) formData.append("image", image);

    if (editingId) {
      const response = await updateService(editingId, formData);
      if (response.success) { alert("Service updated!"); resetForm(); }
      else alert(response.message || "Update error!");
    } else {
      if (!image) { alert("Uploading a service image is mandatory!"); setLoading(false); return; }
      const response = await addService(formData);
      if (response.success) { alert("Service added!"); resetForm(); }
      else alert(response.message || "Add error!");
    }
    setLoading(false);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Do you really want to delete this service?")) {
      const response = await deleteService(id);
      if (!response.success) alert(response.message || "Delete error!");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Services</h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1">Manage all available services.</p>
        </div>
        <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="w-full sm:w-auto bg-[#10b981] hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition text-sm sm:text-base">
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5 mb-6 md:mb-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search Service..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border rounded-lg py-2.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#10b981] text-sm sm:text-base" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto w-full">
        <table className="min-w-[800px] w-full text-sm sm:text-base">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-left font-semibold text-slate-600">Image</th>
              <th className="p-4 text-left font-semibold text-slate-600">Title</th>
              <th className="p-4 text-left font-semibold text-slate-600">Category</th>
              <th className="p-4 text-left font-semibold text-slate-600">Start Price</th>
              <th className="p-4 text-left font-semibold text-slate-600">Status</th>
              <th className="p-4 text-center font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 border-b">
                  <td className="p-4 whitespace-nowrap">
                    <img src={item.icon} alt={item.title} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg border" onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} />
                  </td>
                  <td className="p-4 font-semibold text-slate-800 whitespace-nowrap">{item.title}</td>
                  <td className="p-4 capitalize whitespace-nowrap">{item.categoryName}</td>
                  <td className="p-4 whitespace-nowrap">₹{item.startingPrice}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${item.status === "active" ? "bg-emerald-100 text-[#10b981]" : "bg-red-100 text-red-600"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEditClick(item)} className="bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition"><Pencil size={18} /></button>
                      <button onClick={() => handleDeleteClick(item._id)} className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center py-8 text-gray-500">Koi service nahi mili</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5 border-b pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">{editingId ? "Edit Service" : "Add New Service"}</h2>
              <button onClick={resetForm} className="text-slate-400 hover:text-red-500 transition"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Service Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#10b981]" placeholder="e.g. Sofa Dry Cleaning" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Select Category</label>
                <select required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#10b981]">
                  <option value="" disabled>Category select karo</option>
                  {categories.map((cat) => (<option key={cat._id} value={cat.name}>{cat.name}</option>))}
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Upload Image {editingId && "(Optional)"}</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#10b981]" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Starting Price (₹)</label>
                <input type="number" required min="0" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#10b981]" placeholder="e.g. 499" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#10b981]">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#10b981] hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition mt-2 disabled:opacity-50">
                {loading ? "Processing..." : editingId ? "Update Service" : "Save Service"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Services;