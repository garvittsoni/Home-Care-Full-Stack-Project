import express from 'express';
import { searchCategoriesAndServices } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchCategoriesAndServices);

export default router;