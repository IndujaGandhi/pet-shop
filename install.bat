@echo off
REM Virtual Pet Shop Installation Script for Windows

echo.
echo ==========================================
echo Virtual Pet Shop - Installation Script
echo ==========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed. Please install it first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed: 
node --version

echo.
echo ==========================================
echo Setting up Backend...
echo ==========================================

cd server

if exist ".env" (
    echo Warning: .env file already exists. Skipping creation.
) else (
    echo Creating .env file from template...
    copy .env.example .env
    echo .env created. Please edit it with your MongoDB URI and JWT secret.
)

echo Installing backend dependencies...
call npm install

if errorlevel 1 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo Backend dependencies installed successfully
cd ..
echo.

echo ==========================================
echo Setting up Frontend...
echo ==========================================

cd client

if exist ".env" (
    echo Warning: .env file already exists. Skipping creation.
) else (
    echo Creating .env file from template...
    copy .env.example .env
    echo .env created
)

echo Installing frontend dependencies...
call npm install

if errorlevel 1 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo Frontend dependencies installed successfully
cd ..
echo.

echo ==========================================
echo Installation Complete!
echo ==========================================
echo.
echo Next Steps:
echo.
echo 1. Make sure MongoDB is running:
echo    mongod
echo.
echo 2. Update configuration files:
echo    - server\.env  (MongoDB URI, JWT Secret)
echo    - client\.env  (API Base URL)
echo.
echo 3. Start the backend (in Command Prompt):
echo    cd server
echo    npm run dev
echo.
echo 4. Start the frontend (in another Command Prompt):
echo    cd client
echo    npm run dev
echo.
echo 5. Open your browser and visit:
echo    http://localhost:5173
echo.
echo ==========================================
echo For detailed setup instructions, see SETUP.md
echo ==========================================
echo.

pause
