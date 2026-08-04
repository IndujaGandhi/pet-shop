#!/bin/bash

# Virtual Pet Shop Installation Script
# This script automates the installation of both frontend and backend

echo "=========================================="
echo "Virtual Pet Shop - Installation Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Check if MongoDB is available
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Install it from: https://www.mongodb.com/try/download/community"
    echo "   Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    echo ""
fi

# Backend Setup
echo "=========================================="
echo "Setting up Backend..."
echo "=========================================="
cd server

if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Skipping creation."
else
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "✓ .env created. Please edit it with your MongoDB URI and JWT secret."
fi

echo "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Backend dependencies installed successfully"
else
    echo "❌ Error installing backend dependencies"
    exit 1
fi

cd ..
echo ""

# Frontend Setup
echo "=========================================="
echo "Setting up Frontend..."
echo "=========================================="
cd client

if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Skipping creation."
else
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "✓ .env created"
fi

echo "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Frontend dependencies installed successfully"
else
    echo "❌ Error installing frontend dependencies"
    exit 1
fi

cd ..
echo ""

# Final Instructions
echo "=========================================="
echo "✓ Installation Complete!"
echo "=========================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Make sure MongoDB is running:"
echo "   mongod"
echo ""
echo "2. Update configuration files:"
echo "   - server/.env  (MongoDB URI, JWT Secret)"
echo "   - client/.env  (API Base URL)"
echo ""
echo "3. Start the backend (in a new terminal):"
echo "   cd server"
echo "   npm run dev"
echo ""
echo "4. Start the frontend (in another terminal):"
echo "   cd client"
echo "   npm run dev"
echo ""
echo "5. Open your browser and visit:"
echo "   http://localhost:5173"
echo ""
echo "=========================================="
echo "For detailed setup instructions, see SETUP.md"
echo "=========================================="
