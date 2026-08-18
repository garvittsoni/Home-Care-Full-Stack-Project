import express from 'express';
import { getAuth } from '@clerk/express'; // Naya Clerk function import kiya
import {
  registerPartner,
  getAllPartners,
  updatePartnerStatus,
  deletePartner,
  updatePartnerProfile
} from '../controllers/partnerController.js';
import { upload } from '../config/cloudinary.js';
import Partner from '../models/Partner.js';

const router = express.Router();

router.post(
  '/register',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
    { name: 'gallery', maxCount: 5 },
  ]),
  registerPartner
);

// 🌍 PUBLIC ROUTE: Sabko list dikhegi
router.get('/', getAllPartners);

// 🔒 SECURE ROUTE: getAuth() se manually lock lagaya hai
router.get('/:id', async (req, res) => {
  try {
    // Clerk se user ki auth detail nikalna
    const auth = getAuth(req);

    // Agar user logged in nahi hai (userId nahi mili), toh yahin se bahar nikal do
    if (!auth.userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized - Login is required to view partner details.' 
      });
    }

    // Agar user logged in hai, toh database se partner dhoondho
    const partner = await Partner.findById(req.params.id);
    
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    console.error('Fetch Partner Details Error: ', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

router.put('/:id/status', updatePartnerStatus);
router.delete('/:id', deletePartner);

router.put(
  '/:id',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
    { name: 'gallery', maxCount: 5 },
  ]),
  updatePartnerProfile
);
export default router;