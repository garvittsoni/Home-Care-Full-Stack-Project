import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true 
  },
  categorySlug: {
    type: String, 
    required: true 
  },
  icon: {
    type: String, 
    default: "FaTools" 
  },
  startingPrice: {
    type: Number,
    required: true,
    min: 0 // Negative price block
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5 // Over-rating block
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);