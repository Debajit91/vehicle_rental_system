# 🚗 Vehicle Rental System – Backend API

**Live:** https://vehicle-rental-system-ruby.vercel.app

---

## Overview
A backend REST API for managing a vehicle rental system with secure **JWT authentication** and **role-based access control**.  
Supports vehicle inventory, user management, and booking lifecycle handling for **Admin** and **Customer** roles.

---

## Features
- JWT authentication (Admin / Customer)
- Vehicle availability tracking
- Booking creation, cancellation, and return
- Automatic rental price calculation
- Modular, feature-based architecture

---

## Tech Stack
Node.js • TypeScript • Express.js • PostgreSQL • bcrypt • JWT

---

## Core Modules
`auth` • `users` • `vehicles` • `bookings`

---

## Database (Summary)
- **Users:** id, name, email, password, phone, role  
- **Vehicles:** id, name, type, registration, daily_price, availability  
- **Bookings:** id, customer_id, vehicle_id, dates, total_price, status  

---

## Authentication
```http
Authorization: Bearer <token>
Admin: Full system access

Customer: Manage own profile & bookings

API Endpoints (Summary)
Auth

POST /api/v1/auth/signup

POST /api/v1/auth/signin

Vehicles

POST /api/v1/vehicles (Admin)

GET /api/v1/vehicles

GET /api/v1/vehicles/:vehicleId

PUT /api/v1/vehicles/:vehicleId (Admin)

DELETE /api/v1/vehicles/:vehicleId (Admin)

Users

GET /api/v1/users (Admin)

PUT /api/v1/users/:userId (Admin / Own)

DELETE /api/v1/users/:userId (Admin)

Bookings

POST /api/v1/bookings

GET /api/v1/bookings (Role-based)

PUT /api/v1/bookings/:bookingId (Role-based)

Run Locally
npm install
npm run dev


