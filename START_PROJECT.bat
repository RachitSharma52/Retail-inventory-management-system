@echo off
title Retail Inventory - Start Backend & Frontend
color 0b

echo ========================================================
echo   Starting Retail Inventory Management System
echo   Database: MySQL (localhost:3306 - inventory)
echo   User: root ^| Password: root123
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Spring Boot Backend on Port 8080...
start "Spring Boot Backend (Port 8080)" cmd /k "cd backend && java -jar target\retail-inventory-backend-1.0.0.jar"

echo [2/2] Starting React Frontend on Port 5173...
start "React Frontend (Port 5173)" cmd /k "npm run dev"

echo.
echo Both servers are starting up!
echo - Backend Console: http://localhost:8080/
echo - Frontend App:    http://localhost:5173/
echo.
pause
