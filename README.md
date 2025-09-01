# QuickPay Digital Wallet

A full-featured **digital wallet system** built with **React.js, TypeScript, TailwindCSS, Redux, and Node.js**. QuickPay allows Users, Agents, and Admins to manage transactions securely with role-based dashboards, advanced filtering, and interactive UI.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Project Structure](#project-structure)  
 

---

## Project Overview

QuickPay is designed to handle **digital payments** efficiently with role-based access:

- **Public Landing Pages**: Home, About, Features, Pricing, FAQ, Contact  
- **Authentication**: Login, Registration, Role-based redirection, JWT-based auth  
- **User Dashboard**: Wallet balance, quick actions, transaction history, deposit, withdraw, send money, profile management  
- **Agent Dashboard**: Cash-in/out management, transaction overview, profile management  
- **Admin Dashboard**: Overview of users/agents/transactions, user/agent management, advanced filtering, fee adjustments, profile management  

The UI is **fully responsive**, interactive, and uses **skeleton loaders** for smooth user experience.

---

## Features

### Public Pages
- **Home Page**: Hero section, sticky navbar, call-to-action buttons, responsive layout  
- **About Page**: Service story, mission, team details  
- **Features Page**: List of features with icons and visuals  
- **Pricing Page**: Subscription tiers and service fees (optional)  
- **Contact Page**: Inquiry form with simulated submission  
- **FAQ Page**: Common questions and answers  

### Authentication
- Login & Registration with role selection (User/Agent)  
- JWT-based authentication  
- Persisted login state and logout functionality  

### User Dashboard
- Wallet balance display  
- Quick actions (Deposit, Withdraw, Send Money)  
- Transaction history with **pagination**, **filters by type/date/amount**  
- Profile management (update name, phone, password)  

### Agent Dashboard
- Overview with cash-in/out summary  
- Deposit and withdraw money for users  
- Transaction history and optional commission history  
- Profile management  

### Admin Dashboard
- Total users, agents, transaction count, and volume  
- Manage users and agents (block, unblock, approve, suspend)  
- View all transactions with **search**, **filters**, and **pagination**  
- Adjust system fees/limits (optional)  
- Profile management  

### General Features
- Role-based navigation  
- Form validation and error handling  
- Data visualization: cards, tables
- Toast notifications for success/error messages  
- Light/Dark theme toggle  
- Skeleton loaders for better UX  
- Fully responsive and accessible design  

---

## Tech Stack

**Frontend**
- React.js + TypeScript  
- TailwindCSS  
- Redux Toolkit & RTK Query  
- React Router  
- React Icons  
- React Hook Form + Zod (form validation)   
- Sonner (toast notifications)  

**Backend**
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Nodemailer (email notifications)  
- EJS templating for email templates  

---

## Installation

1. **Clone the repository**

# git clone

```bash
 https://github.com/yourusername/quickpay-digital-wallet.git
 cd quickpay-digital-wallet
```

2. **Install Dependencies**

```bash
npm install
```



3. **Start the Development Server**
```bash
npm run dev
```



## Project Structure

```bash
frontend/
 ├─ src/
 │   ├─ components/
 │   ├─ pages/
 │   ├─ redux/
 │   ├─ utils/
 │   └─ App.tsx
backend/
 ├─ src/
 │   ├─ modules/
 │   │   ├─ auth/
 │   │   ├─ user/
 │   │   ├─ admin/
 │   │   └─ agent/
 │   ├─ config/
 │   ├─ middlewares/
 │   ├─ utils/
 │   └─ server.ts

```