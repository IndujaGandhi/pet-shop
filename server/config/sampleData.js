import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import connectDB from './database.js';

dotenv.config();

const hdImage = (photoId, width = 900, height = 900) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

const productPhotoSet = {
  dogFood: [
    'https://tse2.mm.bing.net/th/id/OIP.LNHihSdMDQhCIz7atLvVbgHaE8?r=0&pid=ImgDet&w=184&h=122&c=7&dpr=1.3&o=7&rm=3',
  ],
  catToy: [
    'https://tse4.mm.bing.net/th/id/OIP.k77ySzh3CpqxfxQ8zXyKmAHaEJ?r=0&pid=ImgDet&w=184&h=103&c=7&dpr=1.3&o=7&rm=3',
  ],
  grooming: [
    'https://i.pinimg.com/originals/32/36/24/32362453ed964fd1e35b3b7e14de1d2d.jpg',
  ],
  fish: [
    'https://loremflickr.com/900/900/aquarium,filter?lock=401',
    'https://loremflickr.com/900/900/fish-tank,aquarium?lock=402',
    'https://loremflickr.com/900/900/aquarium-equipment?lock=403',
  ],
  bird: [
    'https://preview.free3d.com/img/2017/05/1749539895279355903/swfb92u1.jpg',
  ],
  dogTreat: [
    'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&h=1200&q=90',
  ],
  catSupplies: [
    'https://loremflickr.com/900/900/cat-litter-box,pet-supplies?lock=701',
    'https://loremflickr.com/900/900/cat-litter,cat-supplies?lock=702',
    'https://loremflickr.com/900/900/cat,pet-supplies?lock=703',
  ],
  rabbit: [
    'https://loremflickr.com/900/900/rabbit-hutch,small-animal?lock=801',
    'https://loremflickr.com/900/900/rabbit,wooden-hutch?lock=802',
    'https://loremflickr.com/900/900/rabbit-house,pet?lock=803',
  ],
};

// Sample products for database seeding
export const sampleProducts = [
  {
    name: 'Premium Dog Food',
    description: 'High-quality dog food with all essential nutrients for a healthy diet. Contains chicken, rice, and vegetables.',
    category: 'dog-food',
    price: 45.99,
    discountPrice: 35.99,
    sku: 'DOG-FOOD-001',
    stock: 100,
    image: productPhotoSet.dogFood[0],
    images: productPhotoSet.dogFood,
    specifications: {
      petType: 'Dog',
      size: '15 kg',
      age: 'All ages',
      ingredients: 'Chicken, Rice, Vegetables'
    },
    tags: ['dog', 'food', 'premium'],
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Cat Scratching Post',
    description: 'Multi-level scratching post perfect for cats to climb, play, and sharpen their claws. Made with natural sisal rope.',
    category: 'cat-toys',
    price: 79.99,
    discountPrice: 59.99,
    sku: 'CAT-SCRATCH-001',
    stock: 45,
    image: productPhotoSet.catToy[0],
    images: productPhotoSet.catToy,
    specifications: {
      petType: 'Cat',
      material: 'Sisal Rope & Plywood',
      height: '150 cm',
      color: 'Beige'
    },
    tags: ['cat', 'toy', 'scratching'],
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Pet Grooming Kit',
    description: 'Complete grooming kit with brushes, clippers, and scissors for all pet types. Professional quality tools.',
    category: 'grooming',
    price: 65.00,
    discountPrice: 49.00,
    sku: 'GROOM-KIT-001',
    stock: 60,
    image: productPhotoSet.grooming[0],
    images: productPhotoSet.grooming,
    specifications: {
      petType: 'All pets',
      material: 'Stainless Steel',
      items: '8 pieces',
      color: 'Silver'
    },
    tags: ['grooming', 'tool', 'pet-care'],
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Aquarium Filter System',
    description: 'Advanced multi-stage filtration system for keeping fish tank water clean and healthy.',
    category: 'fish-equipment',
    price: 89.99,
    discountPrice: 0,
    sku: 'FISH-FILTER-001',
    stock: 30,
    image: productPhotoSet.fish[0],
    images: productPhotoSet.fish,
    specifications: {
      petType: 'Fish',
      capacity: '100 liters',
      type: 'Canister',
      power: '20W'
    },
    tags: ['fish', 'aquarium', 'filter'],
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Bird Cage Deluxe',
    description: 'Spacious and elegant bird cage with multiple perches, feeders, and water dispensers.',
    category: 'bird-cages',
    price: 120.00,
    discountPrice: 95.00,
    sku: 'BIRD-CAGE-001',
    stock: 25,
    image: productPhotoSet.bird[0],
    images: productPhotoSet.bird,
    specifications: {
      petType: 'Bird',
      material: 'Stainless Steel',
      size: 'Large',
      color: 'Black'
    },
    tags: ['bird', 'cage', 'housing'],
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Dog Training Treats',
    description: 'Delicious and nutritious training treats that dogs love. Perfect for obedience training.',
    category: 'dog-treats',
    price: 12.99,
    discountPrice: 9.99,
    sku: 'DOG-TREAT-001',
    stock: 200,
    image: productPhotoSet.dogTreat[0],
    images: productPhotoSet.dogTreat,
    specifications: {
      petType: 'Dog',
      weight: '200g',
      ingredients: 'Chicken, Flour',
      age: 'Adult'
    },
    tags: ['dog', 'treat', 'training'],
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Cat Litter Box',
    description: 'Extra-large litter box with odor control technology and easy-to-clean design.',
    category: 'cat-supplies',
    price: 29.99,
    discountPrice: 19.99,
    sku: 'CAT-LITTER-BOX-001',
    stock: 80,
    image: productPhotoSet.catSupplies[0],
    images: productPhotoSet.catSupplies,
    specifications: {
      petType: 'Cat',
      material: 'Plastic',
      size: 'Extra Large',
      color: 'Grey'
    },
    tags: ['cat', 'litter', 'supplies'],
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Rabbit Hutch',
    description: 'Spacious wooden hutch for rabbits with ventilation and waterproof roofing.',
    category: 'small-animals',
    price: 150.00,
    discountPrice: 120.00,
    sku: 'RABBIT-HUTCH-001',
    stock: 15,
    image: productPhotoSet.rabbit[0],
    images: productPhotoSet.rabbit,
    specifications: {
      petType: 'Rabbit',
      material: 'Wood',
      size: 'Large',
      color: 'Natural wood'
    },
    tags: ['rabbit', 'hutch', 'housing'],
    isFeatured: false,
    isActive: true,
  },
];

