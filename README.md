# 🍅 Tomato – Food Delivery Web Application

A full-stack **Food Delivery Web Application** built using the **MERN Stack** with separate **User** and **Admin** panels.  
The app supports secure authentication, cart & order management, and online payments, and is fully deployed on **Render**.

---

## 🌐 Live Demo

### 👤 User Frontend  
https://tomato-delivery-frontend-16al.onrender.com  

### 🛠️ Admin Dashboard  
https://tomato-delivery-admin-a3to.onrender.com  

### 🔗 Backend API  
https://tomato-delivery-backend-q5bh.onrender.com

---

## 🚀 Features

### 👤 User Panel
- User authentication (JWT based)
- Browse food items
- Add / remove items from cart
- Place orders
- Online payment integration (Stripe)
- View order history

### 🛠️ Admin Panel
- Secure admin access
- View all user orders
- Update order status  
  *(Food Processing → Out for Delivery → Delivered)*
- Manage food items
- Admin-protected APIs

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Stripe Payment Gateway

### Deployment
- Backend: Render (Web Service)
- Frontend: Render (Static Site)
- Admin Panel: Render (Static Site)
- Database: MongoDB Atlas

---

## 📂 Project Structure

Tomato_app_delivery/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── config/
│ └── server.js
│
├── tomato-app/
│ └── User Interface (React)
│
├── admin/
│ └── Admin Dashboard (React)
│
├── .gitignore/
|
└── README.md

yaml
Copy code

---

## ⚙️ Run Project Locally

### 1️⃣ Backend
```bash
cd backend
npm install
npm start
```

### 2️⃣ Frontend (User)
```bash
Copy code
cd frontend
npm install
npm run dev
```

3️⃣ Admin Panel
```bash
Copy code
cd admin
npm install
npm run dev
```

🔐 Environment Variables
Create a .env file inside the backend/ directory:

env
Copy code
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

⚠️ Note:
.env is ignored using .gitignore

Secrets are stored securely in Render environment variables for production

🔒 Authentication & Security
JWT-based authentication
Protected user and admin routes
Middleware-based authorization
Environment-based secret management
Secure API access for admin operations


🏁 Deployment Status
✔ Backend deployed on Render
✔ Frontend deployed on Render
✔ Admin dashboard deployed on Render
✔ MongoDB Atlas connected
✔ Stripe payment gateway integrated

👨‍💻 Author
Mohit Negi

⭐ Feedback
If you like this project:

⭐ Star the repository
🐛 Report issues
📢 Share feedback
