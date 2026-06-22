# ATSPro Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Deployment (Render)](#backend-deployment)
4. [Frontend Deployment (Vercel)](#frontend-deployment)
5. [Docker Deployment](#docker-deployment)
6. [GitHub Actions CI/CD](#github-actions-cicd)

---

## Prerequisites

- GitHub account
- MongoDB Atlas account (free tier available)
- Render account (free tier available)
- Vercel account (free tier available)
- Google Gemini API key

---

## MongoDB Atlas Setup

1. **Create Account:** Go to [cloud.mongodb.com](https://cloud.mongodb.com) and sign up

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "FREE" shared cluster
   - Select region closest to your users
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Set privileges to "Read and Write to any database"

4. **Whitelist IP Addresses:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add `0.0.0.0/0` for all IPs (or specific IPs for production)

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

---

## Backend Deployment (Render)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render Account:** Go to [render.com](https://render.com) and sign up

3. **Create Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** atspro-api
     - **Root Directory:** server
     - **Runtime:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

4. **Add Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=<your_mongodb_atlas_uri>
   JWT_SECRET=<generate_random_string>
   JWT_EXPIRE=7d
   GEMINI_API_KEY=<your_gemini_api_key>
   CLIENT_URL=<your_vercel_url>
   ```

5. **Deploy:** Click "Create Web Service"

---

## Frontend Deployment (Vercel)

1. **Create Vercel Account:** Go to [vercel.com](https://vercel.com) and sign up

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Create React App
     - **Root Directory:** client
     - **Build Command:** `npm run build`
     - **Output Directory:** build

3. **Add Environment Variables:**
   ```
   REACT_APP_API_URL=https://atspro-api.onrender.com/api
   ```

4. **Deploy:** Click "Deploy"

---

## Docker Deployment

### Local Docker Setup

```bash
# Clone repository
git clone https://github.com/yourusername/ATSPro.git
cd ATSPro

# Create .env file in server directory with your variables

# Build and start containers
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Docker Hub Deployment

```bash
# Build images
docker build -t yourusername/atspro-server ./server
docker build -t yourusername/atspro-client ./client

# Login to Docker Hub
docker login

# Push images
docker push yourusername/atspro-server
docker push yourusername/atspro-client
```

---

## GitHub Actions CI/CD

### Setup Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

| Secret Name | Description |
|-------------|-------------|
| `RENDER_SERVICE_ID` | Render service ID |
| `RENDER_API_KEY` | Render API key |
| `VERCEL_TOKEN` | Vercel deployment token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

### How to Get These Values

**Render:**
1. Go to your Render dashboard
2. Click on your service
3. Go to "Settings"
4. Find the Service ID
5. For API key, go to Account Settings → API Keys

**Vercel:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login`
3. Run `vercel link` in client directory
4. Check `.vercel/project.json` for IDs
5. Generate token at Vercel Settings → Tokens

---

## Post-Deployment Checklist

- [ ] Test registration and login
- [ ] Create a resume
- [ ] Run ATS check
- [ ] Test job match
- [ ] Verify AI suggestions work
- [ ] Check mobile responsiveness
- [ ] Verify error handling
- [ ] Test logout functionality

---

## Troubleshooting

### CORS Errors
- Ensure `CLIENT_URL` in server matches your Vercel URL exactly
- Check that the URL includes `https://`

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check database user credentials
- Ensure connection string is correct

### Build Failures
- Check Node.js version (should be 18+)
- Verify all environment variables are set
- Check build logs for specific errors

### API Not Responding
- Check Render service logs
- Verify environment variables
- Ensure MongoDB Atlas is accessible
