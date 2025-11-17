<div align="center">

# 📄 Yatrasutra - Admin-Approved Dynamic Form & PDF Generator

### A full-stack application for dynamic form submission with admin approval and automated PDF certificate generation

[![React](https://img.shields.io/badge/React-18.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Cloud-F02E65?logo=appwrite&logoColor=white)](https://appwrite.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [PDF Generation](#-pdf-generation)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Yatrasutra** is a comprehensive booking and form management system that streamlines the process of collecting user information, admin review, and automated certificate generation. Built specifically for tour operators and service providers who need an approval workflow with professional PDF documentation.

### Key Highlights

- 🔐 **Secure Authentication** - Role-based access control (Admin/User)
- 📝 **Dynamic Forms** - Server-driven form schema for easy customization
- ✅ **Approval Workflow** - Admin review and approval/rejection system
- 📄 **Automated PDFs** - Professional booking receipts with logo and seal
- 📊 **Real-time Dashboard** - Track submissions and statistics
- 🎨 **Beautiful UI** - Modern, responsive design with Tailwind CSS

---

## 🎯 Features

### For Users

- ✅ **Easy Registration & Login** - Secure account creation with email/password
- 📝 **Dynamic Booking Forms** - Fill out tour booking forms with validation
- 📊 **Submission Tracking** - View status of all submissions in real-time
- 🔔 **Status Notifications** - Get notified when submissions are approved/rejected
- 📥 **PDF Downloads** - Download professional booking confirmation receipts
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### For Admins

- 📈 **Dashboard Analytics** - View statistics (total, pending, approved, rejected)
- 🔍 **Submission Review** - Detailed view of all form submissions
- ✅ **One-Click Approval** - Approve submissions and auto-generate PDFs
- ❌ **Rejection with Feedback** - Reject with custom messages to users
- 🎚️ **Filter & Sort** - Filter submissions by status (all, pending, approved, rejected)
- 📄 **PDF Preview** - View generated PDFs directly from dashboard

### Technical Features

- 🔒 **JWT Authentication** - Secure token-based authentication
- 🗄️ **Appwrite Backend** - Cloud database and storage
- 📦 **File Management** - Automated PDF storage and retrieval
- 🎨 **Custom PDF Design** - Branded receipts with logo, seal, and company info
- ⚡ **Fast & Efficient** - Optimized for performance
- 🔄 **RESTful API** - Clean, documented API endpoints

---

## 🎥 Demo

### User Dashboard
Users can submit forms and track their booking status in a clean, intuitive interface.

### Admin Dashboard
Admins get a comprehensive view with statistics and easy approval workflow.

### PDF Certificate
Professional booking confirmation receipts with:
- Company logo
- Official seal
- Complete booking details
- Terms & conditions
- Authorized signature section

---

## 🛠️ Tech Stack

### Frontend
```
⚛️  React 18              - UI Library
🔀  React Router v6       - Client-side routing
📝  React Hook Form       - Form validation
🎨  Tailwind CSS          - Styling framework
📡  Axios                 - HTTP client
⚡  Vite                  - Build tool
```

### Backend
```
🟢  Node.js               - JavaScript runtime
🚂  Express               - Web framework
🔐  JWT                   - Authentication
📄  PDFKit                - PDF generation
☁️  Appwrite              - Backend-as-a-Service
```

### Infrastructure
```
🗄️  Appwrite Database    - NoSQL database
💾  Appwrite Storage      - File storage
🔑  Appwrite Auth         - User management
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (React)                        │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────┐  │
│  │   Login    │  │    User    │  │       Admin         │  │
│  │   Pages    │  │  Dashboard │  │     Dashboard       │  │
│  └────────────┘  └────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST API
┌───────────────────────────▼─────────────────────────────────┐
│                    Server (Express)                          │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────┐  │
│  │    Auth    │  │    Form    │  │       Admin         │  │
│  │   Routes   │  │   Routes   │  │       Routes        │  │
│  └────────────┘  └────────────┘  └─────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            PDF Generator (PDFKit)                     │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Appwrite Cloud                            │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────┐  │
│  │  Database  │  │  Storage   │  │        Auth         │  │
│  │   (NoSQL)  │  │   (PDFs)   │  │   (JWT/Users)       │  │
│  └────────────┘  └────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Installation

### Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** v16 or higher ([Download](https://nodejs.org/))
- ✅ **npm** or **yarn** package manager
- ✅ **Appwrite Account** - [Sign up](https://cloud.appwrite.io/) (Free)
- ✅ **Git** - For cloning the repository

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/ahmedthousifgit571/yatrasutra.git
cd yatrasutra

# 2. Install all dependencies (root, server, and client)
npm run install:all

# 3. Set up environment variables (see Configuration section)
cp server/.env.example server/.env
cp client/.env.example client/.env

# 4. Configure Appwrite (see Configuration section)

# 5. Start the development servers
npm run dev
```

The application will be available at:
- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend**: http://localhost:5000

---

## ⚙️ Configuration

### 1. Appwrite Setup

#### Step 1: Create Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/)
2. Click **"Create Project"**
3. Name it (e.g., "Yatrasutra")
4. Copy your **Project ID**

#### Step 2: Create Database

1. Go to **Databases** → **Create Database**
2. Name it (e.g., "main")
3. Copy the **Database ID**

#### Step 3: Create Collections

**Collection 1: `users`**

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| email | String | 255 | ✅ | - |
| password | String | 255 | ✅ | - |
| name | String | 255 | ✅ | - |
| role | String | 50 | ✅ | "user" |
| createdAt | String | 255 | ✅ | - |

**Permissions:**
- Read: Any
- Create: Any
- Update: Users
- Delete: Users

---

**Collection 2: `submissions`**

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| userId | String | 255 | ✅ | - |
| data | String | 10000 | ✅ | - |
| status | String | 50 | ✅ | "pending" |
| pdfUrl | String | 1000 | ❌ | - |
| adminMessage | String | 1000 | ❌ | - |
| createdAt | String | 255 | ✅ | - |
| updatedAt | String | 255 | ✅ | - |

**Permissions:**
- Read: Any
- Create: Users
- Update: Users
- Delete: Users

#### Step 4: Create Storage Bucket

1. Go to **Storage** → **Create Bucket**
2. Name it **"pdfs"**
3. Set **Maximum file size**: 10MB
4. Set **File extensions**: pdf
5. **Permissions:**
   - Read: Any
   - Create: Users
   - Update: Users
   - Delete: Users
6. Copy the **Bucket ID**

#### Step 5: Generate API Key

1. Go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Name it (e.g., "Server API Key")
4. Select scopes:
   - ✅ `databases.read`
   - ✅ `databases.write`
   - ✅ `storage.read`
   - ✅ `storage.write`
5. Copy the **API Key** (shown only once!)

### 2. Environment Variables

#### Server Configuration (`server/.env`)

```env
# Appwrite Configuration
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_API_KEY=your_api_key_here

# Database IDs
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_SUBMISSIONS_COLLECTION_ID=submissions
APPWRITE_USERS_COLLECTION_ID=users
APPWRITE_BUCKET_ID=your_bucket_id

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

#### Client Configuration (`client/.env`)

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Appwrite Configuration
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
```

### 3. Logo and Seal Images

Place your company logo and official seal in:
```
server/src/assets/
├── logo.png    (Recommended: 200x80px, transparent background)
└── seal.png    (Recommended: 200x200px, circular, transparent background)
```

---

## 🚀 Usage

### Running in Development

```bash
# Run both frontend and backend concurrently
npm run dev

# OR run separately:

# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Demo Credentials

**Admin Account:**
- 📧 Email: `admin@example.com`
- 🔑 Password: `admin123`

**User Account:**
- Create a new account via the registration page

> ⚠️ **Important**: Change admin credentials before production deployment!

### User Workflow

```
1. Register/Login
   └─→ Access User Dashboard

2. Fill Booking Form
   └─→ Enter tour details, dates, guest info, payment

3. Submit Form
   └─→ Form sent to admin for review

4. Track Status
   └─→ Monitor in "My Submissions" tab
   
5. Download PDF
   └─→ Once approved, download booking receipt
```

### Admin Workflow

```
1. Login with Admin Credentials
   └─→ Access Admin Dashboard

2. View Statistics
   └─→ See pending, approved, rejected counts

3. Review Submissions
   └─→ Click "View Details" on any submission

4. Approve or Reject
   ├─→ Approve: Auto-generates PDF certificate
   └─→ Reject: Provide feedback message

5. Manage All Submissions
   └─→ Filter by status, view history
```

---

## 🔌 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

---

### Form Endpoints

#### Get Form Schema
```http
GET /api/form/schema
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "schema": {
    "fields": [
      {
        "name": "clientName",
        "label": "Client Name",
        "type": "text",
        "required": true,
        "placeholder": "Enter full name"
      }
    ]
  }
}
```

#### Submit Form
```http
POST /api/form/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "data": {
    "clientName": "John Doe",
    "email": "john@example.com",
    "destination": "Maldives",
    "checkInDate": "2025-12-01",
    "numberOfAdults": 2,
    "packageType": "deluxe"
  }
}
```

#### Get My Submissions
```http
GET /api/form/my-submissions
Authorization: Bearer {token}
```

---

### Admin Endpoints

#### Get All Submissions
```http
GET /api/admin/submissions?status=pending
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` (optional): `all`, `pending`, `approved`, `rejected`

#### Approve Submission
```http
POST /api/admin/form/{id}/approve
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Submission approved and PDF generated",
  "submission": {
    "id": "submission_id",
    "status": "approved",
    "pdfUrl": "https://cloud.appwrite.io/.../file.pdf"
  }
}
```

#### Reject Submission
```http
POST /api/admin/form/{id}/reject
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "Please provide valid travel dates"
}
```

---

## 📄 PDF Generation

### Features

The system automatically generates professional PDF booking receipts with:

✅ **Company Branding**
- Logo at the top
- Official seal at the bottom
- Company name and registration details

✅ **Booking Information**
- Invoice number and date
- Client details (name, email, contact)
- Destination and travel dates
- Package type and meal plan
- Number of guests

✅ **Financial Details**
- Cost breakdown per adult
- Total package value
- Advance amount received
- Balance payable

✅ **Legal Information**
- Terms and conditions
- Cancellation policy
- Authorized signatory section

✅ **Professional Design**
- Watermark background
- Clean table layouts
- Color-coded sections
- Single or double-page format

### PDF Layout

```
┌─────────────────────────────────────────┐
│          [COMPANY LOGO]                 │
│    BOOKING CONFIRMATION RECEIPT         │
│    Registered Address & Contact         │
├─────────────────────────────────────────┤
│  INVOICE DETAILS                        │
│  ┌─────────────────────────────────┐   │
│  │ Invoice No:  YS/INV/2025/071    │   │
│  │ Payment:     Advance Paid       │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  CLIENT DETAILS                         │
│  ┌─────────────────────────────────┐   │
│  │ Name:    John Doe               │   │
│  │ Email:   john@example.com       │   │
│  │ Contact: +91 9876543210         │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  BOOKING SUMMARY                        │
│  [Table: Destination, Duration, etc.]   │
├─────────────────────────────────────────┤
│  COST BREAKDOWN                         │
│  [Table: Items, Qty, Rate, Amount]      │
├─────────────────────────────────────────┤
│  TERMS & NOTES                          │
│  • Payment terms                        │
│  • Cancellation policy                  │
├─────────────────────────────────────────┤
│  Authorized Signatory                   │
│  (Seal & Signature)                     │
│                                         │
│          [OFFICIAL SEAL]                │
│    YATRASUTRA HOLIDAYS PVT LTD          │
└─────────────────────────────────────────┘
```

### Customizing PDF

To modify the PDF layout, edit `server/src/utils/pdfGenerator.js`:

```javascript
// Change colors
const primaryColor = '#1e3a8a';  // Dark blue
const orangeColor = '#f97316';    // Orange

