<div align="center">

# ATSPro - AI Resume Builder & ATS Checker

### Build Resumes That Pass ATS & Land Interviews

[![CI/CD](https://github.com/yourusername/ATSPro/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/ATSPro/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/ATSPro/pulls)

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

</div>

---

## Live Demo

**Frontend:** [https://atspro.vercel.app](https://atspro.vercel.app)
**Backend:** [https://atspro-api.onrender.com](https://atspro-api.onrender.com)

---

## Features

### Core Features
- User Authentication (JWT + Cookies)
- Resume Builder with Drag & Drop
- 5 Professional Resume Templates
- ATS Score Checker with AI Analysis
- Resume vs Job Description Matching
- AI-Powered Resume Suggestions (Gemini API)
- PDF Resume Download
- Dashboard Analytics
- Profile Management

### Technical Features
- Full-Stack MERN Application
- MVC Architecture (Server)
- RESTful API with Validation
- Rate Limiting & Security Headers
- MongoDB Atlas with Mongoose
- Docker Containerization
- GitHub Actions CI/CD
- Responsive Design (Mobile-First)

---

## Tech Stack

### Frontend
- React.js 18
- Tailwind CSS 3
- React Router v6
- Axios for API calls
- React Hot Toast
- Recharts for Charts
- Framer Motion for Animations
- Heroicons for Icons

### Backend
- Node.js 18
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Express Validator
- Helmet (Security)
- Morgan (Logging)
- Winston (Logger)
- Rate Limiting

### AI Integration
- Google Gemini API
- Resume Analysis
- Job Matching
- Content Suggestions

### DevOps
- Docker & Docker Compose
- GitHub Actions CI/CD
- Vercel (Frontend Hosting)
- Render (Backend Hosting)
- MongoDB Atlas (Database)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (React)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Landing  │  │Dashboard │  │  Resume  │  │   ATS    │    │
│  │   Page    │  │          │  │ Builder  │  │ Checker  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │   Auth   │  │   Job    │  │ Profile  │                  │
│  │  Pages   │  │  Match   │  │          │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Server (Express)                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Middleware Layer                     │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐     │  │
│  │  │  Auth  │  │  Rate  │  │  CORS  │  │Logger │     │  │
│  │  │  JWT   │  │ Limit  │  │        │  │        │     │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Controllers                         │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐     │  │
│  │  │  Auth  │  │Resume │  │  ATS   │  │ Job    │     │  │
│  │  │        │  │        │  │        │  │ Match  │     │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Models (Mongoose)                   │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐     │  │
│  │  │  User  │  │Resume │  │ATS     │  │Job     │     │  │
│  │  │        │  │        │  │Report  │  │Match   │     │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Atlas Database                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Users   │  │ Resumes  │  │ATS       │  │Job       │   │
│  │Collection│  │Collection│  │Reports   │  │Matches   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Gemini AI Integration                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  Resume  │  │   Job    │  │ Content  │                  │
│  │ Analysis │  │ Matching │  │Suggester │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Resume Builder
![Resume Builder](screenshots/resume-builder.png)

### ATS Score Checker
![ATS Checker](screenshots/ats-checker.png)

### Job Match Analyzer
![Job Match](screenshots/job-match.png)

---

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Google Gemini API key
- Docker (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ATSPro.git
cd ATSPro
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Set Up Environment Variables

Create `.env` files in both `server/` and `client/` directories.

**Server (.env):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/atspro
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:3000
```

**Client (.env):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## Environment Variables

### Server

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_EXPIRE` | JWT token expiration | No | 7d |
| `GEMINI_API_KEY` | Google Gemini API key | Yes | - |
| `CLIENT_URL` | Frontend URL for CORS | No | http://localhost:3000 |

### Client

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API URL | Yes |

---

## API Documentation

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Private |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/profile` | Update profile | Private |
| PUT | `/api/auth/password` | Change password | Private |

### Resumes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/resumes` | Get all resumes | Private |
| GET | `/api/resumes/:id` | Get single resume | Private |
| POST | `/api/resumes` | Create resume | Private |
| PUT | `/api/resumes/:id` | Update resume | Private |
| DELETE | `/api/resumes/:id` | Delete resume | Private |
| POST | `/api/resumes/:id/duplicate` | Duplicate resume | Private |

### ATS Checker

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/ats/check` | Check ATS score | Private |
| GET | `/api/ats/reports` | Get report history | Private |
| GET | `/api/ats/reports/:id` | Get single report | Private |

### Job Match

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/job-match/analyze` | Analyze job match | Private |
| GET | `/api/job-match/history` | Get match history | Private |
| GET | `/api/job-match/:id` | Get single match | Private |
| DELETE | `/api/job-match/:id` | Delete match | Private |

### AI Features

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/ai/suggestions` | Get AI suggestions | Private |
| POST | `/api/ai/generate-summary` | Generate summary | Private |

### Dashboard

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/dashboard/stats` | Get dashboard stats | Private |

---

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  phone: String,
  headline: String,
  location: String,
  linkedin: String,
  portfolio: String,
  plan: Enum ['free', 'pro', 'enterprise'],
  usageCount: {
    resumesCreated: Number,
    atsChecks: Number,
    aiSuggestions: Number
  },
  lastLogin: Date,
  isActive: Boolean,
  timestamps: true
}
```

### Resumes Collection
```javascript
{
  user: ObjectId (ref: User),
  title: String,
  template: Enum ['modern', 'professional', 'minimal', 'creative', 'executive'],
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    portfolio: String,
    github: String,
    summary: String
  },
  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    isCurrent: Boolean,
    description: String,
    achievements: [String]
  }],
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
    gpa: String
  }],
  skills: [{
    category: String,
    items: [String]
  }],
  atsScore: {
    score: Number,
    lastChecked: Date,
    suggestions: [String]
  },
  timestamps: true
}
```

### ATS Reports Collection
```javascript
{
  user: ObjectId (ref: User),
  resume: ObjectId (ref: Resume),
  jobDescription: String,
  jobTitle: String,
  company: String,
  overallScore: Number,
  categoryScores: {
    keywords: Number,
    formatting: Number,
    experience: Number,
    education: Number,
    skills: Number,
    contact: Number
  },
  matchedKeywords: [String],
  missingKeywords: [String],
  suggestions: [{
    category: String,
    priority: Enum ['high', 'medium', 'low'],
    message: String
  }],
  aiAnalysis: String,
  timestamps: true
}
```

### Job Matches Collection
```javascript
{
  user: ObjectId (ref: User),
  resume: ObjectId (ref: Resume),
  jobTitle: String,
  company: String,
  jobDescription: String,
  matchScore: Number,
  skillMatch: {
    matched: [String],
    missing: [String],
    percentage: Number
  },
  experienceMatch: {
    required: String,
    candidate: String,
    isMatch: Boolean
  },
  educationMatch: {
    required: String,
    candidate: String,
    isMatch: Boolean
  },
  recommendations: [String],
  status: Enum ['pending', 'applied', 'interview', 'rejected', 'accepted'],
  timestamps: true
}
```

---

## Docker Setup

### Using Docker Compose

```bash
# Set environment variables in .env file
docker-compose up -d
```

### Manual Docker Build

```bash
# Build server
docker build -t atspro-server ./server

