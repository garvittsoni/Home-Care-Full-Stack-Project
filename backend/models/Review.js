import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner',
    required: true
  },
  userName: {
    type: String,
    required: true // Kyunki Clerk use kar rahe ho, user ka naam frontend se bhej denge
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);