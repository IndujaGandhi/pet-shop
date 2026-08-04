import Product from '../models/Product.js';
import Category from '../models/Category.js';

// Get all products with filters
export const getProducts = async (req, res, next) => {
  try {
    const { 
      category, 
      priceMin, 
      priceMax, 
      search, 
      sort = '-createdAt',
      page = 1,
      limit = 12
    } = req.query;

    let query = { isActive: true };

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price range filter
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = parseInt(priceMin);
      if (priceMax) query.price.$lte = parseInt(priceMax);
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get single product
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('reviews.userId', 'firstName lastName');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Get featured products
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true })
      .populate('category', 'name slug')
      .limit(8)
      .sort('-rating');

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// Get related products
export const getRelatedProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { limit = 4 } = req.query;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Find related products in same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: id },
      isActive: true,
    })
      .populate('category', 'name slug')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      products: relatedProducts,
    });
  } catch (error) {
    next(error);
  }
};

// Add product review (Admin only)
export const addReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a rating',
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const user = await User.findById(req.user.userId);

    // Add review
    product.reviews.push({
      userId: req.user.userId,
      userName: `${user.firstName} ${user.lastName}`,
      rating: parseInt(rating),
      comment,
    });

    // Calculate average rating
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = (totalRating / product.reviews.length).toFixed(1);
    product.numberOfReviews = product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};
