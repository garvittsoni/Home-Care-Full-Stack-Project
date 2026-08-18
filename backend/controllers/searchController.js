import Category from '../models/Category.js'; // Apne Category model ka sahi path check kar lena
import Service from '../models/Service.js';   // Apne Service model ka sahi path check kar lena

export const searchCategoriesAndServices = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query.'
      });
    }

    // Regex for case-insensitive search
    const regexQuery = { $regex: query, $options: 'i' };

    // 1. Categories mein search karo (Maan lo field ka naam 'name' hai)
    const categoryPromise = Category.find({ name: regexQuery });

    // 2. Services mein search karo (Screenshot ke hisaab se 'title' aur 'categoryName' mein)
    const servicePromise = Service.find({
      $or: [
        { title: regexQuery },
        { categoryName: regexQuery }
      ]
    });

    // Dono queries ko parallel run karne ke liye Promise.all ka use kiya hai jisse API fast chale
    const [categories, services] = await Promise.all([categoryPromise, servicePromise]);

    res.status(200).json({
      success: true,
      data: {
        categories,
        services
      }
    });
  } catch (error) {
    console.error('Search Error: ', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};