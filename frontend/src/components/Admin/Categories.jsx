import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext"; 

const Categories = () => {
  const { categories, addCategory, deleteCategory, updateCategory } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("active");
  const [editingId, setEditingId] = useState(null); 
  const [loading, setLoading] = useState(false);

  const filteredCategories = categories.filter((item) => item.name?.toLowerCase().includes(search.toLowerCase()));

  const resetForm = () => { setIsModalOpen(false); setName(""); setImage(null); setStatus("active"); setEditingId(null); };

  const handleEditClick = (item) => { setEditingId(item._id); setName(item.name); setStatus(item.status); setImage(null); setIsModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name); formData.append("status", status);
    if (image) formData.append("image", image);

    if (editingId) {
      const response = await updateCategory(editingId, formData);
      if (response.success) { alert("Category updated!"); resetForm(); }
      else alert(response.message || "Update error.");
    } else {
      if (!name || !image) { alert("Both the name and the image are important!"); setLoading(false); return; }
      const response = await addCategory(formData);
      if (response.success) { alert("Category added!"); resetForm(); }
      else alert(response.message || "Add error.");
    }
    setLoading(false);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Do you really want to delete this category?")) {
      const response = await deleteCategory(id);
      if (!response.success) alert(response.message || "Delete error!");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[1700px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Categories</h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">Manage all service categories.</p>
          </div>
          <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="w-full sm:w-auto bg-[#10b981] hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition text-sm sm:text-base">
            <Plus size={18} /> Add Category
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5 mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search Category..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-slate-200 py-2.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#10b981] text-sm sm:text-base" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="min-w-[700px] w-full text-sm sm:text-base">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-slate-600">Image</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-slate-600">Category Name</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-slate-600">Status</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-semibold text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-slate-50 transition">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <img src={item.image} alt={item.name} className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg object-cover border" />
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-slate-800 whitespace-nowrap">{item.name}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${item.status === "active" ? "bg-emerald-100 text-[#10b981]" : "bg-red-100 text-red-600"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEditClick(item)} className="bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition"><Pencil size={18} /></button>
                          <button onClick={() => handleDeleteClick(item._id)} className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-center py-8 text-gray-500">Koi category nahi mili</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5 border-b pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">{editingId ? "Edit Category" : "Add New Category"}</h2>
              <button onClick={resetForm} className="text-slate-400 hover:text-red-500 transition"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Category Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#10b981]" placeholder="e.g. Home Cleaning" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Upload Image {editingId && "(Optional)"}</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#10b981]" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#10b981]">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#10b981] hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition mt-2 disabled:opacity-50">
                {loading ? "Processing..." : editingId ? "Update Category" : "Save Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Categories;