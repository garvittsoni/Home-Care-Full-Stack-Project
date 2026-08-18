import Review from '../models/Review.js';
import Partner from '../models/Partner.js';

// POST: Naya review add karna aur Partner ki average rating update karna
export const addReview = async (req, res) => {
  try {
    const { partnerId, userName, rating, comment } = req.body;

    // 1. Naya review save karo
    const newReview = new Review({ partnerId, userName, rating, comment });
    await newReview.save();

    // 2. Us partner ke saare reviews database se uthao
    const allReviews = await Review.find({ partnerId });

    // 3. Average rating calculate karo (Math logic)
    const totalRating = allReviews.reduce((acc, item) => acc + item.rating, 0);
    const averageRating = (totalRating / allReviews.length).toFixed(1); // jaise 4.5

    // 4. Partner model mein ye naya average aur total count update kar do
    await Partner.findByIdAndUpdate(partnerId, { 
      rating: averageRating, 
      reviewsCount: allReviews.length 
    });

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: newReview
    });
  } catch (error) {
    console.error('Add Review Error: ', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET: Kisi specific partner ke saare reviews laana
export const getPartnerReviews = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const reviews = await Review.find({ partnerId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('Fetch Reviews Error: ', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET: Saare reviews laana (Admin Panel ke liye)
export const getAllReviews = async (req, res) => {
  try {
    // populate ka use karke hum partner ka naam bhi sath mein fetch kar lenge
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate('partnerId', 'fullName');

    // Frontend ke format ke hisaab se partnerName set kar dete hain
    const formattedReviews = reviews.map(review => ({
      ...review._doc,
      partnerName: review.partnerId ? review.partnerId.fullName : 'Unknown Partner'
    }));

    res.status(200).json({
      success: true,
      count: formattedReviews.length,
      data: formattedReviews
    });
  } catch (error) {
    console.error('Fetch All Reviews Error: ', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE: Review delete karna
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Note: Partner ki overall rating wapas recalculate karne ka logic yahan daal sakte ho future mein,
    // abhi ke liye UI theek chalane ke liye simple delete lagaya hai.
    
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete Review Error: ', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};