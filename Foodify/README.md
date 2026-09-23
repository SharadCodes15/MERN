# Foodify

Foodify is a full-stack food discovery platform where users can browse food videos, like and save items, and explore food partner profiles. This project is currently in its first stable version, with an upgraded second version actively underway.

## Project Status

### Version 1: Completed
The core platform functionality has been implemented and is working in both the backend and frontend.

### Version 2: In Progress
The next phase focuses on improving user experience, refining the design system, expanding platform features, and introducing more advanced product capabilities.

---

## Backend - What Has Been Done

The backend is built with Node.js, Express, MongoDB, JWT authentication, and file storage integration.

### Completed features
- User registration, login, logout, and JWT-based session handling
- Food partner registration, login, logout, and account authentication
- Secure cookie-based auth flow for both users and food partners
- MongoDB models for users, food partners, foods, likes, and saved items
- Food creation flow with uploaded video support
- Food listing API for the home feed
- Like and save functionality with count updates
- Saved items retrieval API
- Food partner profile retrieval with associated food listings
- CORS and middleware setup for frontend communication
- Cloud file upload support through storage service integration

### Backend architecture highlights
- Express server setup with route separation
- Controllers for authentication, food management, and partner management
- Services for media storage
- Role-based flows for normal users and food partners
- Validation checks for duplicate users/partners and invalid credentials

---

## Frontend - What Has Been Done

The frontend is built with React + Vite and includes a modern reel-style interface for food content browsing.

### Completed features
- User registration and login pages
- Food partner registration and login pages
- Home page with vertical reel-style food feed
- Food cards with video playback, like, and save actions
- Save and liked state tracking per food item
- Food partner profile page
- Create food page for food partners
- Saved items screen for users
- Navbar and app route setup
- Responsive layout and polished styling with a modern dark theme

### Frontend experience highlights
- Reel-inspired user experience for watching food videos
- Auto-play video behavior based on visible content
- Like and save interactions with optimistic UI updates
- Store/profile navigation from food cards
- Clean routing structure for auth, home, saved, and partner flows

---

## Version 1 Overview

Version 1 successfully establishes the foundation of the app:
- User and partner authentication
- Food upload and discovery
- Social interaction via likes and saves
- Food partner profile and content management
- Functional frontend navigation and responsive design

This version proves the core product idea and provides a working MVP for further enhancement.

---

## Version 2 - Work in Progress

Version 2 is being developed to take Foodify to the next level with a stronger product experience and better scalability.

### Planned improvements
- More polished and premium UI/UX design
- Better user dashboard and partner dashboard
- Improved content discovery and filtering
- Advanced search and category-based browsing
- Better performance optimization for video-heavy feeds
- Enhanced analytics for food partners
- More secure and scalable backend structure
- Additional features such as recommendations, notifications, and engagement tracking

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cookie Parser
- ImageKit / storage service integration

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS

---

## Project Goal

Foodify aims to connect users with delicious food content and help food partners showcase their offerings in a compelling, short-form video experience.

---

## Notes

This repository currently represents the foundation of the product in Version 1, while Version 2 is under active development with a focus on refinement, scalability, and a richer overall experience.

If you want, this README can also be expanded with:
- Installation steps
- Environment variables
- API documentation
- Screenshots
- Contributor and setup instructions
