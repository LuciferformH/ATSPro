# ATSPro API Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://atspro-api.onrender.com/api
```

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register
```http
POST /api/auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "_id": "64f...",
      "name": "John Doe",
      "email": "john@example.com",
      "plan": "free"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "John Doe Updated",
  "phone": "+1 555 000 0000",
  "headline": "Senior Software Engineer",
  "location": "San Francisco, CA"
}
```

---

## Resume Endpoints

### Get All Resumes
```http
GET /api/resumes?page=1&limit=10&sort=-createdAt
Authorization: Bearer <token>
```

### Get Single Resume
```http
GET /api/resumes/:id
Authorization: Bearer <token>
```

### Create Resume
```http
POST /api/resumes
Authorization: Bearer <token>
```

**Body:**
```json
{
  "title": "Software Engineer Resume",
  "template": "modern",
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1 555 000 0000",
    "location": "San Francisco, CA",
    "summary": "Experienced software engineer with 5+ years..."
  },
  "experience": [{
    "company": "Google",
    "position": "Senior Software Engineer",
    "startDate": "2020-01",
    "endDate": "2024-01",
    "description": "Led development of microservices...",
    "achievements": [
      "Reduced API latency by 40%",
      "Mentored 5 junior developers"
    ]
  }],
  "education": [{
    "institution": "Stanford University",
    "degree": "Bachelor of Science",
    "fieldOfStudy": "Computer Science",
    "gpa": "3.8"
  }],
  "skills": [{
    "category": "Frontend",
    "items": ["React", "TypeScript", "JavaScript"]
  }]
}
```

### Update Resume
```http
PUT /api/resumes/:id
Authorization: Bearer <token>
```

### Delete Resume
```http
DELETE /api/resumes/:id
Authorization: Bearer <token>
```

### Duplicate Resume
```http
POST /api/resumes/:id/duplicate
Authorization: Bearer <token>
```

---

## ATS Checker Endpoints

### Check ATS Score
```http
POST /api/ats/check
Authorization: Bearer <token>
```

**Body:**
```json
{
  "resumeId": "64f...",
  "jobDescription": "We are looking for a Senior React Developer with 5+ years of experience in JavaScript, React, TypeScript...",
  "jobTitle": "Senior React Developer",
  "company": "Google"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "ATS analysis completed",
  "data": {
    "overallScore": 85,
    "categoryScores": {
      "keywords": 90,
      "formatting": 85,
      "experience": 80,
      "education": 75,
      "skills": 88,
      "contact": 95
    },
    "matchedKeywords": ["react", "javascript", "typescript", "api"],
    "missingKeywords": ["graphql", "aws", "kubernetes"],
    "suggestions": [{
      "category": "Keywords",
      "priority": "high",
      "message": "Add these missing keywords: graphql, aws, kubernetes"
    }],
    "aiAnalysis": "Your resume is well-structured..."
  }
}
```

### Get ATS Reports
```http
GET /api/ats/reports?page=1&limit=10
Authorization: Bearer <token>
```

---

## Job Match Endpoints

### Analyze Job Match
```http
POST /api/job-match/analyze
Authorization: Bearer <token>
```

**Body:**
```json
{
  "resumeId": "64f...",
  "jobTitle": "Full Stack Developer",
  "company": "Meta",
  "jobDescription": "Looking for a full stack developer with React and Node.js experience..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "matchScore": 78,
    "skillMatch": {
      "matched": ["React", "Node.js", "JavaScript"],
      "missing": ["GraphQL", "MongoDB"],
      "percentage": 75
    },
    "experienceMatch": {
      "required": "Professional experience",
      "candidate": "3 positions",
      "isMatch": true
    },
    "recommendations": [
      "Consider learning GraphQL to improve match",
      "Add more Node.js projects to your portfolio"
    ]
  }
}
```

### Get Match History
```http
GET /api/job-match/history?page=1&limit=10
Authorization: Bearer <token>
```

---

## AI Endpoints

### Get AI Suggestions
```http
POST /api/ai/suggestions
Authorization: Bearer <token>
```

**Body:**
```json
{
  "resumeId": "64f...",
  "section": "summary"
}
```

### Generate Resume Summary
```http
POST /api/ai/generate-summary
Authorization: Bearer <token>
```

**Body:**
```json
{
  "resumeId": "64f..."
}
```

---

## Dashboard Endpoints

### Get Dashboard Stats
```http
GET /api/dashboard/stats
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalResumes": 5,
      "totalATSReports": 12,
      "totalJobMatches": 8,
      "averageATSScore": 82,
      "averageMatchScore": 75
    },
    "usage": {
      "resumesCreated": 5,
      "atsChecks": 12,
      "aiSuggestions": 25
    },
    "recentResumes": [...],
    "recentReports": [...],
    "plan": "free"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [{ "field": "email", "message": "Please provide a valid email" }]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized - Invalid token"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resume not found"
}
```

### 429 Rate Limited
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```