// Modify seal size
const sealSize = 100; // pixels

// Update company information
const companyInfo = {
  name: 'Your Company Name',
  address: 'Your Address',
  phone: 'Your Phone',
  email: 'Your Email'
};
```

---

## 🎨 Customization

### Change Form Fields

Edit `server/src/routes/form.js`:

```javascript
const formSchema = {
  fields: [
    {
      name: 'customField',
      label: 'Custom Field Label',
      type: 'text',        // text, email, number, date, select, textarea, checkbox
      required: true,
      placeholder: 'Enter value',
      options: []          // For select fields
    }
  ]
};
```

### Update Theme Colors

Edit `client/tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    }
  }
};
```

### Modify UI Components

- **Login Page**: `client/src/pages/Login.jsx`
- **User Dashboard**: `client/src/pages/UserDashboard.jsx`
- **Admin Dashboard**: `client/src/pages/AdminDashboard.jsx`
- **Form Component**: `client/src/components/DynamicForm.jsx`

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Set **Root Directory**: `client`

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   ```

5. **Deploy** ✅

---

### Backend Deployment (Render)

1. **Create Web Service**
   - Go to [Render](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: `yatrasutra-api`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   Add all variables from `server/.env`

4. **Deploy** ✅

---

### Production Checklist

Before going live:

- [ ] Change admin credentials
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Implement password hashing (bcrypt)
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure backup strategy
- [ ] Update Appwrite permissions
- [ ] Test all workflows
- [ ] Prepare support documentation

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><strong>CORS Errors</strong></summary>

**Problem**: Frontend can't connect to backend

**Solution**:
1. Check `VITE_API_URL` in `client/.env` matches your backend URL
2. Verify CORS configuration in `server/src/index.js`:
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.com'
   }));
   ```
</details>

<details>
<summary><strong>Appwrite Connection Failed</strong></summary>

**Problem**: Can't connect to Appwrite

**Solution**:
1. Verify endpoint URL is correct
2. Check Project ID matches
3. Ensure API key has correct scopes
4. Test connection in Appwrite Console
</details>

<details>
<summary><strong>PDF Not Generating</strong></summary>

**Problem**: Approval doesn't create PDF

**Solution**:
1. Check server logs for errors
2. Verify bucket permissions in Appwrite
3. Ensure bucket ID is correct in `.env`
4. Check logo/seal images exist in `server/src/assets/`
5. Verify storage quotas in Appwrite
</details>

<details>
<summary><strong>Authentication Not Working</strong></summary>

**Problem**: Can't login or register

**Solution**:
1. Check `JWT_SECRET` is set in `server/.env`
2. Verify user collection exists in Appwrite
3. Check permissions on users collection
4. Clear browser localStorage and cookies
5. Check network tab for API errors
</details>

<details>
<summary><strong>Build Errors</strong></summary>

**Problem**: Application won't build

**Solution**:
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. Check Node.js version (use v16+)
3. Verify all environment variables are set
4. Check for syntax errors in code
</details>

---

## 📂 Project Structure

```
yatrasutra/
│
├── client/                          # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images, fonts, etc.
│   │   │   ├── logo.png
│   │   │   └── seal.png
│   │   ├── components/              # Reusable components
│   │   │   ├── DynamicForm.jsx      # Form builder
│   │   │   ├── ProtectedRoute.jsx   # Auth guard
│   │   │   ├── SubmissionModal.jsx  # Details modal
│   │   │   └── SubmissionsList.jsx  # List view
│   │   ├── contexts/                # React contexts
│   │   │   └── AuthContext.jsx      # Auth state
│   │   ├── pages/                   # Page components
│   │   │   ├── AdminDashboard.jsx   # Admin UI
│   │   │   ├── Login.jsx            # Auth page
│   │   │   └── UserDashboard.jsx    # User UI
│   │   ├── services/                # API integration
│   │   │   └── api.js               # Axios config
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── .env.example                 # Environment template
│   ├── package.json
│   ├── tailwind.config.js           # Tailwind config
│   └── vite.config.js               # Vite config
│
├── server/                          # Express Backend
│   ├── src/
│   │   ├── assets/                  # Server assets
│   │   │   ├── logo.png             # PDF logo
│   │   │   └── seal.png             # PDF seal
│   │   ├── config/                  # Configuration
│   │   │   └── appwrite.js          # Appwrite setup
│   │   ├── middleware/              # Express middleware
│   │   │   └── auth.js              # JWT verification
│   │   ├── routes/                  # API routes
│   │   │   ├── admin.js             # Admin endpoints
│   │   │   ├── auth.js              # Auth endpoints
│   │   │   └── form.js              # Form endpoints
│   │   ├── utils/                   # Utilities
│   │   │   └── pdfGenerator.js      # PDF creation
│   │   └── index.js                 # Server entry
│   ├── temp/                        # Temporary files
│   ├── .env.example                 # Environment template
│   └── package.json
│
├── .gitignore                       # Git ignore rules
├── package.json                     # Root package.json
├── README.md                        # This file
└── LICENSE                          # MIT License
```

---



### Code Style

- Follow existing code style
- Use meaningful variable names
- Comment complex logic
- Write clean, readable code
- Test your changes

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Yatrasutra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Express](https://expressjs.com/) - Backend Framework
- [Appwrite](https://appwrite.io/) - Backend-as-a-Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [PDFKit](http://pdfkit.org/) - PDF Generation
- All contributors and users of this project

---

## 📧 Support

Need help? Have questions?

- 📫 **Email**: support@yatrasutra.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/ahmedthousifgit571/yatrasutra/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/ahmedthousifgit571/yatrasutra/discussions)

---



## 📊 Stats

![GitHub Stars](https://img.shields.io/github/stars/ahmedthousifgit571/yatrasutra?style=social)
![GitHub Forks](https://img.shields.io/github/forks/ahmedthousifgit571/yatrasutra?style=social)
![GitHub Issues](https://img.shields.io/github/issues/ahmedthousifgit571/yatrasutra)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ahmedthousifgit571/yatrasutra)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!



[⬆ Back to Top](#-yatrasutra---admin-approved-dynamic-form--pdf-generator)

</div>
