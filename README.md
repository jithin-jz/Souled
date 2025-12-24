<div align="center">

# 🛒 Souled Store

### *Modern eCommerce Experience Built with React & Vite*

A fully functional eCommerce web application themed around **Marvel** and **Anime**, offering a fast, responsive, and user-friendly shopping experience with authentication, cart, wishlist, payments, and order management.

<br/>

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

</div>

---

## 📸 Screenshots

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="screenshots/home.png" alt="Home Page" width="400"/>
      <br/>
      <sub><b>🏠 Home Page</b></sub>
    </td>
    <td align="center">
      <img src="screenshots/products.png" alt="Products Page" width="400"/>
      <br/>
      <sub><b>🛍️ Products Page</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="screenshots/cart.png" alt="Shopping Cart" width="400"/>
      <br/>
      <sub><b>🛒 Shopping Cart</b></sub>
    </td>
    <td align="center">
      <img src="screenshots/admin-dashboard.png" alt="Admin Dashboard" width="400"/>
      <br/>
      <sub><b>📊 Admin Dashboard</b></sub>
    </td>
  </tr>
</table>

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 User Experience
- 🎬 **Hero Section** with background video & animated offers
- 🛍️ **Product Catalog** with category filters & search
- 🛒 **Smart Cart** with quantity validation & toast notifications
- ❤️ **Wishlist** with badge count & localStorage persistence
- 📱 **Responsive Design** optimized for all devices

</td>
<td width="50%">

### 🔐 Core Functionality
- � **User Authentication** (Register & Login)
- 💳 **Payment Options** (UPI & Cash on Delivery)
- 📦 **Order History** saved per user
- ⚛️ **Context API** for global state management
- 🛠️ **Admin Dashboard** for complete management

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| **Category** | **Technology** |
|:---:|:---:|
| **Frontend** | React 18.2 + Vite 7.0 |
| **Styling** | Tailwind CSS 4.1 |
| **Backend** | JSON Server |
| **State Management** | Context API |
| **Routing** | React Router v6 |

</div>

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js (v14 or higher)
npm or yarn
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/jithin-jz/souled.git
cd souled

# 2. Install dependencies
npm install

# 3. Start JSON Server (Terminal 1)
npx json-server --watch db.json --port 3001

# 4. Run development server (Terminal 2)
npm run dev

# 5. Open your browser
# Navigate to http://localhost:5173
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Starts the development server |
| `npm run build` | 📦 Builds the app for production |
| `npm run preview` | 👀 Preview the production build |
| `npm run lint` | 🔍 Run ESLint |

---

## 📁 Project Structure

```
Souled-Store/
├── 📂 public/
├── 📂 src/
│   ├── 📂 admin/              # Admin dashboard components
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Products.jsx
│   │   └── Reports.jsx
│   ├── 📂 components/         # Reusable components
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Loader.jsx
│   │   └── auth/
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   ├── 📂 context/            # Context API providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── 📂 hooks/              # Custom React hooks
│   ├── 📂 pages/              # Page components
│   ├── 📂 Routes/             # Route protection
│   ├── 📂 utils/              # Utility functions
│   ├── App.jsx
│   └── main.jsx
├── 📄 db.json                 # JSON Server database
├── 📄 package.json
└── 📄 README.md
```

---

## 🎯 Key Features Breakdown

### 🔐 Authentication System
- **AuthContext**: Manages user authentication state across the app
- **Protected Routes**: Restricts access to authenticated users only
- **Admin Routes**: Special access control for admin users
- **Public Routes**: Accessible to all visitors

### 🛒 Shopping Experience
- **CartContext**: Handles all cart operations and state
- **WishlistContext**: Manages wishlist functionality
- Real-time updates with toast notifications
- Persistent data using localStorage

### 📊 Admin Dashboard
- 👥 User management and analytics
- 📦 Product inventory management
- 🚚 Order processing and tracking
- 📈 Sales reports and insights

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- 🦸 **Marvel** and **Anime** communities for inspiration
- ⚛️ **React Team** for the amazing framework
- 🎨 **Tailwind CSS** for the utility-first CSS framework
- 💙 All contributors and supporters

---

## 📬 Contact

<div align="center">

**Jithin** - *Full Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-jithin--jz-181717?style=for-the-badge&logo=github)](https://github.com/jithin-jz)
[![Email](https://img.shields.io/badge/Email-jihinjzx%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:jihinjzx@gmail.com)

</div>

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ by [Jithin](https://github.com/jithin-jz)

</div>
