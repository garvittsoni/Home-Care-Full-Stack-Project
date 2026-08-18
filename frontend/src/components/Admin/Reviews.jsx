import { useState, useContext } from "react";
import { Search, Trash2, Star } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const Reviews = () => {
  const { reviews, deleteReview } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  const filteredReviews = reviews.filter((item) => {
    const searchLower = search.toLowerCase();
    const matchSearch = item.userName?.toLowerCase().includes(searchLower) || item.serviceName?.toLowerCase().includes(searchLower) || item.comment?.toLowerCase().includes(searchLower);
    const matchRating = ratingFilter === "All" || item.rating === Number(ratingFilter);
    return matchSearch && matchRating;
  });

  const handleDeleteClick = async (id) => {
    if (window.confirm("Do you really want to delete this review?")) {
      try {
        const response = await deleteReview(id);
        if (response.success) alert("The review got deleted!");
        else alert(response.message || "Delete error.");
      } catch (error) { console.error("Delete error:", error); }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Customer Reviews</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">Manage and monitor customer feedback.</p>
        </div>
        <div className="bg-[#10b981] text-white px-4 py-2 rounded-xl font-semibold text-sm sm:text-base self-start sm:self-auto">
          Total Reviews: {filteredReviews.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col md:flex-row gap-3 sm:gap-4 mb-6 md:mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search by customer or keywords..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border rounded-lg pl-11 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[#10b981] text-sm sm:text-base" />
        </div>
        <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#10b981] text-sm sm:text-base md:w-48">
          <option value="All">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review._id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  
                  {/* NAYA: Placeholder ki jagah UI-Avatars lagaya, aur real userImage ko priority di */}
                  <img 
                    src={review.userImage || `https://ui-avatars.com/api/?name=${review.userName}&background=random&color=fff&rounded=true`} 
                    alt={review.userName} 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border shadow-sm" 
                  />
                  
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{review.userName}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{review.serviceName}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteClick(review._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition" title="Delete Review">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={14} className={index < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">"{review.comment}"</p>

              <div className="mt-4 pt-3 border-t text-xs text-gray-400 flex justify-between items-center">
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                {review.partnerName && <span className="truncate max-w-[120px]" title={review.partnerName}>Partner: {review.partnerName}</span>}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-slate-100 shadow-sm text-gray-500">
            Koi review nahi mila.
          </div>
        )}
      </div>
    </div>
  );
};
export default Reviews;