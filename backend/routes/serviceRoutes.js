import express from 'express';
import { getServices, createService, updateService, deleteService} from '../controllers/serviceController.js';
import { upload } from '../config/cloudinary.js'; // Multer import kiya

const router = express.Router();

router.get('/', getServices);
router.post('/', upload.single('image'), createService); // POST pe Multer
router.put('/:id', upload.single('image'), updateService); // PUT pe Multer
router.delete('/:id', deleteService);

export default router;