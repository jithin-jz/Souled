# 🛒 Souled Store

**Souled Store** is a modern eCommerce web application built with **React**, **Tailwind CSS**, and **JSON Server**, featuring Marvel and Anime-themed products. It offers all essential features like cart, wishlist, user login, and order history – wrapped in a fast, mobile-friendly UI.

## 🚀 Live Demo

> (Add your live site link here)

---

## 🔥 Features

- 🦸 Hero section with background video and offer slider
- 🛍️ Product listing with search, filter, and categories
- 🛒 Add to Cart with quantity validation and toast notifications
- ❤️ Wishlist with real-time updates and badge count
- 👤 User Authentication (Register & Login)
- 💳 Payment form with UPI and Cash on Delivery options
- 📦 Order History saved per user (via localStorage)
- 📱 Responsive design with modern UI

---

## 🧱 Tech Stack

| Frontend | Backend | Styling | State Management |
|----------|---------|---------|------------------|
| React + Vite | JSON Server | Tailwind CSS | Context API (Auth, Cart, Wishlist) |

---

## 📁 Folder Structure

STORE/
├── public/                            # Static files like index.html, icons
│
├── src/                               # Source code
│
│   ├── assets/                        # Images, logos, fonts, etc.
│
│   ├── components/                    # Reusable UI components
│   │   ├── layout/                    # Layout and general UI
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Loader.jsx
│   │   └── auth/                      # Login/Register forms
│   │       ├── Login.jsx
│   │       └── Register.jsx
│
│   ├── context/                       # React context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│
│   ├── hooks/                         # Custom React hooks (optional)
│   │   ├── useAuth.js
│   │   └── useCart.js
│
│   ├── pages/                         # Pages mapped to routes
│   │   ├── Home.jsx
│   │   ├── Cart.jsx
│   │   ├── Products.jsx
│   │   ├── SingleProduct.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Orders.jsx
│   │   ├── Payment.jsx
│   │   ├── PaymentSuccess.jsx
│   │   └── ProfileDetails.jsx
│
│   ├── Routes/                        # Public & protected route components
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│
│   ├── constants/                     # Route paths, enums, roles, etc. (optional)
│   │   └── routes.js
│
│   ├── utils/                         # Utility and helper functions
│   │   └── api.jsx                    # Axios instance or fetch API wrapper
│
│   ├── App.jsx                        # Root component with routes and layout
│   └── main.jsx                       # App entry point (if using Vite)
│
├── db.json                            # JSON Server database (mock backend)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js                     # Vite config (if using Vite)
└── README.md

🤝 Contributing
Contributions are welcome!
If you find a bug or have a feature request, feel free to open an issue or submit a pull request.

📬 Contact
Made with ❤️ by Jithin-jz
Drop a message on LinkedIn or GitHub

⭐️ Show Your Support
If you like this project, consider giving it a ⭐ on GitHub to help others discover it!