# Deployment Guide

This guide covers deploying the PDF Generator application to production.

## Overview

We'll deploy:
- **Frontend**: Vercel (recommended) or Netlify
- **Backend**: Render (recommended), Heroku, or Railway
- **Database/Storage**: Appwrite Cloud (already set up)

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Appwrite project set up and configured
- Domain name (optional, but recommended)

---

## Part 1: Deploy Backend (Render)

Render is recommended for its simplicity and free tier.

### Step 1: Prepare Backend for Deployment

1. Ensure `server/package.json` has a start script:
   ```json
   {
     "scripts": {
       "start": "node src/index.js",
       "dev": "nodemon src/index.js"
     }
   }
   ```

2. Make sure all environment variables are documented in `server/.env.example`

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up or log in
3. Connect your GitHub account

### Step 3: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your repository
3. Configure the service:
   - **Name**: `pdf-generator-api` (or your choice)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (or upgrade as needed)

### Step 4: Add Environment Variables

In the "Environment" section, add all variables from your `server/.env`:

```
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_SUBMISSIONS_COLLECTION_ID=submissions
APPWRITE_USERS_COLLECTION_ID=users
APPWRITE_BUCKET_ID=your_bucket_id
PORT=5000
NODE_ENV=production
JWT_SECRET=your_production_jwt_secret
```

⚠️ **Important**: Use a different, secure JWT_SECRET for production!

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (3-5 minutes)
3. Copy your backend URL (e.g., `https://pdf-generator-api.onrender.com`)

### Step 6: Test Backend

Test your API:
```bash
curl https://your-api-url.onrender.com/health
```

You should get: `{"status":"ok","message":"Server is running"}`

---

## Part 2: Deploy Frontend (Vercel)

### Step 1: Prepare Frontend for Deployment

1. Update `client/vite.config.js` if needed:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     build: {
       outDir: 'dist',
     },
   });
   ```

2. Ensure `client/.env.example` is documented

### Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Sign up or log in
3. Connect your GitHub account

### Step 3: Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your Git repository
3. Configure project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 4: Add Environment Variables

Add these environment variables:

```
VITE_API_URL=https://your-render-backend-url.onrender.com
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
```

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for deployment (1-3 minutes)
3. Your app will be live at `https://your-app.vercel.app`

### Step 6: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

---

## Part 3: Update Appwrite for Production

### Step 1: Add Production URLs

1. Go to Appwrite Console
2. Navigate to your project **Settings**
3. Under **Platforms**, add:
   - **Web Platform**
   - Name: `Production Frontend`
   - Hostname: `your-vercel-domain.vercel.app` (or custom domain)

### Step 2: Update CORS Settings

Ensure your Vercel URL is allowed in Appwrite CORS settings.

### Step 3: Update Collection Permissions

Review and tighten permissions if needed for production.

---

## Alternative Deployment Options

### Backend: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set env vars: `heroku config:set KEY=VALUE`
5. Deploy: `git subtree push --prefix server heroku main`

### Backend: Railway

1. Go to https://railway.app
2. Create new project from GitHub
3. Select `server` folder as root
4. Add environment variables
5. Deploy

### Frontend: Netlify

1. Go to https://netlify.com
2. Import from Git
3. Build command: `npm run build`
4. Publish directory: `client/dist`
5. Add environment variables
6. Deploy

---

## Post-Deployment Checklist

### Security

- [ ] Change default admin credentials
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS everywhere
- [ ] Set up rate limiting
- [ ] Implement password hashing (bcrypt)
- [ ] Review Appwrite permissions
- [ ] Enable Appwrite encryption
- [ ] Set up monitoring and alerts

### Performance

- [ ] Enable caching headers
- [ ] Optimize images
- [ ] Add CDN for static assets
- [ ] Monitor API response times
- [ ] Set up database indexes in Appwrite

### Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Configure logging
- [ ] Set up uptime monitoring
- [ ] Monitor server resources
- [ ] Track user analytics (optional)

### Backup

- [ ] Set up Appwrite backups
- [ ] Document recovery procedures
- [ ] Test restore process

---

## Environment Variables Reference

### Backend (Production)

```env
# Appwrite
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=
APPWRITE_DATABASE_ID=
APPWRITE_SUBMISSIONS_COLLECTION_ID=
APPWRITE_USERS_COLLECTION_ID=
APPWRITE_BUCKET_ID=

# Server
PORT=5000
NODE_ENV=production
JWT_SECRET=
```

### Frontend (Production)

```env
VITE_API_URL=https://your-backend-url.com
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=
```

---

## Troubleshooting

### Backend not responding
- Check Render/Heroku logs
- Verify environment variables
- Test Appwrite connection
- Check CORS settings

### Frontend can't connect to backend
- Verify VITE_API_URL is correct
- Check CORS configuration
- Inspect browser console
- Test API endpoints directly

### Appwrite errors in production
- Verify platform URLs are added
- Check API key permissions
- Review collection permissions
- Ensure bucket is accessible

### PDF generation failing
- Check server logs
- Verify Appwrite storage permissions
- Test bucket access
- Check file size limits

---

## Scaling Considerations

### When to Scale

- **Response time** > 500ms consistently
- **Error rate** > 1%
- **User count** > 1000 active users
- **Storage** > 80% capacity

### How to Scale

1. **Upgrade server plan** (Render/Heroku)
2. **Add caching layer** (Redis)
3. **Implement CDN** (Cloudflare)
4. **Database optimization** (indexes, queries)
5. **Horizontal scaling** (multiple server instances)

---

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Appwrite Docs](https://appwrite.io/docs)

---

**Your app is now live! 🎉**

Remember to monitor your application and respond to any issues promptly.


