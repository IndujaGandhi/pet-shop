import mongoose from 'mongoose';

// Product Schema with comprehensive pet shop details
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide a category'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
    min: 0,
  },
  image: {
    type: String,
    required: [true, 'Please provide a product image'],
  },
  images: [
    {
      type: String,
    },
  ],
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    default: 0,
    min: 0,
  },
  sku: {
    type: String,
    unique: true,
    required: [true, 'Please provide a SKU'],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      userName: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  specifications: {
    petType: String, // Dog, Cat, Bird, Fish, Rabbit, etc.
    age: String,
    size: String,
    color: String,
    material: String,
  },
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

export default mongoose.model('Product', productSchema);