# Build client
docker build -t atspro-client ./client

# Run
docker run -p 5000:5000 atspro-server
docker run -p 3000:80 atspro-client
```

---

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set root directory to `client`
5. Add environment variable: `REACT_APP_API_URL`
6. Deploy

### Backend (Render)

1. Go to [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set root directory to `server`
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables
8. Deploy

### Database (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Update `MONGODB_URI` in environment variables

---

## Project Structure

```
ATSPro/
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/            # Landing page components
│   │   │   ├── layout/            # Layout components (Navbar)
│   │   │   ├── common/            # Shared components
│   │   │   ├── auth/              # Auth components
│   │   │   ├── dashboard/         # Dashboard components
│   │   │   └── resume/            # Resume components
│   │   ├── pages/                 # Page components
│   │   ├── context/               # React Context
│   │   ├── services/              # API services
│   │   ├── hooks/                 # Custom hooks
│   │   ├── utils/                 # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── config/                # Configuration
│   │   ├── controllers/           # Route handlers
│   │   ├── middleware/            # Custom middleware
│   │   ├── models/               # Mongoose models
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic
│   │   ├── templates/            # Email templates
│   │   ├── utils/                # Utility functions
│   │   └── index.js              # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml             # CI/CD pipeline
│
├── docs/                           # Documentation
├── screenshots/                    # App screenshots
├── docker-compose.yml
├── Dockerfile
├── README.md
├── LICENSE
├── CONTRIBUTING.md
└── .gitignore
```

---

## Future Enhancements

- [ ] Real-time collaboration on resumes
- [ ] Resume version history
- [ ] More ATS-friendly templates
- [ ] Integration with job boards (LinkedIn, Indeed)
- [ ] Resume analytics and tracking
- [ ] Multi-language support
- [ ] Resume import from LinkedIn
- [ ] Advanced AI rewriting suggestions
- [ ] Team/Enterprise features
- [ ] Mobile app (React Native)
- [ ] Chrome extension for job scraping
- [ ] Resume A/B testing
- [ ] Automated job applications
- [ ] Email notifications
- [ ] Premium subscription (Stripe integration)

---

## Performance Optimizations

- Code splitting with React.lazy
- Image optimization
- MongoDB indexing
- API response caching
- Gzip compression
- CDN for static assets

---

## Security Features

- JWT with HTTP-only cookies
- Password hashing with bcrypt
- Rate limiting (100 requests/15 min)
- CORS configuration
- Helmet security headers
- Input validation & sanitization
- SQL injection prevention
- XSS protection

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**ATSPro Team**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: contact@atspro.dev

---

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Gemini](https://ai.google.dev/)
- [Express.js](https://expressjs.com/)

---

<div align="center">

**Made with care for job seekers everywhere**

[Star this repo](https://github.com/yourusername/ATSPro/stargazers) | [Report Bug](https://github.com/yourusername/ATSPro/issues) | [Request Feature](https://github.com/yourusername/ATSPro/issues)

</div>
