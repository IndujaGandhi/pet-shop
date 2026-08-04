import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

// ============== PRODUCT MANAGEMENT ==============

// Create product (Admin only)
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, category, price, discountPrice, sku, stock, specifications, tags } = req.body;

    // Validation
    if (!name || !description || !category || !price || !sku || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'SKU already exists',
      });
    }

    // Check if image is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a product image',
      });
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      discountPrice: discountPrice || 0,
      image: `/uploads/${req.file.filename}`,
      sku,
      stock,
      specifications: specifications ? JSON.parse(specifications) : {},
      tags: tags ? JSON.parse(tags) : [],
      createdBy: req.user.userId,
    });

    // Populate category before sending response
    await product.populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Update product (Admin only)
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, discountPrice, stock, specifications, tags, isFeatured } = req.body;

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (stock !== undefined) product.stock = stock;
    if (specifications) product.specifications = JSON.parse(specifications);
    if (tags) product.tags = JSON.parse(tags);
    if (isFeatured !== undefined) product.isFeatured = isFeatured;

    // Update image if uploaded
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    product.updatedAt = new Date();
    product = await product.save();

    await product.populate('category', 'name slug');

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Delete product (Admin only)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ============== CATEGORY MANAGEMENT ==============

// Create category (Admin only)
export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category name',
      });
    }

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    next(error);
  }
};

// Update category (Admin only)
export const updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    let category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category,
    });
  } catch (error) {
    next(error);
  }
};

// Delete category (Admin only)
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ============== ORDER MANAGEMENT ==============

// Get all orders (Admin only)
export const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let query = {};
    if (status) query.orderStatus = status;

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate('user', 'firstName lastName email phone')
      .populate('items.product', 'name price')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: status,
        trackingNumber: trackingNumber || order?.trackingNumber,
        updatedAt: new Date(),
        ...(status === 'delivered' && { deliveredAt: new Date() }),
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

// ============== ANALYTICS ==============

// Get dashboard stats (Admin only)
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const recentOrders = await Order.find()
      .sort('-createdAt')
      .limit(5)
      .populate('user', 'firstName lastName email');

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};
