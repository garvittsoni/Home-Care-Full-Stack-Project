import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true 
  },
  subtitle: {
    type: String, 
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Admin ki spelling mistakes block
    default: "active" 
  }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);