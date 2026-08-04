# 🚀 Virtual Pet Shop - Complete Full-Stack E-Commerce Application

A production-ready, feature-rich e-commerce platform for selling pet supplies and accessories. Built with modern technologies including React.js, Node.js, Express, and MongoDB.

---

## 📖 Quick Navigation

- [Features](#-features)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Technologies Used](#-technologies-used)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration with validation
- Secure login with JWT tokens
- Role-based access (Customer/Admin)
- Password hashing with bcrypt
- Protected routes
- Session management

### 🛍️ Shopping Features
- Browse products with advanced filters
- Full-text search functionality
- Category-based filtering
- Price range filtering
- Product ratings and reviews
- Related products suggestions
- Shopping cart with persistence
- Wishlist (feature-ready)

### 🛒 Checkout & Payments
- Multi-step checkout process
- Address management
- Multiple payment methods
- Order summary
- Order confirmation
- Tax and shipping calculation

### 📦 Order Management
- Order history and tracking
- Order status updates
- Order cancellation
- Delivery timeline
- Order details page

### 👨‍💼 Admin Dashboard
- Add/edit/delete products
- Image upload functionality
- Category management
- Order management
- Order status updates
- Dashboard statistics
- Sales analytics

### 📱 Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Touch-friendly interface
- Cross-browser compatibility

---

## 🚀 Installation

### Quick Start (Automated)

#### Windows
```bash
install.bat
```

#### Mac/Linux
```bash
chmod +x install.sh
./install.sh
```

### Manual Installation

#### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- MongoDB ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git

#### Step 1: Clone Repository
```bash
git clone <repository-url>
cd pet_shop
```

#### Step 2: Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
```

Configure `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/pet_shop_db
JWT_SECRET=your_super_secret_key_12345_change_in_production
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

#### Step 3: Start MongoDB
```bash
# Windows (if installed as service)
net start MongoDB

# Mac (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
```

#### Step 4: Start Backend
```bash
npm run dev
# Server running on http://localhost:5000
```

#### Step 5: Frontend Setup
```bash
cd ../client

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

#### Step 6: Start Frontend
```bash
npm run dev
# Frontend running on http://localhost:5173
```

---

## 📁 Project Structure

### Backend Structure
```
server/
├── config/
│   ├── database.js          # MongoDB connection
│   └── sampleData.js        # Sample products & categories
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product operations
│   ├── categoryController.js# Category operations
│   ├── orderController.js   # Order operations
│   └── adminController.js   # Admin operations
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── errorHandler.js      # Global error handling
│   └── upload.js            # File upload handling
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   ├── Category.js          # Category schema
│   └── Order.js             # Order schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── productRoutes.js     # Product endpoints
│   ├── categoryRoutes.js    # Category endpoints
│   ├── orderRoutes.js       # Order endpoints
│   └── adminRoutes.js       # Admin endpoints
├── uploads/                 # Product images
├── server.js                # Main server file
├── package.json
└── .env.example
```

### Frontend Structure
```
client/
├── src/
│   ├── assets/
│   │   └── styles/          # CSS stylesheets
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation component
│   │   ├── Footer.jsx       # Footer component
│   │   ├── ProductCard.jsx  # Product card
│   │   ├── Loading.jsx      # Loading spinner
│   │   └── Notification.jsx # Toast notifications
│   ├── context/
│   │   ├── AuthContext.jsx  # Auth state
│   │   └── CartContext.jsx  # Cart state
│   ├── pages/
│   │   ├── HomePage.jsx     # Home page
│   │   ├── ProductsPage.jsx # Products listing
│   │   ├── ProductDetailPage.jsx # Product details
│   │   ├── CartPage.jsx     # Shopping cart
│   │   ├── CheckoutPage.jsx # Checkout
│   │   ├── OrdersPage.jsx   # Order history
│   │   ├── OrderDetailPage.jsx # Order details
│   │   ├── LoginPage.jsx    # Login
│   │   └── RegisterPage.jsx # Registration
│   ├── services/
│   │   ├── api.js           # Axios instance
│   │   └── index.js         # API functions
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.html
├── package.json
├── vite.config.js
└── .env.example
```

---

## 🔌 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
GET    /api/auth/profile           # Get current user [Protected]
PUT    /api/auth/profile           # Update profile [Protected]
PUT    /api/auth/change-password   # Change password [Protected]
```

### Product Endpoints
```
GET    /api/products               # Get products (filters: category, search, price)
GET    /api/products/featured      # Get featured products
GET    /api/products/:id           # Get product by ID
GET    /api/products/:id/related   # Get related products
POST   /api/products/:id/reviews   # Add review [Protected]
```

### Category Endpoints
```
GET    /api/categories             # Get all categories
GET    /api/categories/:id         # Get category by ID
GET    /api/categories/slug/:slug  # Get category by slug
```

### Order Endpoints
```
POST   /api/orders                 # Create order [Protected]
GET    /api/orders                 # Get user orders [Protected]
GET    /api/orders/:id             # Get order details [Protected]
PUT    /api/orders/:id/cancel      # Cancel order [Protected]
```

### Admin Endpoints [Admin Only]
```
POST   /api/admin/products         # Create product
PUT    /api/admin/products/:id     # Update product
DELETE /api/admin/products/:id     # Delete product
POST   /api/admin/categories       # Create category
PUT    /api/admin/categories/:id   # Update category
DELETE /api/admin/categories/:id   # Delete category
GET    /api/admin/orders           # Get all orders
PUT    /api/admin/orders/:id/status # Update order status
GET    /api/admin/dashboard/stats  # Get dashboard stats
```

---

## 🛠️ Technologies Used

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Framework |
| Vite | 4.3.9 | Build Tool |
| React Router DOM | 6.11.2 | Routing |
| Axios | 1.4.0 | HTTP Client |
| CSS3 | - | Styling |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 14+ | Runtime |
| Express | 4.18.2 | Web Framework |
| MongoDB | 4.4+ | Database |
| Mongoose | 7.0.3 | ODM |
| JWT | 9.0.0 | Authentication |
| bcryptjs | 2.4.3 | Password Hashing |
| Multer | 1.4.5 | File Upload |
| CORS | 2.8.5 | Cross-Origin |

---

## 🎨 Features in Detail

### Product Management
- ✅ Create products with images
- ✅ Edit product details
- ✅ Delete products
- ✅ Product categories
- ✅ Price and discount management
- ✅ Stock tracking
- ✅ Product specifications
- ✅ Featured products

### User Management
- ✅ Registration with validation
- ✅ Email verification (ready)
- ✅ Profile management
- ✅ Address book
- ✅ Password change
- ✅ Wishlist (ready)

### Shopping Experience
- ✅ Product search
- ✅ Advanced filters
- ✅ Product ratings
- ✅ Customer reviews
- ✅ Related products
- ✅ Cart persistence
- ✅ Checkout wizard
- ✅ Order tracking

### Payment & Orders
- ✅ Multiple payment methods
- ✅ Order confirmation emails (ready)
- ✅ Order tracking
- ✅ Order history
- ✅ Invoice generation (ready)
- ✅ Refund management (ready)

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ CORS protection
- ✅ Input validation
- ✅ Error handling
- ✅ Secure file uploads
- ✅ SQL injection prevention (MongoDB)

---

## 📊 Database Schema

### User
```javascript
{
  firstName, lastName, email, password,
  phone, address, role (customer/admin),
  avatar, isActive, createdAt, updatedAt
}
```

### Product
```javascript
{
  name, description, category, price,
  discountPrice, image, images[], stock,
  sku, rating, numberOfReviews, reviews[],
  specifications, tags, isFeatured,
  isActive, createdBy, createdAt, updatedAt
}
```

### Order
```javascript
{
  orderNumber, user, items[], shippingAddress,
  billingAddress, paymentMethod, paymentStatus,
  subtotal, shippingCost, tax, total,
  orderStatus, trackingNumber, couponCode,
  discount, createdAt, updatedAt, deliveredAt
}
```

---

## 🚀 Deployment Guide

### Production Checklist
- [ ] Set strong JWT secret
- [ ] Use environment-specific configs
- [ ] Enable HTTPS
- [ ] Set up CDN for images
- [ ] Configure backup strategy
- [ ] Set up monitoring
- [ ] Implement rate limiting
- [ ] Add logging
- [ ] Test payment integration
- [ ] Set up email service

### Deploy to Heroku
```bash
# Backend
cd server
heroku create your-app-name
git push heroku main

# Frontend (Vercel)
cd ../client
vercel
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Verify connection string in .env
# Default: mongodb://localhost:27017/pet_shop_db
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### npm Dependencies Error
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Check frontend URL in `server/.env` CORS_ORIGIN
- Ensure both servers are running
- Clear browser cache

---

## 📚 Documentation Files

- **SETUP.md** - Detailed setup and installation guide
- **README.md** - Main project documentation
- **API.md** - Complete API reference (ready to create)

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ for pet lovers everywhere

---

## 📞 Support

For issues or questions:
1. Check SETUP.md for detailed setup instructions
2. Review API documentation
3. Check console logs for errors
4. Open an issue on GitHub

---

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Inventory management
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Recommendations engine
- [ ] Subscription products
- [ ] Coupon management
- [ ] Customer support chat

---

**Last Updated:** January 2024

**Version:** 1.0.0

