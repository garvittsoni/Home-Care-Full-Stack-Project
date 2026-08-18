import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

// Context Create kiya
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ================= STATES =================
  const [partners, setPartners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  // ================= PARTNERS LOGIC =================
  const fetchPartners = async () => {
    try {
      // NAYA CHANGE: '?status=all' add kiya taaki backend saare (Pending/Rejected bhi) bhej de
      const res = await api.get("/partners?status=all");
      setPartners(res.data.data);
    } catch (err) {
      console.error("Error fetching partners:", err);
    }
  };

  const updatePartnerStatus = async (id, status) => {
    try {
      await api.put(`/partners/${id}/status`, { status });
      // Update state
      setPartners((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item))
      );
      return { success: true };
    } catch (err) {
      console.error(`${status} update error:`, err);
      return { success: false, message: err.response?.data?.message || "Update error" };
    }
  };

  const deletePartner = async (id) => {
    try {
      await api.delete(`/partners/${id}`);
      // Remove from state
      setPartners((prev) => prev.filter((item) => item._id !== id));
      return { success: true };
    } catch (err) {
      console.error("Delete partner error:", err);
      return { success: false, message: err.response?.data?.message || "Delete error" };
    }
  };

  const editPartnerProfile = async (id, formData) => {
    try {
      await api.put(`/partners/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      fetchPartners(); // Data update hone ke baad list ko refresh kar do
      return { success: true };
    } catch (err) {
      console.error("Edit profile error:", err);
      return { success: false, message: err.response?.data?.message || "Update error" };
    }
  };

  // ================= CATEGORIES LOGIC =================
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Categories fetch error:", error);
    }
  };

  const addCategory = async (formData) => {
    try {
      await api.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchCategories(); // Nayi category aate hi list update kar do
      return { success: true };
    } catch (error) {
      console.error("Category add error:", error);
      return { success: false, message: error.response?.data?.message || "Error adding category" };
    }
  };

  const updateCategory = async (id, formData) => {
    try {
      // NAYA CHANGE: Headers add kiye taaki file upload support kare
      await api.put(`/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      fetchCategories(); 
      return { success: true };
    } catch (error) {
      console.error("Update category error:", error);
      return { success: false, message: error.response?.data?.message || "Update error" };
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((item) => item._id !== id));
      return { success: true };
    } catch (error) {
      console.error("Delete category error:", error);
      return { success: false, message: error.response?.data?.message || "Delete error" };
    }
  };

  // ================= SERVICES LOGIC =================
  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data.data);
    } catch (err) {
      console.error("Services fetch error:", err);
    }
  };

  const addService = async (formData) => {
    try {
      await api.post("/services", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      fetchServices();
      return { success: true };
    } catch (error) {
      console.error("Service add error:", error);
      return { success: false, message: error.response?.data?.message || "Error adding service" };
    }
  };

  const updateService = async (id, formData) => {
    try {
      await api.put(`/services/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      fetchServices();
      return { success: true };
    } catch (error) {
      console.error("Update service error:", error);
      return { success: false, message: error.response?.data?.message || "Update error" };
    }
  };

  const deleteService = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      setServices((prev) => prev.filter((item) => item._id !== id));
      return { success: true };
    } catch (err) {
      console.error("Delete service error:", err);
      return { success: false, message: err.response?.data?.message || "Delete error" };
    }
  };

  // ================= REVIEWS LOGIC =================
  const fetchReviews = async () => {
    try {
      const res = await api.get("/reviews");
      // As always, check kar lena ki backend 'res.data.data' bhej raha hai ya direct 'res.data'
      setReviews(res.data.data || res.data); 
    } catch (err) {
      console.error("Reviews fetch error:", err);
    }
  };

  const deleteReview = async (id) => {
    try {
      await api.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((item) => item._id !== id));
      return { success: true };
    } catch (err) {
      console.error("Delete review error:", err);
      return { success: false, message: err.response?.data?.message || "Delete error" };
    }
  };

  // Search 
  const searchServices = (searchTerm) => {
    if (!searchTerm.trim()) return;
    const term = searchTerm.toLowerCase().trim();

    const categoryMatch = categories.find(c => c.name.toLowerCase().includes(term));
    if (categoryMatch) {
      return `/subcategory/${categoryMatch.slug}`;
    }

    const serviceMatch = services.find(s => s.title.toLowerCase().includes(term));
    if (serviceMatch) {
      return `/workers/${serviceMatch.id}`;
    }

    return null;
  };

  // ================= INITIAL FETCH =================
  // Component load hote hi teeno data fetch karega
  useEffect(() => {
    fetchPartners();
    fetchCategories();
    fetchServices();
    fetchReviews();
  }, []);

  return (
    <AppContext.Provider
      value={{
        // Partners
        partners,
        fetchPartners,
        updatePartnerStatus,
        deletePartner,
        editPartnerProfile,
        // Categories
        categories,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        // Services
        services,
        fetchServices,
        addService,
        updateService,
        deleteService,
        //Review
        reviews, 
        fetchReviews, 
        deleteReview,
        // Search
        searchServices
      }}
    >
      {children}
    </AppContext.Provider>
  );
};