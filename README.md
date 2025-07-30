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
├── public/                         # Static assets like index.html
├── src/                            # Main application source code
│   ├── assets/                     # Images, videos, logos
│   ├── components/                 # Reusable UI components
│   │   ├── layout/                 # Common layout components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Loader.jsx
│   │   └── auth/                   # Login and Register UI
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   ├── context/                    # Global state (Auth, Cart, Wishlist)
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useWishlist.js
│   ├── pages/                      # Main route-based page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── SingleProduct.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Orders.jsx
│   │   ├── Payment.jsx
│   │   ├── PaymentSuccess.jsx
│   │   └── ProfileDetails.jsx
│   ├── Routes/                     # Protected and public routes
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── constants/                  # App-wide constants
│   │   └── routes.js
│   ├── utils/                      # API helper methods
│   │   └── api.jsx
│   ├── App.jsx                     # Root App component
│   └── main.jsx                    # Vite entry point
├── db.json                         # JSON Server backend data
├── package.json                    # Project metadata and scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── vite.config.js                  # Vite configuration
└── README.md                       # Project documentation