export const sampleCategories = [
  {
    name: 'Dog Food',
    description: 'Premium dog food and nutrition products',
    slug: 'dog-food',
  },
  {
    name: 'Cat Toys',
    description: 'Interactive and fun toys for cats',
    slug: 'cat-toys',
  },
  {
    name: 'Grooming',
    description: 'Pet grooming tools and supplies',
    slug: 'grooming',
  },
  {
    name: 'Fish Equipment',
    description: 'Aquarium filters and equipment',
    slug: 'fish-equipment',
  },
  {
    name: 'Bird Cages',
    description: 'Spacious bird cages and aviaries',
    slug: 'bird-cages',
  },
  {
    name: 'Dog Treats',
    description: 'Healthy and delicious dog treats',
    slug: 'dog-treats',
  },
  {
    name: 'Cat Supplies',
    description: 'Essential cat supplies and accessories',
    slug: 'cat-supplies',
  },
  {
    name: 'Small Animals',
    description: 'Housing and supplies for small pets',
    slug: 'small-animals',
  },
];

export const seedDatabase = async () => {
  try {
    await connectDB();

    const resetData = process.argv.includes('--reset');

    if (resetData) {
      await Product.deleteMany({});
      await Category.deleteMany({});
    }

    let categories = await Category.find({}).lean();

    if (!categories.length) {
      categories = await Category.insertMany(sampleCategories);
    }

    const categoryMap = new Map(categories.map((category) => [category.slug, category]));
    const existingSkus = new Set((await Product.find({}, 'sku').lean()).map((product) => product.sku));

    const productsToInsert = sampleProducts
      .filter((product) => !existingSkus.has(product.sku))
      .map((product) => {
        const category = categoryMap.get(product.category);

        if (!category) {
          throw new Error(`Missing category for product: ${product.name} (${product.category})`);
        }

        return {
          ...product,
          category: category._id,
          images: product.images || [product.image],
          discountPrice: product.discountPrice || 0,
          rating: product.rating || 0,
          numberOfReviews: product.numberOfReviews || 0,
          specifications: product.specifications || {},
          tags: product.tags || [],
          isFeatured: product.isFeatured || false,
          isActive: product.isActive !== false,
        };
      });

    if (productsToInsert.length) {
      await Product.insertMany(productsToInsert);
    }

    console.log(`Database seeding completed successfully. Inserted ${productsToInsert.length} products and ${categories.length} categories.`);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
};

if (process.argv[1] && process.argv[1].endsWith('sampleData.js')) {
  seedDatabase();
}
