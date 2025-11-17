# Admin-approved Dynamic Form + PDF Generator

A full-stack application that allows users to submit dynamic forms for admin approval, with automatic PDF generation upon approval.

## 🎯 Features

- **User Authentication**: Role-based login system (Admin/User)
- **Dynamic Form Generation**: Forms are built from a server-provided schema
- **Submission Management**: Users can submit forms and track their status
- **Admin Dashboard**: Review, approve, or reject submissions
- **PDF Generation**: Automatic PDF certificate generation upon approval
- **Real-time Status Updates**: Users see their submission status in real-time
- **Responsive Design**: Beautiful UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- React Hook Form
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express
- Appwrite (Auth + Database + Storage)
- JWT Authentication
- PDFKit (PDF Generation)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- An Appwrite account (Cloud or Self-hosted)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pdfGenerator
```

### 2. Install Dependencies

Install root dependencies:
```bash
npm install
```

Install server and client dependencies:
```bash
npm run install:all
```

Or install individually:
```bash
cd server && npm install
cd ../client && npm install
```

### 3. Appwrite Setup

#### Create an Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) or your self-hosted instance
2. Create a new project
3. Note your Project ID

#### Create Database Collections

Create a database and the following collections:

**Collection 1: `users`**
- Collection ID: `users`
- Attributes:
  - `email` (String, Required, 255 characters)
  - `password` (String, Required, 255 characters) 
  - `name` (String, Required, 255 characters)
  - `role` (String, Required, 50 characters, default: "user")
  - `createdAt` (String, Required)

**Collection 2: `submissions`**
- Collection ID: `submissions`
- Attributes:
  - `userId` (String, Required, 255 characters)
  - `data` (String, Required, 10000 characters) - JSON string
  - `status` (String, Required, 50 characters, default: "pending")
  - `pdfUrl` (String, Optional, 1000 characters)
  - `adminMessage` (String, Optional, 1000 characters)
  - `createdAt` (String, Required)
  - `updatedAt` (String, Required)

#### Create Storage Bucket

1. Go to Storage in Appwrite Console
2. Create a new bucket named "pdfs"
3. Set permissions:
   - Read: Any
   - Write: Users (or specific role)
4. Note the Bucket ID

#### Generate API Key

1. Go to Settings → API Keys
2. Create a new API key with the following scopes:
   - `databases.read`
   - `databases.write`
   - `storage.read`
   - `storage.write`
3. Copy the API key

### 4. Environment Configuration

#### Server Configuration

Create `server/.env`:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

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
JWT_SECRET=your_super_secret_jwt_key_change_this
```

#### Client Configuration

Create `client/.env`:

```bash
cp client/.env.example client/.env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
```

### 5. Run the Application

#### Development Mode

Run both server and client concurrently:

```bash
npm run dev
```

Or run them separately:

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### 6. Demo Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**User Account:**
- Register a new account through the UI

⚠️ **Important**: Change the admin credentials in `server/src/routes/auth.js` before deploying to production!

## 📱 Application Flow

### User Flow

1. **Login/Register**: Users create an account or log in
2. **Fill Form**: Navigate to "New Submission" and fill out the dynamic form
3. **Submit**: Submit the form and wait for admin approval
4. **Track Status**: View submission status in "My Submissions"
5. **Download PDF**: Once approved, download the generated PDF certificate

### Admin Flow

1. **Login**: Sign in with admin credentials
2. **View Dashboard**: See statistics and pending submissions
3. **Review Submissions**: Click "View Details" to see submission data
4. **Approve/Reject**: 
   - Approve: Automatically generates a PDF and notifies the user
   - Reject: Provide a reason and notify the user
5. **Track All**: View all submissions by status (pending/approved/rejected)

## 🏗️ Project Structure

