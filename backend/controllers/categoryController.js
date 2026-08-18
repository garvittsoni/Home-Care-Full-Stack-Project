import Category from '../models/Category.js';
import Service from '../models/Service.js';

// GET: Saari categories lana
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    console.error('Fetch Categories Error: ', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// POST: Nayi category add karna
export const createCategory = async (req, res) => {
  try {
    const { name, status } = req.body; 

    // Safety Check 1: Agar name nahi aaya
    if (!name) {
      return res.status(400).json({ success: false, message: 'It is mandatory to provide a category name.' });
    }

    // Safety Check 2: Agar image upload nahi hui
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Uploading a category image is mandatory.' });
    }

    // 1. Name se automatic slug generate karna 
    const slug = name.toLowerCase().trim().replace(/\s+/g, '-');
    const imageUrl = req.file.path; // Ab hum sure hain ki file aayi hai

    const newCategory = new Category({
      name,
      slug, 
      image: imageUrl,
      status: status || 'active',
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: savedCategory
    });
  } catch (error) {
    console.error('Create Category Error: ', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// PUT: Category ko update karna
export const updateCategory = async (req, res) => {
  try {
    const { name, subtitle, status } = req.body;
    let updateData = {};

    if (subtitle !== undefined) updateData.subtitle = subtitle.trim();
    if (status !== undefined) updateData.status = status;

    // NAYA CHANGE: Agar user ne nayi file (image) upload ki hai
    if (req.file) {
      updateData.image = req.file.path; 
    }

    let oldSlug = null;
    let newSlug = null;
    let newName = null;

    if (name && name.trim() !== "") {
      newName = name.trim();
      newSlug = newName.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

      const existingCategory = await Category.findOne({ 
        slug: newSlug, 
        _id: { $ne: req.params.id } 
      });

      if (existingCategory) {
        return res.status(409).json({ success: false, message: "Category with this name already exists" });
      }

      const categoryToUpdate = await Category.findById(req.params.id);
      if (!categoryToUpdate) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
      oldSlug = categoryToUpdate.slug;

      updateData.name = newName;
      updateData.slug = newSlug;
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    if (oldSlug && newSlug && oldSlug !== newSlug) {
      await Service.updateMany(
        { categorySlug: oldSlug },
        { categorySlug: newSlug, categoryName: newName }
      );
    }

    res.status(200).json({ success: true, message: "Category updated successfully", data: updatedCategory });
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE: Category ko delete karna
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const serviceCount = await Service.countDocuments({ categorySlug: category.slug });
    
    if (serviceCount > 0) {
      return res.status(409).json({ 
        success: false, 
        message: `Category contains services. Please delete the ${serviceCount} service(s) inside it first.` 
      });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};