import Service from '../models/Service.js';
import Category from '../models/Category.js';

export const getServices = async (req, res) => {
  try {
    const { categorySlug } = req.query;
    const query = categorySlug ? { categorySlug } : {};
    
    const services = await Service.find(query);
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    console.error('Fetch Services Error: ', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, categoryName, startingPrice, status } = req.body;

    if (!title || !categoryName || startingPrice === undefined) {
      return res.status(400).json({ success: false, message: "Title, categoryName, and startingPrice are required" });
    }
    if (startingPrice < 0) {
      return res.status(400).json({ success: false, message: "Starting price cannot be negative" });
    }
    
    // NAYA CHANGE: Image check
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Service image is required" });
    }

    const trimmedTitle = title.trim();
    const trimmedCategoryName = categoryName.trim();
    const categorySlug = trimmedCategoryName.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found in database." });
    }

    const existingService = await Service.findOne({ 
      title: { $regex: new RegExp(`^${trimmedTitle}$`, "i") }, 
      categorySlug 
    });

    if (existingService) {
      return res.status(409).json({ success: false, message: "Service already exists in this category" });
    }

    const newService = new Service({
      title: trimmedTitle,
      categoryName: trimmedCategoryName,
      categorySlug, 
      startingPrice,
      icon: req.file.path, // Cloudinary URL save ho raha hai
      status: status !== undefined ? status : 'active'
    });

    const savedService = await newService.save();
    res.status(201).json({ success: true, message: "Service added successfully", data: savedService });
  } catch (error) {
    console.error("Create Service Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateService = async (req, res) => {
  try {
    const { title, categoryName, startingPrice, status } = req.body;
    let updateData = {};

    if (startingPrice !== undefined) {
      if (startingPrice < 0) return res.status(400).json({ success: false, message: "Starting price cannot be negative" });
      updateData.startingPrice = startingPrice;
    }
    if (status !== undefined) updateData.status = status;

    // NAYA CHANGE: Nayi image aayi hai toh use karo
    if (req.file) {
      updateData.icon = req.file.path;
    }

    let newTitle = undefined;
    let newCategorySlug = undefined;

    if (title && title.trim() !== "") {
      newTitle = title.trim();
      updateData.title = newTitle;
    }

    if (categoryName && categoryName.trim() !== "") {
      const trimmedCategoryName = categoryName.trim();
      newCategorySlug = trimmedCategoryName.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      
      const category = await Category.findOne({ slug: newCategorySlug });
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found in database." });
      }

      updateData.categoryName = trimmedCategoryName;
      updateData.categorySlug = newCategorySlug;
    }

    const serviceToUpdate = await Service.findById(req.params.id);
    if (!serviceToUpdate) return res.status(404).json({ success: false, message: "Service not found" });

    const checkTitle = newTitle || serviceToUpdate.title;
    const checkCategorySlug = newCategorySlug || serviceToUpdate.categorySlug;

    if (newTitle || newCategorySlug) {
      const existingService = await Service.findOne({
        title: { $regex: new RegExp(`^${checkTitle}$`, "i") },
        categorySlug: checkCategorySlug,
        _id: { $ne: req.params.id }
      });

      if (existingService) {
        return res.status(409).json({ success: false, message: "Service already exists in this category" });
      }
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ success: true, message: "Service updated successfully", data: updatedService });
  } catch (error) {
    console.error("Update Service Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });
    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete Service Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};