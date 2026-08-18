import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    profileImage: { type: String, required: true },
    bannerImage: { type: String },
    phone: { type: String, required: true },
    showWhatsapp: { type: Boolean, default: true },
    email: { type: String },
    category: { type: String, required: true },
    service: { type: String, required: true },
    experience: { type: Number },
    languages: { type: String },
    visitingCharge: { type: Number },
    city: { type: String, required: true },
    workingHours: { type: String },
    bio: { type: String },
    gallery: [{ type: String }],
    status: { type: String, default: 'Pending' },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Partner', partnerSchema);