```
pdfGenerator/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── DynamicForm.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SubmissionModal.jsx
│   │   │   └── SubmissionsList.jsx
│   │   ├── contexts/      # React contexts
│   │   │   └── AuthContext.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── UserDashboard.jsx
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                # Express backend
│   ├── src/
│   │   ├── config/       # Configuration
│   │   │   └── appwrite.js
│   │   ├── middleware/   # Express middleware
│   │   │   └── auth.js
│   │   ├── routes/       # API routes
│   │   │   ├── admin.js
│   │   │   ├── auth.js
│   │   │   └── form.js
│   │   ├── utils/        # Utilities
│   │   │   └── pdfGenerator.js
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Form Management
- `GET /api/form/schema` - Get dynamic form schema
- `POST /api/form/submit` - Submit a form
- `GET /api/form/my-submissions` - Get user's submissions
- `GET /api/form/:id` - Get specific submission

### Admin Operations
- `GET /api/admin/submissions?status=pending` - Get all submissions (with optional status filter)
- `POST /api/admin/form/:id/approve` - Approve submission and generate PDF
- `POST /api/admin/form/:id/reject` - Reject submission with message

## 🔐 Security Considerations

### Development vs Production

⚠️ **This is a development setup. Before deploying to production:**

1. **Password Hashing**: Implement bcrypt for password hashing
   ```bash
   npm install bcrypt
   ```

2. **Environment Variables**: Use proper secrets management
   - Never commit `.env` files
   - Use services like Vercel/Netlify environment variables
   - Rotate API keys regularly

3. **Admin Credentials**: Store admin users in Appwrite, not hardcoded

4. **CORS Configuration**: Restrict CORS to your frontend domain

5. **Rate Limiting**: Add rate limiting to prevent abuse
   ```bash
   npm install express-rate-limit
   ```

6. **Input Validation**: Add comprehensive input validation
   - Use Zod schemas for validation
   - Sanitize user inputs

7. **HTTPS**: Always use HTTPS in production

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variables:
   - `VITE_API_URL`
   - `VITE_APPWRITE_ENDPOINT`
   - `VITE_APPWRITE_PROJECT_ID`
4. Deploy

### Backend (Render/Heroku)

**Render:**
1. Create new Web Service
2. Connect repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables from `.env`
6. Deploy

**Heroku:**
```bash
heroku create your-app-name
heroku config:set APPWRITE_ENDPOINT=...
heroku config:set APPWRITE_PROJECT_ID=...
# ... set all environment variables
git push heroku main
```

### Appwrite

Use Appwrite Cloud (https://cloud.appwrite.io/) or self-host:
- [Appwrite Installation Docs](https://appwrite.io/docs/installation)

## 🎨 Customization

### Modify Form Schema

Edit `server/src/routes/form.js` - `formSchema` object:

```javascript
const formSchema = {
  fields: [
    {
      name: 'fieldName',
      label: 'Field Label',
      type: 'text', // text, email, number, textarea, select, checkbox, date
      required: true,
      placeholder: 'Placeholder text'
    },
    // Add more fields...
  ]
};
```

### Customize PDF Layout

Edit `server/src/utils/pdfGenerator.js` to modify PDF styling and layout.

### Change Theme Colors

Edit `client/tailwind.config.js` to customize the color scheme.

## 🐛 Troubleshooting

### Common Issues

**Issue: CORS errors**
- Ensure `VITE_API_URL` in client `.env` matches your server URL
- Check CORS configuration in `server/src/index.js`

**Issue: Appwrite connection failed**
- Verify your Appwrite endpoint URL
- Check that API key has correct permissions
- Ensure Project ID is correct

**Issue: PDF not generating**
- Check server logs for errors
- Verify Appwrite storage bucket permissions
- Ensure bucket ID is correct in `.env`

**Issue: Authentication not working**
- Check JWT_SECRET is set in server `.env`
- Verify user exists in Appwrite database
- Check browser console for errors

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using React, Express, and Appwrite**


#   y a t r a s u t r a  
 