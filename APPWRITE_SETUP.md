# Appwrite Setup Guide

This guide will walk you through setting up Appwrite for the PDF Generator application.

## Step 1: Create Appwrite Account

1. Go to https://cloud.appwrite.io/
2. Sign up for a free account or log in
3. Create a new project
4. Name it "PDF Generator" (or any name you prefer)
5. Copy your **Project ID** - you'll need this later

## Step 2: Create Database

1. In the Appwrite Console, go to **Databases**
2. Click **"Create Database"**
3. Name it "pdfgenerator" (or any name)
4. Copy the **Database ID** - you'll need this later

## Step 3: Create Collections

### Collection 1: Users Collection

1. Inside your database, click **"Add Collection"**
2. Collection Name: `users`
3. Collection ID: `users` (or let it auto-generate)
4. Click **Create**

**Add Attributes:**

Click on the collection, then **"Attributes"**, then add the following:

| Attribute | Type | Size | Required | Default | Array |
|-----------|------|------|----------|---------|-------|
| email | String | 255 | ✓ | - | ✗ |
| password | String | 255 | ✓ | - | ✗ |
| name | String | 255 | ✓ | - | ✗ |
| role | String | 50 | ✓ | user | ✗ |
| createdAt | String | 100 | ✓ | - | ✗ |

**Set Permissions:**
- Go to **Settings** tab
- Under **Permissions**:
  - Read Access: `any`
  - Create Access: `any`
  - Update Access: `users`
  - Delete Access: `users`

### Collection 2: Submissions Collection

1. Click **"Add Collection"** again
2. Collection Name: `submissions`
3. Collection ID: `submissions`
4. Click **Create**

**Add Attributes:**

| Attribute | Type | Size | Required | Default | Array |
|-----------|------|------|----------|---------|-------|
| userId | String | 255 | ✓ | - | ✗ |
| data | String | 10000 | ✓ | - | ✗ |
| status | String | 50 | ✓ | pending | ✗ |
| pdfUrl | String | 1000 | ✗ | - | ✗ |
| adminMessage | String | 1000 | ✗ | - | ✗ |
| createdAt | String | 100 | ✓ | - | ✗ |
| updatedAt | String | 100 | ✓ | - | ✗ |

**Set Permissions:**
- Read Access: `users`
- Create Access: `users`
- Update Access: `any` (for admin updates)
- Delete Access: `users`

## Step 4: Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **"Add Bucket"**
3. Bucket Name: `pdfs`
4. Bucket ID: Copy this ID - you'll need it
5. Click **Create**

**Set Permissions:**
- Go to bucket **Settings**
- Under **Permissions**:
  - Read Access: `any` (so users can download their PDFs)
  - Create Access: `users`
  - Update Access: `users`
  - Delete Access: `users`

**Configure File Settings:**
- Maximum File Size: `10 MB` (or as needed)
- Allowed File Extensions: `pdf`
- Compression: None
- Encryption: Enabled (recommended)

## Step 5: Generate API Key

1. Go to **Settings** → **API Keys**
2. Click **"Add API Key"**
3. Name: `Server API Key`
4. Expiration: `Never` (or set as needed)
5. Scopes - Select the following:
   - ✓ `databases.read`
   - ✓ `databases.write`
   - ✓ `documents.read`
   - ✓ `documents.write`
   - ✓ `storage.read`
   - ✓ `storage.write`
   - ✓ `files.read`
   - ✓ `files.write`
6. Click **Create**
7. **IMPORTANT**: Copy the API key immediately - it won't be shown again!

## Step 6: Configure Environment Variables

Now that you have all the IDs, update your `.env` files:

### Server .env (`server/.env`)

```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id_from_step1
APPWRITE_API_KEY=your_api_key_from_step5

APPWRITE_DATABASE_ID=your_database_id_from_step2
APPWRITE_SUBMISSIONS_COLLECTION_ID=submissions
APPWRITE_USERS_COLLECTION_ID=users
APPWRITE_BUCKET_ID=your_bucket_id_from_step4

PORT=5000
NODE_ENV=development
JWT_SECRET=change_this_to_a_random_secure_string
```

### Client .env (`client/.env`)

```env
VITE_API_URL=http://localhost:5000
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_from_step1
```

## Step 7: Test the Connection

1. Start your server:
   ```bash
   cd server
   npm run dev
   ```

2. Check the console for any Appwrite connection errors

3. Start your client:
   ```bash
   cd client
   npm run dev
   ```

4. Try registering a new user to test database connection

## Troubleshooting

### Error: "Project not found"
- Double-check your Project ID in `.env`
- Make sure you're using the correct Appwrite endpoint

### Error: "Unauthorized"
- Verify your API key is correct
- Check that the API key has the necessary permissions
- Make sure the API key hasn't expired

### Error: "Collection not found"
- Verify collection IDs match in your `.env`
- Make sure you created both collections
- Check for typos in collection IDs

### Error: "Storage bucket not found"
- Verify bucket ID in `.env`
- Make sure the bucket was created successfully

### Permission Errors
- Review the permission settings in each collection
- Ensure `any` or `users` permissions are set correctly
- Check that authenticated users have access

## Self-Hosted Appwrite

If you're using a self-hosted Appwrite instance:

1. Update `APPWRITE_ENDPOINT` to your server URL:
   ```env
   APPWRITE_ENDPOINT=http://localhost/v1
   # or
   APPWRITE_ENDPOINT=https://your-domain.com/v1
   ```

2. Make sure your Appwrite instance is running:
   ```bash
   docker ps
   ```

3. Follow the same setup steps above in your self-hosted console

## Security Best Practices

1. **Never commit** `.env` files to version control
2. **Rotate API keys** regularly
3. **Use different API keys** for development and production
4. **Set appropriate permissions** on collections and buckets
5. **Enable encryption** for sensitive data
6. **Use HTTPS** in production
7. **Implement rate limiting** on API endpoints

## Need Help?

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord](https://appwrite.io/discord)
- [Appwrite GitHub](https://github.com/appwrite/appwrite)

---

Once you've completed all these steps, you're ready to run the application! 🚀



