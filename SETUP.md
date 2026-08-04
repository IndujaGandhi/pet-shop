# Virtual Pet Shop - E-Commerce Application
## Complete Setup and Installation Guide

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Database Setup](#database-setup)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
8. [API Endpoints](#api-endpoints)
9. [Features Overview](#features-overview)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)
- **Postman** (for API testing) - [Download](https://www.postman.com/downloads/)

---

## Project Structure

```
pet_shop/
├── client/                          # Frontend (React)
│   ├── src/
│   │   ├── assets/
│   │   │   └── styles/             # CSS files
│   │   ├── components/             # React components
│   │   ├── context/                # Context API for state management
│   │   ├── pages/                  # Page components
│   │   ├── services/               # API service calls
│   │   ├── App.jsx                 # Main App component
│   │   └── main.jsx                # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
└── server/                          # Backend (Node.js/Express)
    ├── config/                     # Configuration files
    ├── controllers/                # Business logic
    ├── middleware/                 # Express middleware
    ├── models/                     # MongoDB models
    ├── routes/                     # API routes
    ├── uploads/                    # Uploaded files storage
    ├── server.js                   # Main server file
    ├── package.json
    └── .env.example
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd server
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- multer - File upload handling
- cors - CORS handling
- dotenv - Environment variables

### Step 3: Create .env File
Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb://localhost:27017/pet_shop_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Step 4: Start MongoDB
Make sure MongoDB is running:

**On Windows:**
```bash
mongod
```

**On Mac/Linux:**
```bash
brew services start mongodb-community
# or
sudo systemctl start mongod
```

### Step 5: Run Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will start at `http://localhost:5000`

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd ../client
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- react - UI library
- react-dom - React rendering
- react-router-dom - Routing
- axios - HTTP client
- react-toastify - Notifications (optional, already implemented)

### Step 3: Create .env File
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Virtual Pet Shop
```

### Step 4: Run Frontend Development Server
```bash
npm run dev
```

Frontend will start at `http://localhost:5173`

---

## Database Setup

### MongoDB Installation

**Windows:**
1. Download MongoDB Community from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Choose "Install MongoDB as a Service"
4. MongoDB will start automatically

**Mac (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
curl https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
```

### Verify MongoDB Connection
Open a terminal and run:
```bash
mongosh  # or mongo (older versions)
```

You should see the MongoDB shell prompt.

---

## Environment Variables

### Backend .env File
```
# Database
MONGODB_URI=mongodb://localhost:27017/pet_shop_db

# JWT Authentication
JWT_SECRET=your_super_secret_key_12345_change_in_production

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Frontend .env File
```
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Virtual Pet Shop
```

---

## Running the Application

### In Two Terminal Windows

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Output: ✓ Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Output: VITE v4.3.9  ready in 120 ms
# ➜  Local:   http://localhost:5173/
```

Open your browser and visit: **http://localhost:5173**

---

## API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
GET    /api/auth/profile           # Get current user (protected)
PUT    /api/auth/profile           # Update profile (protected)
PUT    /api/auth/change-password   # Change password (protected)
```

### Product Endpoints
```
GET    /api/products               # Get all products (with filters)
GET    /api/products/featured      # Get featured products
GET    /api/products/:id           # Get product by ID
GET    /api/products/:id/related   # Get related products
POST   /api/products/:id/reviews   # Add product review (protected)
```

### Category Endpoints
```
GET    /api/categories             # Get all categories
GET    /api/categories/:id         # Get category by ID
GET    /api/categories/slug/:slug  # Get category by slug
```

### Order Endpoints (Protected)
```
POST   /api/orders                 # Create order
GET    /api/orders                 # Get user orders
GET    /api/orders/:id             # Get order details
PUT    /api/orders/:id/cancel      # Cancel order
```

### Admin Endpoints (Admin Only)
```
# Products
POST   /api/admin/products         # Create product
PUT    /api/admin/products/:id     # Update product
DELETE /api/admin/products/:id     # Delete product

# Categories
POST   /api/admin/categories       # Create category
PUT    /api/admin/categories/:id   # Update category
DELETE /api/admin/categories/:id   # Delete category

# Orders
GET    /api/admin/orders           # Get all orders
PUT    /api/admin/orders/:id/status # Update order status

# Dashboard
GET    /api/admin/dashboard/stats  # Get dashboard statistics
```

---

## Features Overview

### ✅ User Authentication
- User registration with validation
- Secure login with JWT tokens
- Protected routes
- Logout functionality
- Password change

### ✅ Product Management
- Browse all products with filters
- Product search functionality
- Category filtering
- Price range filtering
- Product details page
- Related products
- Product ratings and reviews

### ✅ Shopping Cart
- Add/remove items from cart
- Update product quantities
- Cart persistence (localStorage)
- Real-time cart total calculation

### ✅ Checkout & Orders
- Shipping address form
- Multiple payment methods
- Order placement
- Order history
- Order tracking

### ✅ Admin Dashboard
- Add new products with images
- Edit/delete products
- Manage categories
- View all orders
- Update order status
- Dashboard statistics

### ✅ Responsive Design
- Mobile-friendly interface
- Desktop optimized layout
- Cross-browser compatibility

---

## Testing with Postman

### Import API Collection
1. Open Postman
2. Create a new collection "Pet Shop API"
3. Add requests for each endpoint

### Example: Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Example: Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Copy the returned token and use it in the Authorization header for protected routes:
```
Authorization: Bearer <token>
```

---

## Troubleshooting

### MongoDB Connection Error
**Problem:** `MongooseServerSelectionError`

**Solution:**
1. Ensure MongoDB is running
2. Check MongoDB URI in .env
3. Verify mongod is listening on localhost:27017

### Port Already in Use
**Problem:** `Port 5000 or 5173 already in use`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process (on Mac/Linux)
kill -9 <PID>

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Errors
**Problem:** `Cross-Origin Request Blocked`

**Solution:**
1. Verify frontend URL in backend `.env` CORS_ORIGIN
2. Ensure both servers are running
3. Clear browser cache and cookies

### Dependencies Installation Failed
**Problem:** `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Reinstall
npm install
```

### Environment Variables Not Loading
**Problem:** API calls to wrong URL

**Solution:**
1. Restart the frontend development server after changing `.env`
2. Verify `VITE_` prefix for Vite variables
3. Check for typos in variable names

---

## Building for Production

### Backend
```bash
cd server
# No build needed, just ensure .env is properly configured
npm start
```

### Frontend
```bash
cd client
npm run build
# Creates optimized build in `dist/` folder
```

---

## Deployment Options

### Recommended Platforms
- **Backend:** Heroku, Railway, Render, AWS
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Database:** MongoDB Atlas (cloud)

---

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Authentication](https://jwt.io/)
- [Vite Documentation](https://vitejs.dev/)

---

## Support & Contributing

For issues or questions:
1. Check the troubleshooting section
2. Review API endpoint documentation
3. Verify environment variables
4. Check console logs for errors

---

**Happy Coding! 🚀**

