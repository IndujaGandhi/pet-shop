import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Create order
export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Please provide shipping address',
      });
    }

    // Calculate totals and check stock
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const itemPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
      subtotal += itemPrice * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: itemPrice,
        quantity: item.quantity,
        image: product.image,
      });

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Calculate tax (10%)
    const tax = subtotal * 0.1;
    const shippingCost = 50; // Fixed shipping cost
    const total = subtotal + tax + shippingCost;

    // Create order
    const order = await Order.create({
      user: req.user.userId,
      items: orderItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shippingCost,
      total,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

// Get user orders
export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product', 'name image')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// Get order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name image price')
      .populate('user', 'firstName lastName email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check authorization
    if (order.user._id.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order',
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel order (only if pending)
export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check authorization
    if (order.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (order.orderStatus !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending orders can be cancelled',
      });
    }

    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    // Update order status
    order.orderStatus = 'cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};
