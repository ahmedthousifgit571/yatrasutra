# Quick Start Guide

Get the PDF Generator app running in 5 minutes!

## Prerequisites

- Node.js v16+ installed
- npm or yarn
- Appwrite account (free at https://cloud.appwrite.io)

## Step 1: Install Dependencies (2 minutes)

```bash
# Install all dependencies at once
npm run install:all
```

Or install separately:
```bash
npm install
cd server && npm install
cd ../client && npm install
```

## Step 2: Set Up Appwrite (2 minutes)

Follow the **[APPWRITE_SETUP.md](./APPWRITE_SETUP.md)** guide to:
1. Create an Appwrite project
2. Set up database and collections
3. Create storage bucket
4. Generate API key

**Quick checklist**:
- [ ] Created project (copy Project ID)
- [ ] Created database (copy Database ID)
- [ ] Created `users` collection
- [ ] Created `submissions` collection  
- [ ] Created `pdfs` storage bucket (copy Bucket ID)
- [ ] Generated API key with database + storage permissions

## Step 3: Configure Environment Variables (1 minute)

### Server Configuration

Create `server/.env`:
```bash
cd server
cp .env.example .env
```

Edit `server/.env` and fill in your Appwrite details:
```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=YOUR_PROJECT_ID_HERE
APPWRITE_API_KEY=YOUR_API_KEY_HERE
APPWRITE_DATABASE_ID=YOUR_DATABASE_ID_HERE
APPWRITE_SUBMISSIONS_COLLECTION_ID=submissions
APPWRITE_USERS_COLLECTION_ID=users
APPWRITE_BUCKET_ID=YOUR_BUCKET_ID_HERE
PORT=5000
NODE_ENV=development
JWT_SECRET=change_this_to_something_random_and_secure
```

### Client Configuration

Create `client/.env`:
```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID_HERE
```

## Step 4: Start the Application (30 seconds)

From the root directory:

```bash
npm run dev
```

This starts both server and client concurrently!

Or run them separately:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## Step 5: Open and Test (30 seconds)

1. Open your browser to: **http://localhost:3000**
2. You'll see the login page
3. Use these demo credentials:
   - **Admin**: `admin@example.com` / `admin123`
   - **User**: Click "Create new account" to register

## What's Next?

### Test the Full Flow

1. **Register as a User**:
   - Click "Create new account"
   - Fill in your details
   - You'll be redirected to the user dashboard

2. **Submit a Form**:
   - Fill out the application form
   - Click "Submit Application"
   - See your pending submission

3. **Approve as Admin**:
   - Logout and login as admin (`admin@example.com` / `admin123`)
   - See the pending submission
   - Click "View Details" then "Approve & Generate PDF"
   - PDF will be generated!

4. **Download PDF**:
   - Logout and login as the user again
   - Go to "My Submissions"
   - Your approved submission now has a "Download PDF" button
   - Click to view your certificate!

## Troubleshooting

### "Cannot connect to database"
- Check your Appwrite credentials in `server/.env`
- Verify your API key has correct permissions
- Make sure collections are created with correct IDs

### "CORS error"
- Ensure server is running on port 5000
- Check `VITE_API_URL` in `client/.env` is correct
- Server should automatically handle CORS for localhost

### "Port already in use"
- Change `PORT` in `server/.env`
- Update `VITE_API_URL` in `client/.env` to match
- Update proxy in `client/vite.config.js`

### "Module not found"
- Run `npm run install:all` again
- Make sure you're in the correct directory
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Project Structure

```
pdfGenerator/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── server/           # Express backend
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   └── package.json
└── README.md
```

## Features at a Glance

✅ **User Registration & Authentication**
✅ **Dynamic Form Generation** from server schema
✅ **Form Submission** with validation
✅ **Admin Dashboard** with statistics
✅ **Approve/Reject** submissions
✅ **PDF Generation** on approval
✅ **Status Tracking** for users
✅ **Responsive UI** with Tailwind CSS

## Important URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **Appwrite Console**: https://cloud.appwrite.io

## Default Credentials

⚠️ **Change these in production!**

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**Location**: `server/src/routes/auth.js`

## Next Steps

1. **Customize the form** - Edit `server/src/routes/form.js`
2. **Change PDF design** - Edit `server/src/utils/pdfGenerator.js`
3. **Update styling** - Modify `client/tailwind.config.js` and CSS
4. **Add features** - See [README.md](./README.md) for architecture
5. **Deploy** - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

## Need Help?

- 📖 **Full Documentation**: [README.md](./README.md)
- 🔧 **Appwrite Setup**: [APPWRITE_SETUP.md](./APPWRITE_SETUP.md)
- 🧪 **Testing Guide**: [TESTING.md](./TESTING.md)
- 🚀 **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)

## Common Customizations

### Change Form Fields

Edit `server/src/routes/form.js` - `formSchema` object:
```javascript
{
  name: 'fieldName',
  label: 'Display Label',
  type: 'text', // text, email, number, textarea, select, checkbox, date
  required: true,
  placeholder: 'Placeholder text'
}
```

### Change Theme Colors

Edit `client/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Change these values
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
      },
    },
  },
}
```

### Customize PDF Layout

Edit `server/src/utils/pdfGenerator.js` - full control over PDF appearance.

---

**You're all set! 🎉**

Your PDF Generator application is now running locally. Start by registering a user and testing the submission flow!


