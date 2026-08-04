# Virtual Pet Shop - E-Commerce Platform

A complete full-stack e-commerce application built with **React.js** and **Node.js/Express** for selling pet supplies and accessories.

## 🌟 Features

### User Features
- ✅ User registration and authentication with JWT
- ✅ Secure login/logout with password hashing
- ✅ User profile management
- ✅ Browse and search products
- ✅ Filter by category and price range
- ✅ Product details and reviews
- ✅ Add items to shopping cart
- ✅ Persistent cart (localStorage)
- ✅ Checkout and order placement
- ✅ Order tracking and history
- ✅ Responsive design for all devices

### Admin Features
- ✅ Admin dashboard
- ✅ Add/edit/delete products with image uploads
- ✅ Manage product categories
- ✅ View and manage orders
- ✅ Update order status
- ✅ Dashboard statistics

### Technical Features
- ✅ JWT Authentication
- ✅ Password hashing with bcrypt
- ✅ Image upload with Multer
- ✅ Responsive UI with modern CSS
- ✅ Context API for state management
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ Error handling and validation

---

## 📁 Project Structure

```
pet_shop/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth & Cart context
│   │   ├── services/      # API services
│   │   ├── assets/styles/ # CSS files
│   │   ├── App.jsx        # Main App
│   │   └── main.jsx       # Entry point
│   └── index.html
│
├── server/                # Node.js Backend
│   ├── config/           # Database config
│   ├── controllers/      # Business logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── uploads/          # Uploaded files
│   └── server.js         # Main server
│
└── SETUP.md              # Detailed setup guide
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd pet_shop
```

#### 2. Backend Setup
```bash
cd server
npm install

# Create .env file
cp .env.example .env

# Configure MongoDB and JWT in .env
# Start MongoDB (ensure it's running on localhost:27017)

# Start server
npm run dev
```

Server runs on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd ../client
npm install

# Create .env file
cp .env.example .env

# Start React app
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔑 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/pet_shop_db
JWT_SECRET=your_super_secret_key_12345
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Virtual Pet Shop
```

---

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product details
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id/related` - Get related products

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `PUT /api/orders/:id/cancel` - Cancel order (protected)

### Admin
- `POST /api/admin/products` - Create product (admin only)
- `PUT /api/admin/products/:id` - Update product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)
- `PUT /api/admin/orders/:id/status` - Update order status (admin only)

---

## 💻 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **Vite** - Build tool
- **CSS3** - Styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin requests

---

## 🧪 Testing

### Using Postman
1. Import the API collection
2. Set Bearer token from login response
3. Test endpoints

### Example: Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## 📦 Build & Deploy

### Build Frontend
```bash
cd client
npm run build
# Creates optimized build in dist/
```

### Deploy Options
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Render
- **Database**: MongoDB Atlas

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🆘 Troubleshooting

**MongoDB Connection Error?**
- Ensure MongoDB is running: `mongod`
- Check connection string in .env

**Port Already in Use?**
```bash
# Kill process using port
lsof -i :5000  # Find process
kill -9 <PID>  # Kill it
```

**Dependencies Issue?**
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Vite Docs](https://vitejs.dev/)

---

## 👨‍💻 Author

Induja - Pet Shop E-Commerce Project

---

**Built with ❤️ for pet lovers everywhere**

