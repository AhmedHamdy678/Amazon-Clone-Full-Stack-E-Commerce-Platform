# 🛒 Amazon Clone - Full Stack E-Commerce Platform

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12.7.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.7-0081CB?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A fully functional, production-ready Amazon clone built with modern web technologies. This e-commerce platform features user authentication, shopping cart functionality, real-time payment processing with Stripe, and order management.

## 🌐 Live Demo

**Frontend:** [View Live Demo](https://author-e-clone.web.app/)  
**Admin Panel:** Available for authenticated users

> **Note:** Replace with your actual deployment URL after deploying to Firebase Hosting

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🎯 Overview

This Amazon Clone is a comprehensive e-commerce solution that replicates core Amazon features. Built with React and Firebase, it demonstrates modern web development practices including:

- State management with Context API and Reducers
- Secure payment processing with Stripe
- Firebase Authentication for user management
- Cloud Functions for serverless backend operations
- Persistent shopping cart using LocalStorage
- Responsive design with Material-UI components

## ✨ Features

### 🔐 Authentication

- User registration with email/password
- Secure login system
- Firebase Authentication integration
- Protected routes for authenticated users
- Persistent user sessions

### 🛍️ Shopping Experience

- Product catalog with detailed information
- Add/remove items from shopping cart
- Real-time cart total calculations
- Persistent cart data (LocalStorage)
- Responsive product grid layout

### 💳 Payment Processing

- Secure Stripe integration
- Real-time payment processing
- Payment intent creation via Cloud Functions
- Order confirmation and receipt generation

### 📦 Order Management

- Order history for authenticated users
- Detailed order information display
- Order tracking with timestamps
- Individual order items with pricing

### 🎨 UI/UX

- Material-UI components for consistent design
- Responsive layout (mobile, tablet, desktop)
- Smooth navigation with React Router
- Loading states and error handling
- Professional header with navigation

## 🛠️ Tech Stack

### Frontend

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 7.12.0** - Client-side routing
- **Material-UI 7.3.7** - UI component library
- **Emotion** - CSS-in-JS styling
- **Axios 1.13.2** - HTTP client

### Backend & Services

- **Firebase 12.7.0**
  - Authentication
  - Cloud Functions
  - Firestore Database
  - Hosting
- **Node.js** - Runtime for Cloud Functions
- **Express.js** - API framework

### Payment

- **Stripe 20.2.0** - Payment processing (backend)
- **@stripe/stripe-js 8.6.1** - Stripe client library
- **@stripe/react-stripe-js 5.4.1** - React Stripe components

### Additional Libraries

- **Moment.js 2.30.1** - Date/time formatting
- **React Currency Format 1.1.0** - Price formatting
- **Bootstrap 5.3.8** - Additional styling utilities
- **ShortID 2.2.17** - Unique ID generation

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Git**

You'll also need accounts for:

- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/amazon-clone.git
cd amazon-clone
cd Amazon-clone
```

### 2. Install dependencies

```bash
# Install frontend dependencies
npm install --legacy-peer-deps

# Install Cloud Functions dependencies
cd functions
npm install
cd ..
```

### 3. Firebase Setup

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init
```

Select the following options:

- ✅ Functions
- ✅ Hosting
- ✅ Firestore (optional)

## ⚙️ Configuration

### 1. Firebase Configuration

Create `src/Firebase/Firebase.jsx` with your Firebase credentials:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 2. Stripe Configuration

Create `functions/.env`:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

Update Stripe public key in `src/App.jsx`:

```javascript
const stripePromise = loadStripe("your_stripe_publishable_key_here");
```

### 3. Firebase Functions Configuration

The Cloud Functions API is located in `functions/index.js` and handles:

- Payment intent creation
- Stripe integration
- CORS configuration

## 💻 Usage

### Development Mode

```bash
# Start the development server
npm run dev

# In a separate terminal, start Firebase emulators
firebase emulators:start --only functions
```

The application will be available at `http://localhost:5173`  
Firebase Functions will run at `http://127.0.0.1:5001`

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

### Deployment

```bash
# Deploy to Firebase Hosting and Functions
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions
```

## 📁 Project Structure

```
Amazon-clone/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images and icons
│   │   ├── icons/
│   │   └── products/
│   ├── components/           # React components
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── login.css
│   │   ├── SignUp/
│   │   │   ├── SignUp.jsx
│   │   │   └── signup.css
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Home.jsx          # Homepage
│   │   ├── Checkout.jsx      # Shopping cart
│   │   ├── Payment.jsx       # Stripe payment
│   │   ├── Order.jsx         # Order history
│   │   ├── Product.jsx       # Product display
│   │   ├── ProductItem.jsx   # Product card
│   │   ├── Subtotal.jsx      # Cart summary
│   │   └── LogOut.jsx        # Logout handler
│   ├── context/              # State management
│   │   ├── GlobalState.jsx   # Context provider
│   │   └── AppReducer.jsx    # Reducer logic
│   ├── Firebase/
│   │   └── Firebase.jsx      # Firebase config
│   ├── App.jsx               # Main app component
│   ├── App.css               # Global styles
│   ├── main.jsx              # App entry point
│   └── index.css             # Base styles
├── functions/                # Firebase Cloud Functions
│   ├── index.js             # Express API & Stripe
│   ├── package.json         # Function dependencies
│   └── .env                 # Environment variables
├── firebase.json            # Firebase configuration
├── vite.config.js          # Vite configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## 🔌 API Endpoints

### Firebase Cloud Functions

Base URL: `https://us-central1-your-project-id.cloudfunctions.net/api`

#### Health Check

```
GET /
Response: "Hello World"
```

#### Create Payment Intent

```
POST /payments/create?total={amount}
Body: {}
Response: {
  clientSecret: "pi_xxx_secret_xxx"
}
```

**Parameters:**

- `total` (query): Amount in cents (e.g., 2999 for $29.99)

**Authentication:** None (implement as needed)

## 🚀 Deployment

### Firebase Hosting

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Deploy:**

   ```bash
   firebase deploy
   ```

3. **Access your app:**
   ```
   https://your-project-id.web.app
   ```

### Environment Variables

Ensure the following are configured:

**Cloud Functions (.env):**

- `STRIPE_SECRET_KEY`

**Frontend (hardcoded or .env):**

- Firebase configuration object
- Stripe publishable key

## 📸 Screenshots

### Homepage

![Homepage](screenshots/homepage.png)

### Shopping Cart

![Cart](screenshots/cart.png)

### Payment

![Payment](screenshots/payment.png)

### Orders

![Orders](screenshots/orders.png)

> **Note:** Add actual screenshots to a `screenshots/` directory in your repository

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint rules configured in the project
- Use meaningful component and variable names
- Comment complex logic
- Test before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 📞 Contact (011155 61531)

**Your Name**

- Portfolio: [https://yourportfolio.com](https://yourportfolio.com)
- LinkedIn: (https://www.linkedin.com/in/ahmed-hamdy-881b1826a/)
- GitHub: (https://github.com/AhmedHamdy678)
- Email: syda90215@gmail.com

## 🙏 Acknowledgments

- Design inspired by [Amazon.com](https://www.amazon.com)
- Stripe for payment processing infrastructure
- Firebase for backend services
- Material-UI for component library
- The open-source community

---

<div align="center">
  
### ⭐ Star this repository if you find it helpful!

Made with ❤️ by [Ahmed Hamdy](https://github.com/AhmedHamdy678/)

</div>
