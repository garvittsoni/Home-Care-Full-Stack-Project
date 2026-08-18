import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import api from "../utils/api";
import { 
  FaArrowLeft, FaCircleCheck, FaStar, FaAward, 
  FaBriefcase, FaImage, FaLocationDot, 
  FaClock, FaLanguage, FaTruckFast, FaPhone, FaEnvelope, FaPenToSquare,
  FaWhatsapp // <--- NAYA: WhatsApp Icon import kiya
} from "react-icons/fa6";
import { useAuth } from "@clerk/clerk-react"; 

const ProviderCard = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { partners } = useContext(AppContext);
  
  const { isLoaded, isSignedIn, getToken } = useAuth(); 

  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [reviewForm, setReviewForm] = useState({
    userName: "",
    rating: 5,
    comment: ""
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      if (!Swal.isVisible()) {
        Swal.fire({
          icon: 'warning',
          title: 'Login Required',
          text: 'You need to login to view provider profiles.',
          confirmButtonColor: '#27a14e',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/', { replace: true }); 
          }
        });
      }
    }
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    const fetchProviderReviews = async () => {
      try {
        if (providerId) {
          const res = await api.get(`/reviews/${providerId}`);
          if (res.data.success) {
            setReviews(res.data.data);
          }
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchProviderReviews();
  }, [providerId]);

  if (isLoaded && !isSignedIn) {
    return <div className="min-h-screen bg-[#f4f6f9]"></div>;
  }

  if (!isLoaded || partners.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9]">
        <div className="text-lg font-bold text-emerald-600 animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  const worker = partners.find(p => p._id === providerId);

  if (!worker) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f4f6f9]">
      <h2 className="text-2xl font-bold text-gray-800">Worker Not Found</h2>
      <button onClick={() => navigate(-1)} className="text-green-600 font-semibold underline cursor-pointer">Go back</button>
    </div>
  );

  // ================= NAYA: WhatsApp Link Logic =================
  let whatsappNumber = "";
  if (worker.phone) {
    // Number me se space, dash, bracket sab hata do (sirf numbers rakho)
    let cleanedNumber = worker.phone.replace(/\D/g, '');
    
    // Agar 10 digit ka number hai, toh India ka code (91) aage laga do
    if (cleanedNumber.length === 10) {
      whatsappNumber = `91${cleanedNumber}`;
    } else {
      whatsappNumber = cleanedNumber;
    }
  }
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  // =============================================================

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      Swal.fire({ icon: 'warning', title: 'Login Required', text: 'Please login first to submit a review!' });
      return;
    }
    try {
      const token = await getToken();
      const res = await api.post("/reviews", {
        partnerId: providerId,
        userName: reviewForm.userName,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment
      }, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.data.success) {
        Swal.fire({ icon: 'success', title: 'Review Added!', timer: 2000, showConfirmButton: false });
        setReviews(prev => [res.data.data, ...prev]);
        setIsReviewModalOpen(false);
        setReviewForm({ userName: "", rating: 5, comment: "" });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Server Error', text: error.response?.data?.message || 'Could not submit review.' });
    }
  };

  const getBannerImage = () => {
    if (worker.bannerImage) return worker.bannerImage;
    const category = (worker.category || worker.service || "").toLowerCase();
    if (category.includes("electric")) return "https://images.unsplash.com/photo-1621905252507-b35492d90cb4?auto=format&fit=crop&w=1200&q=80";
    if (category.includes("plumb")) return "https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=1200&q=80";
    if (category.includes("clean")) return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80";
    if (category.includes("repair")) return "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=1200&q=80";
    if (category.includes("paint")) return "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80";
    if (category.includes("medical") || category.includes("care")) return "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80";
    return "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80";
  };

  return (
    <div className="bg-[#f4f6f9] min-h-screen pb-12 font-sans relative">
      <header className="bg-white px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="text-gray-600 font-semibold text-sm flex items-center gap-2 hover:text-green-600 cursor-pointer transition-colors">
          <FaArrowLeft /> Back to List
        </button>
        <div className="text-2xl font-black text-[#001f3f] uppercase tracking-wide">
          HOME<span className="text-green-600">CARE</span>
        </div>
        <div className="w-20"></div>
      </header>

      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          
          <div 
            className="h-48 md:h-56 bg-cover bg-center"
            style={{ backgroundImage: `url('${getBannerImage()}')` }}
          ></div>

          <div className="flex flex-col md:flex-row items-center md:items-end justify-between px-6 md:px-10 pb-6 relative -mt-16 md:-mt-20 gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 text-center md:text-left">
              <img 
                src={worker.profileImage || "https://ui-avatars.com/api/?name=Provider&background=random"} 
                alt={worker.fullName} 
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md bg-gray-200 shrink-0 relative z-10"
              />
              <div className="mb-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center justify-center md:justify-start gap-2">
                  {worker.fullName} <FaCircleCheck className="text-blue-500 text-xl" />
                </h1>
                <p className="text-green-600 font-bold text-sm md:text-base mt-1">{worker.service || worker.category}</p>
              </div>
            </div>

            {/* NAYA: Buttons container (WhatsApp + Review) */}
            <div className="flex items-center gap-3 z-10">
              
              {/* NAYA CONDITION: Agar true (ya default undefined) hai, tabhi dikhao */}
              {worker.showWhatsapp !== false && (
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold px-4 py-2.5 rounded-xl shadow transition cursor-pointer flex items-center gap-2 text-sm"
                >
                  <FaWhatsapp className="text-lg" /> Chat
                </a>
              )}

              <button 
                onClick={() => setIsReviewModalOpen(true)}
                className="bg-[#001f3f] hover:bg-blue-900 text-white font-semibold px-4 py-2.5 rounded-xl shadow transition cursor-pointer flex items-center gap-2 text-sm"
              >
                <FaPenToSquare /> Review
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:justify-start gap-6 md:gap-16 px-6 md:px-10 py-6 border-y border-gray-100 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl shrink-0">
                <FaStar />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{worker.rating || "New"}/5</h4>
                <p className="text-xs text-gray-500 mt-1">{reviews.length} Reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl shrink-0">
                <FaAward />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{worker.experience} Years</h4>
                <p className="text-xs text-gray-500 mt-1">Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl shrink-0">
                <FaBriefcase />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 truncate max-w-[150px]">{worker.service || "Expert"}</h4>
                <p className="text-xs text-gray-500 mt-1">Specialization</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 px-6 md:px-10 py-8">
            <div className="flex-[1.5]">
              <h3 className="text-lg font-bold text-[#001f3f] mb-4">About Professional</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">{worker.bio || "No bio provided."}</p>

              <h3 className="text-lg font-bold text-[#001f3f] mb-4 flex items-center gap-2">
                <FaImage className="text-gray-500" /> Previous Work Gallery
              </h3>
              
              <div className="grid grid-cols-3 gap-3 mb-8">
                {worker.gallery && worker.gallery.length > 0 ? (
                  worker.gallery.map((imgUrl, index) => (
                    <img 
                      key={index} 
                      src={imgUrl} 
                      alt={`Work ${index + 1}`} 
                      onClick={() => setSelectedImage(imgUrl)}
                      className="w-full h-24 object-cover rounded-lg bg-gray-200 cursor-pointer hover:opacity-80 transition shadow-sm hover:shadow-md" 
                    />
                  ))
                ) : (
                  <p className="col-span-3 text-sm text-gray-500">No gallery images available.</p>
                )}
              </div>

              <h3 className="text-lg font-bold text-[#001f3f] mb-4">Customer Reviews</h3>
              <div className="space-y-3">
                {reviews.length > 0 ? (
                  reviews.map((rev, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-gray-800 text-sm">{rev.userName}</h4>
                        <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                          <FaStar /> {rev.rating} / 5
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#001f3f] mb-5">Contact & Info</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-4">
                  <FaPhone className="text-[#001f3f] text-base mt-1 shrink-0" />
                  <span><strong className="text-gray-900 block mb-1">Phone:</strong> {worker.phone || "Not provided"}</span>
                </li>

                {/* NAYA CONDITION: WhatsApp detail list me */}
                {worker.showWhatsapp !== false && (
                  <li className="flex items-start gap-4">
                    <FaWhatsapp className="text-[#25D366] text-xl shrink-0" />
                    <span>
                      <strong className="text-gray-900 block mb-1">WhatsApp:</strong> 
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium">
                        Message Now
                      </a>
                    </span>
                  </li>
                )}

                <li className="flex items-start gap-4">
                  <FaEnvelope className="text-[#001f3f] text-base mt-1 shrink-0" />
                  <span><strong className="text-gray-900 block mb-1">Email:</strong> {worker.email || "Not provided"}</span>
                </li>
                <li className="flex items-start gap-4">
                  <FaLocationDot className="text-[#001f3f] text-base mt-1 shrink-0" />
                  <span><strong className="text-gray-900 block mb-1">Location:</strong> {worker.city}</span>
                </li>
                <li className="flex items-start gap-4">
                  <FaClock className="text-[#001f3f] text-base mt-1 shrink-0" />
                  <span><strong className="text-gray-900 block mb-1">Working Hours:</strong> {worker.workingHours || "Mon - Sat (9 AM - 7 PM)"}</span>
                </li>
                <li className="flex items-start gap-4">
                  <FaLanguage className="text-[#001f3f] text-base mt-1 shrink-0" />
                  <span><strong className="text-gray-900 block mb-1">Speaks:</strong> {worker.languages}</span>
                </li>
                <li className="flex items-start gap-4">
                  <FaTruckFast className="text-[#001f3f] text-base mt-1 shrink-0" />
                  <span><strong className="text-gray-900 block mb-1">Visiting Charge:</strong> ₹{worker.visitingCharge}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Rate & Review {worker.fullName}</h3>
            <p className="text-xs text-gray-500 mb-5">Share your experience with this professional.</p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                <input type="text" name="userName" required value={reviewForm.userName} onChange={handleReviewChange} placeholder="Enter your name" className="w-full h-11 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Rating (1 to 5)</label>
                <select name="rating" value={reviewForm.rating} onChange={handleReviewChange} className="w-full h-11 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-600 bg-white">
                  <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value="4">⭐⭐⭐⭐ (4/5)</option>
                  <option value="3">⭐⭐⭐ (3/5)</option>
                  <option value="2">⭐⭐ (2/5)</option>
                  <option value="1">⭐ (1/5)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Review Comments</label>
                <textarea name="comment" required rows="3" value={reviewForm.comment} onChange={handleReviewChange} placeholder="Write your review here..." className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-600 resize-none" />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsReviewModalOpen(false)} className="flex-1 py-3 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer text-sm">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition cursor-pointer text-sm shadow">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setSelectedImage(null)} 
        >
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-8 text-white/70 hover:text-white text-4xl cursor-pointer transition-colors z-[101]"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          
          <img 
            src={selectedImage} 
            alt="Work Fullscreen" 
            className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

    </div>
  );
};

export default ProviderCard;