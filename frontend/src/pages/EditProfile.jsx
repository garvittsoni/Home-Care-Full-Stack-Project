import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../context/AppContext";

import { FaRegIdCard, FaBriefcase, FaCloudUploadAlt } from "react-icons/fa";
import { FaLocationDot, FaRegImage, FaArrowRightLong, FaArrowLeft } from "react-icons/fa6";

const EditProfile = () => {
  const { id } = useParams(); // URL se provider ki ID nikalenge
  const navigate = useNavigate();
  const { categories, services, partners, editPartnerProfile } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    showWhatsapp: true,
    email: "",
    category: "",
    service: "", 
    experience: "",
    languages: "",
    visitingCharge: "",
    city: "",
    workingHours: "",
    bio: "",
    profileImage: null,
    bannerImage: null,
    gallery: [],
  });

  // Jab page load ho, toh database se purana data nikal kar form me bhar do
  useEffect(() => {
    const existingPartner = partners.find((p) => p._id === id);
    if (existingPartner) {
      setFormData({
        fullName: existingPartner.fullName || "",
        phone: existingPartner.phone || "",
        showWhatsapp: existingPartner.showWhatsapp !== false,
        email: existingPartner.email || "",
        category: existingPartner.category || "",
        service: existingPartner.service || "",
        experience: existingPartner.experience || "",
        languages: existingPartner.languages || "",
        visitingCharge: existingPartner.visitingCharge || "",
        city: existingPartner.city || "",
        workingHours: existingPartner.workingHours || "",
        bio: existingPartner.bio || "",
        profileImage: null, // Images tabhi bhejenge jab user nayi select karega
        bannerImage: null,
        gallery: [],
      });
    }
  }, [id, partners]);

  const filteredServices = services.filter(
    (srv) => srv.categoryName === formData.category
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    Swal.fire({
      title: 'Updating Profile...',
      text: 'Please wait while we save your changes.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    const submitData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "profileImage" && key !== "bannerImage" && key !== "gallery") {
        submitData.append(key, formData[key]);
      }
    });

    // Sirf tabhi append karo jab user ne nayi photo select ki ho
    if (formData.profileImage) submitData.append("profileImage", formData.profileImage);
    if (formData.bannerImage) submitData.append("bannerImage", formData.bannerImage);

    if (formData.gallery && formData.gallery.length > 0) {
      formData.gallery.forEach((file) => {
        submitData.append("gallery", file);
      });
    }

    // AppContext wala naya update function call karo
    const response = await editPartnerProfile(id, submitData);

    setIsLoading(false);
    
    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile details have been updated successfully.',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate(`/provider-profile/${id}`); // Update hone ke baad uski profile dikha do
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: response.message || 'Something went wrong. Please try again later.',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  const handlePictureChange = (e) => setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  const handleBannerChange = (e) => setFormData((prev) => ({ ...prev, bannerImage: e.target.files[0] }));
  const handleGalleryUpload = (e) => setFormData((prev) => ({ ...prev, gallery: [...e.target.files] }));

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 py-8 sm:px-6 md:px-8 lg:py-12 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white rounded-2xl md:rounded-3xl shadow-xl p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col gap-8 md:gap-10 relative"
      >
        <div>
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-500 hover:text-green-600 font-semibold text-sm transition-colors cursor-pointer mb-6"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001f3f]">Edit Your Profile</h1>
            <p className="mt-2 text-sm sm:text-base text-[#555555] max-w-2xl mx-auto">
              Update your details below to keep your profile fresh for customers.
            </p>
          </div>

          <div className="flex items-center gap-2 border-b-2 border-[#e2e8f0] pb-2 mb-5">
            <FaRegIdCard className="text-[#2ba955] text-xl md:text-2xl" />
            <h2 className="text-base sm:text-lg font-semibold text-[#001f3f]">Personal Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#001f3f]">Full Name</label>
              <input
                type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                className="mt-1.5 w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] outline-none focus:border-[#2ba955]"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-[#001f3f]">Profile Picture (Leave empty to keep old)</label>
              <input
                type="file" name="profileImage" accept="image/*" onChange={handlePictureChange}
                className="mt-1.5 w-full p-2 h-11 sm:h-12 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-[#2ba955] hover:file:bg-green-100"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-[#001f3f]">Mobile Number</label>
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                className="mt-1.5 w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] outline-none focus:border-[#2ba955]"
              />
            </div>

            <div className="w-full flex items-center gap-3 mt-2 md:mt-8">
              <input
                type="checkbox"
                name="showWhatsapp"
                id="showWhatsapp"
                checked={formData.showWhatsapp === true || formData.showWhatsapp === "true"}
                onChange={handleChange}
                className="w-5 h-5 accent-green-600 cursor-pointer"
              />
              <label htmlFor="showWhatsapp" className="text-sm font-medium text-[#001f3f] cursor-pointer">
                Show WhatsApp Chat Button on Profile
              </label>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-[#001f3f]">Email Address</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange} disabled
                className="mt-1.5 w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-gray-100 cursor-not-allowed outline-none"
              />
            </div>
            
            <div className="w-full md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-[#001f3f]">Cover/Banner Image (Leave empty to keep old)</label>
              <input
                type="file" name="bannerImage" accept="image/*" onChange={handleBannerChange}
                className="mt-1.5 w-full p-2 h-11 sm:h-12 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-[#2ba955] hover:file:bg-green-100"
              />
            </div>
          </div>
        </div>

        {/* ============================== */}
        {/* 2. PROFESSIONAL DETAILS        */}
        {/* ============================== */}
        <div>
          <div className="flex items-center gap-2 border-b-2 border-[#e2e8f0] pb-2 mb-5">
            <FaBriefcase className="text-[#2ba955] text-xl md:text-2xl" />
            <h2 className="text-base sm:text-lg font-semibold text-[#001f3f]">Professional Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#001f3f]">Service Category</label>
              <select 
                name="category" value={formData.category} onChange={handleChange} required
                className="mt-1.5 w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] outline-none focus:border-[#2ba955]" 
              >
                <option value="">Select your profession</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-[#001f3f]">Specific Service</label>
              <select 
                name="service" value={formData.service} onChange={handleChange} required
                className="mt-1.5 w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] outline-none focus:border-[#2ba955]" 
              >
                <option value="">Select a service</option>
                {filteredServices.length > 0 ? (
                  filteredServices.map((srv) => (
                    <option key={srv._id} value={srv.title}>{srv.title}</option>
                  ))
                ) : (
                  <option value="" disabled>Please select a category first</option>
                )}
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-[#001f3f]">Experience (in Years)</label>
              <input
                type="number" name="experience" value={formData.experience} onChange={handleChange} required
                className="mt-1.5 w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] outline-none focus:border-[#2ba955]"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-[#001f3f]">Languages Spoken</label>
              <input
                type="text" name="languages" value={formData.languages} onChange={handleChange} required
                className="mt-1.5 w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] outline-none focus:border-[#2ba955]"
              />
            </div>

            <div className="w-full md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-[#001f3f]">Visiting Charge (₹)</label>
              <input
                type="number" name="visitingCharge" value={formData.visitingCharge} onChange={handleChange}
                className="mt-1.5 w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] outline-none focus:border-[#2ba955]"
              />
            </div>
          </div>
        </div>

        {/* ============================== */}
        {/* 3. LOCATION & AVAILABILITY     */}
        {/* ============================== */}
        <div>
          <div className="flex items-center gap-2 border-b-2 border-[#e2e8f0] pb-2 mb-5">
            <FaLocationDot className="text-[#2ba955] text-xl md:text-2xl" />
            <h2 className="text-base sm:text-lg font-semibold text-[#001f3f]">Location & Availability</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#001f3f]">City / Area</label>
              <input
                type="text" name="city" value={formData.city} onChange={handleChange} required
                className="mt-1.5 w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] outline-none focus:border-[#2ba955]"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-[#001f3f]">Working Days & Hours</label>
              <input
                type="text" name="workingHours" value={formData.workingHours} onChange={handleChange}
                className="mt-1.5 w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] outline-none focus:border-[#2ba955]"
              />
            </div>
          </div>
        </div>

        {/* ============================== */}
        {/* 4. ABOUT & PORTFOLIO           */}
        {/* ============================== */}
        <div>
          <div className="flex items-center gap-2 border-b-2 border-[#e2e8f0] pb-2 mb-5">
            <FaRegImage className="text-[#2ba955] text-xl md:text-2xl" />
            <h2 className="text-base sm:text-lg font-semibold text-[#001f3f]">About & Portfolio</h2>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-[#001f3f]">About You (Bio)</label>
            <textarea
              name="bio" value={formData.bio} onChange={handleChange} rows="4"
              className="mt-1.5 w-full rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm sm:text-base resize-none outline-none transition-all duration-200 focus:border-[#2ba955]"
            />
          </div>
        </div>

        {/* ============================== */}
        {/* 5. GALLERY SECTION             */}
        {/* ============================== */}
        <div>
          <label className="block text-sm font-medium text-[#001f3f] mb-2">
            Upload New Gallery (Will overwrite old images)
          </label>
          <label
            htmlFor="gallery"
            className="relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#dbe4ee] bg-[#f8fafc] py-8 sm:py-10 transition hover:border-[#2ba955] hover:bg-[#f3faf5]"
          >
            <FaCloudUploadAlt className="text-4xl sm:text-5xl text-[#2ba955]" />
            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-[#001f3f]">Select new images to replace old ones</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">Leave empty to keep existing gallery.</p>
            <input
              id="gallery" type="file" accept="image/*" multiple onChange={handleGalleryUpload}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>
          {formData.gallery.length > 0 && (
            <p className="text-sm text-[#2ba955] mt-2 font-medium">
              {formData.gallery.length} new image(s) selected
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full h-12 sm:h-14 mt-2 rounded-xl text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#001f3f] hover:bg-[#2ba955] shadow-lg hover:shadow-xl hover:-translate-y-1"
          }`}
        >
          {isLoading ? "Saving Changes..." : "Update Profile"}
          {!isLoading && <FaArrowRightLong className="text-lg" />}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;