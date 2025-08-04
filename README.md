# 🛒 Souled Store

**Souled Store** is a modern, fully functional eCommerce web application built using **React**, **Tailwind CSS**, and **JSON Server**. Themed around **Marvel** and **Anime**, it offers a fast, responsive, and user-friendly experience with core features like authentication, cart, wishlist, payments, and order history.

---

## 🚀 Live Demo

👉 [Live Site](#)  
> _(Add your deployed site link here)_

---

## 🔥 Features

- 🎬 Hero section with background video and animated offer slider
- 🛍️ Product listing with category filters and search
- 🛒 Add to Cart with quantity validation and toast notifications
- ❤️ Wishlist with badge count and localStorage persistence
- 🔐 User Authentication (Register & Login)
- 💳 Payment page with UPI and Cash on Delivery options
- 📦 Order history saved per user (via localStorage)
- 📱 Fully responsive and mobile-optimized UI
- ⚛️ Context API for global state (Auth, Cart, Wishlist)

---

## 🧱 Tech Stack

| Frontend     | Backend      | Styling       | State Management |
|--------------|--------------|---------------|------------------|
| React + Vite | JSON Server  | Tailwind CSS  | Context API      |

---

## 📁 Project Structure

```bash
Souled-Store/
├── public/                         
├── src/                            
│   ├── admin/                     
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── AdminUserDetails.jsx
│   │   ├── Products.jsx
│   │   ├── AddProduct.jsx
│   │   ├── EditProduct.jsx
│   │   ├── AdminOrderManagement.jsx
│   │   └── Reports.jsx
│   ├── assets/                     
│   ├── components/                 
│   │   ├── layout/                 
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Loader.jsx
│   │   └── auth/                  
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   ├── context/                   
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── hooks/                      
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useWishlist.js
│   ├── pages/                      
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── SingleProduct.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Orders.jsx
│   │   ├── Payment.jsx
│   │   ├── PaymentSuccess.jsx
│   │   └── ProfileDetails.jsx
│   ├── Routes/                     
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── constants/                  
│   │   └── routes.js
│   ├── utils/                      
│   │   └── api.jsx
│   ├── App.jsx                     
│   └── main.jsx                    
├── db.json                         
├── package.json                    
├── tailwind.config.js              
├── postcss.config.js               
├── vite.config.js                  
└── README.md                       
