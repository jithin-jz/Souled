# 🛒 Souled Store

**Souled Store** is a modern, fully functional eCommerce web application built with **React**, **Tailwind CSS**, and **JSON Server**. Featuring **Marvel** and **Anime** themes, it delivers a fast, responsive, and user-friendly shopping experience with comprehensive features including authentication, cart management, wishlist, payments, and order tracking.

## 🚀 Live Demo

👉 **[View Live Site](#)** *(Add your deployed site link here)*

## ✨ Features

### 🎬 **User Experience**
- Hero section with background video and animated offer slider
- Product listing with category filters and search functionality
- Responsive design optimized for all devices

### 🛍️ **Shopping Features**
- Add to Cart with quantity validation and toast notifications
- Wishlist functionality with badge count and localStorage persistence
- Real-time cart and wishlist updates

### 🔐 **Authentication & Security**
- User registration and login system
- Protected routes for authenticated users
- Admin dashboard with role-based access

### 💳 **Payment & Orders**
- Multiple payment options (UPI and Cash on Delivery)
- Order history saved per user via localStorage
- Order management system

### 🛠️ **Admin Features**
- Admin Dashboard for comprehensive management
- User management system
- Product CRUD operations
- Order tracking and management
- Analytics and reports

## 🧱 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React + Vite |
| **Backend** | JSON Server |
| **Styling** | Tailwind CSS |
| **State Management** | Context API |
| **Routing** | React Router |

## 📁 Project Structure

```
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
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jithin-jz/souled-store.git
   cd souled-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start JSON Server**
   ```bash
   npx json-server --watch db.json --port 3001
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## 🌟 Key Features Breakdown

### Context API Implementation
- **AuthContext**: Manages user authentication state
- **CartContext**: Handles cart operations and state
- **WishlistContext**: Manages wishlist functionality

### Route Protection
- **ProtectedRoute**: Restricts access to authenticated users
- **AdminRoute**: Admin-only access control
- **PublicRoute**: Public access routes

### Admin Dashboard
- User management and analytics
- Product inventory management
- Order processing and tracking
- Sales reports and insights

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Marvel and Anime communities for inspiration
- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework

## 📬 Contact

**Jithin** - *Full Stack Developer*

- GitHub: [@jithin-jz](https://github.com/jithin-jz)
- Email: jihinjzx@gmail.com

---