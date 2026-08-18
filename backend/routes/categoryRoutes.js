import express from 'express';
import { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categoryController.js';
import { upload } from '../config/cloudinary.js'; // <-- Multer import kiya

const router = express.Router();

// Route to get all categories
router.get('/', getCategories);

// Route to create a new category (upload.single lagaya taaki 'image' read ho sake)
router.post('/', upload.single('image'), createCategory);
0
router.put('/:id', upload.single('image'), updateCategory);
router.delete('/:id', deleteCategory);

export default router;