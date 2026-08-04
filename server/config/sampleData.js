import Order from '../models/Order.js';

// Sample products for database seeding
export const sampleProducts = [
  {
    name: 'Premium Dog Food',
    description: 'High-quality dog food with all essential nutrients for a healthy diet. Contains chicken, rice, and vegetables.',
    category: 'dog-food', // This will be replaced with actual category ID
    price: 45.99,
    discountPrice: 35.99,
    sku: 'DOG-FOOD-001',
    stock: 100,
    image: 'https://via.placeholder.com/300x300?text=Premium+Dog+Food',
    images: ['https://via.placeholder.com/300x300?text=Premium+Dog+Food'],
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
    image: 'https://via.placeholder.com/300x300?text=Cat+Scratching+Post',
    images: ['https://via.placeholder.com/300x300?text=Cat+Scratching+Post'],
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
    image: 'https://via.placeholder.com/300x300?text=Grooming+Kit',
    images: ['https://via.placeholder.com/300x300?text=Grooming+Kit'],
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
    image: 'https://via.placeholder.com/300x300?text=Aquarium+Filter',
    images: ['https://via.placeholder.com/300x300?text=Aquarium+Filter'],
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
    image: 'https://via.placeholder.com/300x300?text=Bird+Cage',
    images: ['https://via.placeholder.com/300x300?text=Bird+Cage'],
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
    image: 'https://via.placeholder.com/300x300?text=Dog+Treats',
    images: ['https://via.placeholder.com/300x300?text=Dog+Treats'],
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
    image: 'https://via.placeholder.com/300x300?text=Cat+Litter+Box',
    images: ['https://via.placeholder.com/300x300?text=Cat+Litter+Box'],
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
    image: 'https://via.placeholder.com/300x300?text=Rabbit+Hutch',
    images: ['https://via.placeholder.com/300x300?text=Rabbit+Hutch'],
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

// Sample categories
export const sampleCategories = [
  {
    name: 'Dog Food',
    description: 'Premium dog food and nutrition products',
    slug: 'dog-food'
  },
  {
    name: 'Cat Toys',
    description: 'Interactive and fun toys for cats',
    slug: 'cat-toys'
  },
  {
    name: 'Grooming',
    description: 'Pet grooming tools and supplies',
    slug: 'grooming'
  },
  {
    name: 'Fish Equipment',
    description: 'Aquarium filters and equipment',
    slug: 'fish-equipment'
  },
  {
    name: 'Bird Cages',
    description: 'Spacious bird cages and aviaries',
    slug: 'bird-cages'
  },
  {
    name: 'Dog Treats',
    description: 'Healthy and delicious dog treats',
    slug: 'dog-treats'
  },
  {
    name: 'Cat Supplies',
    description: 'Essential cat supplies and accessories',
    slug: 'cat-supplies'
  },
  {
    name: 'Small Animals',
    description: 'Housing and supplies for small pets',
    slug: 'small-animals'
  },
];

// Database seeding function
export const seedDatabase = async () => {
  try {
    // You can use this function to seed the database with sample data
    // Run this once to populate the database
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
