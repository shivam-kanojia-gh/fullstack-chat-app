# Fullstack Chat Application

A modern real-time chat application built with React, Node.js, and Socket.IO.

## Features

- Real-time messaging using Socket.IO
- User authentication and authorization
- Modern UI with Tailwind CSS and DaisyUI
- Responsive design
- File sharing capabilities
- Message history
- Online/offline status

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- DaisyUI
- Socket.IO Client
- React Router DOM
- Zustand (State Management)
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Cloudinary for file storage
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fullstack-chat-app
```

2. Install dependencies for both frontend and backend:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```
