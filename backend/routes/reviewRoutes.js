import express from 'express';
import { 
  addReview, 
  getPartnerReviews, 
  getAllReviews, 
  deleteReview 
} from '../controllers/reviewController.js';
// NAYA: Apne middleware ka sahi path de dena
import { protect } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

// Saare reviews fetch karne ke liye
router.get('/', getAllReviews);

// POST: Naya review post karne ke liye (Yahan protect lagaya hai)
router.post('/', protect, addReview);

// GET: Kisi specific partner ke reviews dekhne ke liye
router.get('/:partnerId', getPartnerReviews);

// Review delete karne ke liye (Chaho toh yahan bhi 'protect' laga sakte ho admin ke liye)
router.delete('/:id', deleteReview);

export default router;