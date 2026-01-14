# KinetixPro

A modern full-stack blog/social media platform built with Vue.js and Express.js, featuring an interface for sharing posts, engaging with content through likes and bookmarks, and receiving real-time notifications.

---

## IMPORTANT NOTE

**Backend Deployment Status:** Not Deployed (Online) :(

**Reason:** Backend and database deployment requires credit card verification (VISA/MasterCard) for free cloud platforms. I do not have access to a valid international payment card.

**What's Working:**
- Frontend: Fully deployed on Netlify - https://kinetixpro-fullstackdev.netlify.app
- Codebase: Complete, production-ready code in GitHub
- Local Setup: Full stack runs perfectly locally with Docker

**How to Run Locally:**
Clone the repository and start all services locally (no payment required):
```bash
git clone https://github.com/rlukassa/Fullstack-Engineer-Intern-KinetixPro.git
cd Fullstack-Engineer-Intern-KinetixPro
docker compose up -d --build

# Access:
# Frontend: http://localhost:5173
# Backend:  http://localhost:5000
# Database: localhost:5433
```

All features work perfectly in local development environment.

---

## LIVE DEPLOYMENT

**Frontend (Netlify):** https://kinetixpro-fullstackdev.netlify.app/

**GitHub Repository:** https://github.com/rlukassa/Fullstack-Engineer-Intern-KinetixPro

**Video Demo & Documentation:** https://drive.google.com/drive/u/0/folders/1kHBuep5eeYdrzKdjZ4TNMrbACvqe96p-

---

## Table of Contents

- [Important Note](#important-note)
- [Live Deployment](#live-deployment)
- [Screenshots](#screenshots)
- [Requirements](#requirements)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Assumptions](#assumptions)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Design Decisions](#design-decisions)
- [Commit History Format](#commit-history-format)
- [License](#license)
- [Author](#author)

---

## Screenshots

All screenshots are available in the [`test/`](test/) folder. Below are the application screenshots organized by page and device:

### Screenshot Index (test/ folder)

| Page | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| Home | [Home-desktop.png](test/Home-desktop.png) | [Home-tab.png](test/Home-tab.png) | [Home-mobile.png](test/Home-mobile.png) |
| Login | [Login-desktop.png](test/Login-desktop.png) | [Login-tab.png](test/Login-tab.png) | [Login-mobile.png](test/Login-mobile.png) |
| Notifications | [Notifications-desktop.png](test/Notifications-desktop.png) | [Notifications-tab.png](test/Notifications-tab.png) | [Notifications-mobile.png](test/Notifications-mobile.png) |
| Profile | [Profile-desktop.png](test/Profile-desktop.png) | [Profile-tab.png](test/Profile-tab.png) | [Profile-mobile.png](test/Profile-mobile.png) |

---

### Home Page
The main feed displaying all posts with likes, bookmarks, and comments.

<p align="center">
  <img src="test/Home-desktop.png" alt="Home Page - Desktop" width="800"/>
</p>
<p align="center"><em>Home Page - Desktop View</em></p>

<details>
<summary>View Tablet & Mobile Screenshots</summary>

<p align="center">
  <img src="test/Home-tab.png" alt="Home Page - Tablet" width="500"/>
</p>
<p align="center"><em>Home Page - Tablet View</em></p>

<p align="center">
  <img src="test/Home-mobile.png" alt="Home Page - Mobile" width="300"/>
</p>
<p align="center"><em>Home Page - Mobile View</em></p>

</details>

---

### Login Page
User authentication page for login and registration.

<p align="center">
  <img src="test/Login-desktop.png" alt="Login Page - Desktop" width="800"/>
</p>
<p align="center"><em>Login Page - Desktop View</em></p>

<details>
<summary>View Tablet & Mobile Screenshots</summary>

<p align="center">
  <img src="test/Login-tab.png" alt="Login Page - Tablet" width="500"/>
</p>
<p align="center"><em>Login Page - Tablet View</em></p>

<p align="center">
  <img src="test/Login-mobile.png" alt="Login Page - Mobile" width="300"/>
</p>
<p align="center"><em>Login Page - Mobile View</em></p>

</details>

---

### Profile Page
User profile displaying personal information and posts.

<p align="center">
  <img src="test/Profile-desktop.png" alt="Profile Page - Desktop" width="800"/>
</p>
<p align="center"><em>Profile Page - Desktop View</em></p>

<details>
<summary>View Tablet & Mobile Screenshots</summary>

<p align="center">
  <img src="test/Profile-tab.png" alt="Profile Page - Tablet" width="500"/>
</p>
<p align="center"><em>Profile Page - Tablet View</em></p>

<p align="center">
  <img src="test/Profile-mobile.png" alt="Profile Page - Mobile" width="300"/>
</p>
<p align="center"><em>Profile Page - Mobile View</em></p>

</details>

---

### Notifications Page
Real-time notifications for likes, bookmarks, and comments.

<p align="center">
  <img src="test/Notifications-desktop.png" alt="Notifications Page - Desktop" width="800"/>
</p>
<p align="center"><em>Notifications Page - Desktop View</em></p>

<details>
<summary>View Tablet & Mobile Screenshots</summary>

<p align="center">
  <img src="test/Notifications-tab.png" alt="Notifications Page - Tablet" width="500"/>
</p>
<p align="center"><em>Notifications Page - Tablet View</em></p>

<p align="center">
  <img src="test/Notifications-mobile.png" alt="Notifications Page - Mobile" width="300"/>
</p>
<p align="center"><em>Notifications Page - Mobile View</em></p>

</details>

---

## Requirements

### Prerequisites
- **Node.js** 20+ 
- **Docker** & **Docker Compose**
- **Git**
- **npm** or **yarn**

### System Requirements
| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 4 GB | 8 GB |
| Storage | 2 GB free | 5 GB free |
| Docker | 20.10+ | Latest |
| Node.js | 20.x | 22.x |

### Implemented Features

#### Front-End Features
| Feature | Status | Description |
|---------|--------|-------------|
| Home Page | YES | Display all blog posts with titles, descriptions, and publication dates |
| Read More | YES | Each post links to full post detail page |
| Post Detail Page | YES | View full blog post with edit/delete options (author only) |
| Create New Post | YES | Form with title, content fields and input validation |
| Edit Post | YES | Pre-filled form for editing own posts |
| User Authentication | YES | Registration and login with JWT |
| User Profile | YES | View profile page with list of own posts |
| Comments | YES | Add, edit, delete comments on posts (author only for edit/delete) |
| Responsive Design | YES | Mobile, tablet, and desktop support |

#### Back-End Features
| Feature | Status | Description |
|---------|--------|-------------|
| Post CRUD | YES | Create, Read, Update, Delete posts |
| Comment CRUD | YES | Create, Read, Update, Delete comments |
| JWT Authentication | YES | Register, Login with token-based auth |
| Authorization | YES | Only authors can edit/delete their content |
| Password Hashing | YES | Using bcrypt for secure password storage |

#### Additional Features (Bonus Points)
| Feature | Status | Description |
|---------|--------|-------------|
| Search Functionality | YES | Search posts by title or content with fuzzy matching |
| Pagination | YES | Load limited posts per page with navigation |
| Markdown Support | YES | Write and render posts with Markdown formatting |
| Like/Bookmark System | YES | Engage with posts through likes and bookmarks |
| Notifications | YES | Real-time notifications for likes, bookmarks, comments |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Vue.js 3 | Progressive JavaScript framework with Composition API |
| TypeScript | Type-safe JavaScript development |
| Vue Router | Client-side routing |
| Pinia | State management |
| Vite | Fast build tool and dev server |
| Axios | HTTP client for API requests |
| Font Awesome | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime environment |
| Express.js | Web application framework |
| TypeScript | Type-safe JavaScript development |
| PostgreSQL | Relational database |
| **JWT (JSON Web Tokens)** | **Stateless authentication with token-based authorization** |
| bcrypt | Password hashing |

### DevOps
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |

---

## Project Structure

```
kinetixpro/
├── client/                     # Frontend Vue.js application
│   ├── public/                 # Static assets
│   │   ├── default-avatar.svg  # Default user avatar
│   │   └── favicon.jpg         # Site favicon
│   ├── src/
│   │   ├── assets/             # Images, SVGs, CSS
│   │   ├── components/         # Reusable Vue components
│   │   │   ├── Card.component.vue      # Post card component
│   │   │   ├── Post.component.vue      # Post composer
│   │   │   ├── Sidebar.component.vue   # Navigation sidebar
│   │   │   └── Popup.component.vue     # Modal popup
│   │   ├── views/              # Page components
│   │   │   ├── HomeView.vue            # Home feed page
│   │   │   ├── LoginView.vue           # Auth page
│   │   │   ├── DetailPost.vue          # Single post view
│   │   │   ├── ProfileView.vue         # User profile
│   │   │   ├── BookmarksView.vue       # Saved posts
│   │   │   ├── NotificationsView.vue   # Notifications
│   │   │   └── MessagesView.vue        # Messages (coming soon)
│   │   ├── router/             # Vue Router configuration
│   │   ├── services/           # API services
│   │   │   ├── api.ts          # Axios instance
│   │   │   └── auth.ts         # Authentication service
│   │   ├── stores/             # Pinia stores
│   │   └── utils/              # Utility functions
│   │       └── markdown.ts     # Markdown parser
│   ├── Dockerfile
│   └── package.json
├── server/                     # Backend Express.js application
│   ├── config/
│   │   └── db.ts               # Database connection & initialization
│   ├── controllers/            # Route controllers
│   │   ├── authController.ts   # Authentication logic
│   │   ├── postController.ts   # Post CRUD + likes/bookmarks
│   │   ├── commentController.ts # Comment CRUD
│   │   ├── userController.ts   # User profile
│   │   └── notificationController.ts # Notifications
│   ├── middleware/
│   │   └── authMiddleware.ts   # JWT verification
│   ├── models/                 # TypeScript interfaces
│   │   ├── User.ts
│   │   ├── Post.ts
│   │   └── Comments.ts
│   ├── routes/                 # API route definitions
│   │   ├── authRoutes.ts
│   │   ├── postRoutes.ts
│   │   └── userRoutes.ts
│   ├── database/
│   │   ├── schema.sql          # Database schema
│   │   └── seed.sql            # Sample data
│   ├── Dockerfile
│   ├── server.ts               # Express app entry point
│   └── package.json
├── docker-compose.yml          # Docker orchestration
└── README.md
```

### Database Schema

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   users     │     │    posts    │     │  comments   │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (PK)     │◄────│ author_id   │     │ id (PK)     │
│ username    │     │ id (PK)     │◄────│ post_id     │
│ email       │     │ title       │     │ user_id     │────►
│ password    │     │ caption     │     │ content     │
│ created_at  │     │ image       │     │ created_at  │
└─────────────┘     │ likes       │     └─────────────┘
                    │ comments    │
                    │ created_at  │
                    └─────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
┌─────────────┐   ┌─────────────┐   ┌──────────────┐
│ post_likes  │   │  bookmarks  │   │notifications │
├─────────────┤   ├─────────────┤   ├──────────────┤
│ id (PK)     │   │ id (PK)     │   │ id (PK)      │
│ post_id     │   │ user_id     │   │ user_id      │
│ user_id     │   │ post_id     │   │ actor_id     │
│ created_at  │   │ created_at  │   │ post_id      │
└─────────────┘   └─────────────┘   │ type         │
                                    │ is_read      │
                                    │ created_at   │
                                    └──────────────┘
```

---

## Setup Instructions

### Quick Start (Docker - Recommended)

The fastest way to get up and running:

```bash
# 1. Clone the repository
git clone https://github.com/rlukassa/Fullstack-Engineer-Intern-KinetixPro.git
cd Fullstack-Engineer-Intern-KinetixPro

# 2. Start all services
docker compose up -d --build

# 3. Wait for services to be ready (about 30-60 seconds)
docker compose logs -f
# Press Ctrl+C when you see "Server is running on port 5000"

# 4. Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
# PostgreSQL: localhost:5433
```

### Stopping the Application

```bash
# Stop all services
docker compose down

# Stop and remove volumes (reset database)
docker compose down -v
```

### Option 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/rlukassa/Fullstack-Engineer-Intern-KinetixPro.git
   cd kinetixpro
   ```

2. **Start all services with Docker Compose**
   ```bash
   docker compose up -d --build
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - PostgreSQL: localhost:5433

4. **Stop services**
   ```bash
   docker compose down
   ```

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rlukassa/Fullstack-Engineer-Intern-KinetixPro.git
   cd kinetixpro
   ```

2. **Start PostgreSQL container only**
   ```bash
   docker compose up -d postgres
   ```

3. **Install backend dependencies and start server**
   ```bash
   cd server
   npm install
   npm run dev
   ```

4. **Install frontend dependencies and start dev server** (new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Environment Variables

Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/kinetixpro
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

---

## Assumptions

1. **Single Author System**: Each post has one author; collaborative editing is not supported.

2. **Public Posts**: All posts are public and visible to all users. Private posts feature is not implemented.

3. **No Email Verification**: User registration does not require email verification for simplicity.

4. **Session Persistence**: JWT tokens are stored in localStorage. Users remain logged in until they explicitly logout or token expires.

5. **Comment Threading**: Comments are flat (single-level). Nested replies are not implemented.

6. **Hard Delete**: Posts and comments are permanently deleted from database. Soft delete with recovery is not implemented.

7. **Default Profile Pictures**: Default avatar is used for all users. Custom profile picture upload is not implemented.

8. **Single Database**: PostgreSQL handles all data. No caching layer (Redis) or search engine (Elasticsearch) is used.

9. **Local Development Focus**: Application is designed to run locally with Docker. Production deployment configurations may need additional setup.

10. **Modern Browser Support**: Targets modern browsers (Chrome, Firefox, Safari, Edge). IE11 is not supported.

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Headers
For protected routes, include JWT token:
```
Authorization: Bearer <token>
```

---

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | User login | No |

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 4,
    "username": "newuser",
    "email": "newuser@example.com"
  }
}
```

#### Login (using pre-seeded account)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "lukas@gmail.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "lukas",
    "email": "lukas@gmail.com"
  }
}
```

---

### Post Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts` | Get all posts (with pagination & search) | No |
| GET | `/posts/:id` | Get single post by ID | No |
| POST | `/posts` | Create new post | Yes |
| PUT | `/posts/:id` | Update post (author only) | Yes |
| DELETE | `/posts/:id` | Delete post (author only) | Yes |
| POST | `/posts/:id/like` | Toggle like on post | Yes |
| POST | `/posts/:id/bookmark` | Toggle bookmark on post | Yes |

#### Get All Posts
```http
GET /api/posts?page=1&limit=10&search=keyword
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number for pagination |
| limit | number | 10 | Posts per page |
| search | string | - | Search term for title/content |

**Response (200 OK):**
```json
{
  "posts": [
    {
      "_id": 1,
      "title": "Welcome to KinetixPro",
      "caption": "This is my first post on KinetixPro! Excited to share my journey.",
      "author": {
        "_id": 1,
        "username": "lukas"
      },
      "likes": 42,
      "comments": 2,
      "createdAt": "2026-01-14T10:00:00.000Z",
      "isLiked": false,
      "isBookmarked": false
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalPosts": 6,
    "hasMore": false
  }
}
```

#### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Beautiful Sunset",
  "caption": "Captured this amazing sunset today",
  "authorId": 1
}
```

**Response (201 Created):**
```json
{
  "message": "Post created successfully",
  "post": {
    "_id": 7,
    "title": "Beautiful Sunset",
    "caption": "Captured this amazing sunset today",
    "author": {
      "_id": 1,
      "username": "lukas"
    },
    "likes": 0,
    "comments": 0,
    "createdAt": "2026-01-14T11:00:00.000Z"
  }
}
```

#### Update Post
```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "caption": "Updated content"
}
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

#### Toggle Like
```http
POST /api/posts/:id/like
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1
}
```

**Response:**
```json
{
  "isLiked": true,
  "likes": 6
}
```

#### Toggle Bookmark
```http
POST /api/posts/:id/bookmark
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1
}
```

**Response:**
```json
{
  "isBookmarked": true
}
```

---

### Comment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts/:postId/comments` | Get all comments for a post | No |
| POST | `/posts/:postId/comments` | Add comment to post | Yes |
| PUT | `/comments/:id` | Update comment (author only) | Yes |
| DELETE | `/comments/:id` | Delete comment (author only) | Yes |

#### Get Comments
```http
GET /api/posts/:postId/comments
```

**Response:**
```json
{
  "comments": [
    {
      "_id": 1,
      "content": "Great post! Love it!",
      "author": {
        "_id": 2,
        "username": "kinetixpro"
      },
      "createdAt": "2026-01-14T11:00:00.000Z"
    },
    {
      "_id": 2,
      "content": "This is amazing! Thanks for sharing.",
      "author": {
        "_id": 3,
        "username": "talentgrowth"
      },
      "createdAt": "2026-01-14T11:05:00.000Z"
    }
  ]
}
```

#### Add Comment
```http
POST /api/posts/1/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great post! Love it!",
  "userId": 2
}
```

#### Update Comment
```http
PUT /api/comments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Updated comment",
  "userId": 2
}
```

#### Delete Comment
```http
DELETE /api/comments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 2
}
```

---

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/:id` | Get user profile | No |
| GET | `/posts/user/:authorId` | Get posts by user | No |

#### Get User Profile
```http
GET /api/users/1
```

**Response:**
```json
{
  "user": {
    "_id": 1,
    "username": "lukas",
    "email": "lukas@gmail.com",
    "createdAt": "2026-01-10T08:00:00.000Z"
  }
}
```

---

### Bookmark Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/bookmarks/:userId` | Get user's bookmarked posts | Yes |

---

### Notification Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/notifications/:userId` | Get user's notifications | Yes |
| PUT | `/notifications/:id/read` | Mark notification as read | Yes |
| PUT | `/notifications/:userId/read-all` | Mark all as read | Yes |

**Notification Types:**
- `like` - Someone liked your post
- `bookmark` - Someone bookmarked your post
- `comment` - Someone commented on your post

---

## Testing

### Test Credentials

Use these pre-seeded accounts to test the application:

| Username | Email | Password | Role |
|----------|-------|----------|------|
| lukas | lukas@gmail.com | password123 | User |
| kinetixpro | kinetixpro@gmail.com | password123 | User |
| talentgrowth | talentgrowth@gmail.com | password123 | User |

### Manual Testing Checklist

#### User Authentication
- [ ] Login with test account (lukas@gmail.com / password123)
- [ ] Logout and verify token is removed
- [ ] Register new user with valid credentials
- [ ] Attempt registration with existing email (should fail)
- [ ] Login with incorrect password (should fail)

#### Post Management
- [ ] Create new post with title and content
- [ ] Attempt to create post without title (should fail)
- [ ] View all posts on home page (pre-seeded posts should appear)
- [ ] Click post to view detail page
- [ ] Edit own post (lukas can only edit posts created by lukas)
- [ ] Attempt to edit another user's post (should not show edit button)
- [ ] Delete own post (lukas can only delete posts created by lukas)
- [ ] Search posts by title (test with "Welcome", "Sunset", "Coffee", etc.)
- [ ] Navigate pagination

#### Comments
- [ ] Add comment to a pre-seeded post (e.g., "Welcome to KinetixPro" post)
- [ ] Edit own comment
- [ ] Delete own comment
- [ ] Verify cannot edit/delete other's comments
- [ ] View existing comments on posts (pre-seeded comments should appear)

#### Likes & Bookmarks
- [ ] Like a pre-seeded post
- [ ] Unlike a post
- [ ] Bookmark a post
- [ ] Remove bookmark
- [ ] View bookmarked posts in Bookmarks view
- [ ] View like count updates on posts

#### Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)

### API Testing with cURL

**Test Credentials (from seed.sql):**
```bash
# Login as test user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"lukas@gmail.com","password":"password123"}'

# Will return JWT token - copy and use in Authorization header
```

**Examples:**

```bash
# Get all posts (no auth required)
curl http://localhost:5000/api/posts

# Get posts with pagination
curl "http://localhost:5000/api/posts?page=1&limit=5"

# Search posts
curl "http://localhost:5000/api/posts?search=Welcome"

# Create post (replace TOKEN with actual JWT from login)
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test Post","caption":"This is content","authorId":1}'

# Get single post
curl http://localhost:5000/api/posts/1

# Update post
curl -X PUT http://localhost:5000/api/posts/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Updated Title","caption":"Updated content","authorId":1}'

# Delete post
curl -X DELETE http://localhost:5000/api/posts/1 \
  -H "Authorization: Bearer TOKEN"

# Get comments for post
curl http://localhost:5000/api/posts/1/comments

# Add comment
curl -X POST http://localhost:5000/api/posts/1/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"content":"Nice post!","userId":1}'

# Toggle like on post
curl -X POST http://localhost:5000/api/posts/1/like \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"userId":1}'

# Toggle bookmark on post
curl -X POST http://localhost:5000/api/posts/1/bookmark \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"userId":1}'
```

### Testing with PowerShell

```powershell
# Get all posts
Invoke-RestMethod -Uri "http://localhost:5000/api/posts" -Method Get

# Login with test credentials
$body = @{email="lukas@gmail.com"; password="password123"} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$token = $response.token
```

---

## Deployment Guide

### For Local Development

**Clone and setup locally (no deployment needed):**

1. **Clone repository**
   ```bash
   git clone https://github.com/rlukassa/Fullstack-Engineer-Intern-KinetixPro.git
   cd Fullstack-Engineer-Intern-KinetixPro
   ```

2. **Use Docker Compose (easiest)**
   ```bash
   docker compose up -d --build
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
   - Database: localhost:5433

   **Or manual local setup:**
   ```bash
   # Terminal 1: PostgreSQL
   docker compose up -d postgres

   # Terminal 2: Backend
   cd server && npm install && npm run dev

   # Terminal 3: Frontend
   cd client && npm install && npm run dev
   ```

### For Production Deployment

**To deploy this project to production:**

1. **Frontend Deployment (Netlify):**
   - Connect GitHub repo to Netlify
   - Set build command: `npm install && npm run build` (from `/client`)
   - Frontend will auto-deploy on every push

2. **Database Setup (Choose one):**
   - **Neon** (free PostgreSQL): https://neon.tech (no card required)
   - **Supabase** (free PostgreSQL): https://supabase.com (requires card verification)
   - **Local PostgreSQL** (development only)

3. **Backend Deployment (Choose one):**
   - **Render.com**: Free tier, connects to GitHub, supports environment variables
   - **Railway.app**: Free tier, easy GitHub integration
   - **Other platforms**: Any Node.js hosting that supports Express

4. **Environment Variables for Production:**
   ```env
   DATABASE_URL=<your_postgres_connection_string>
   JWT_SECRET=<strong_random_key>
   NODE_ENV=production
   PORT=5000
   ```

5. **After Backend is Live:**
   - Get your backend URL (e.g., https://your-app.render.com)
   - In Netlify dashboard, add environment variable:
     - Key: `VITE_API_URL`
     - Value: `https://your-app.render.com/api`
   - Trigger redeploy

**Note:** All deployment platforms require account creation. Some require card verification (even if free tier).

---

## Design Decisions

### 1. Vue 3 Composition API
**Decision:** Use Composition API over Options API

**Rationale:** 
- Better TypeScript integration with full type inference
- Improved code reusability through composables
- Cleaner logic organization for complex components
- More flexible code organization by feature rather than by option

### 2. PostgreSQL over MongoDB
**Decision:** Use PostgreSQL relational database

**Rationale:**
- Better suited for structured data with relationships (users, posts, comments, likes)
- ACID compliance ensures data integrity
- SQL queries are more efficient for complex joins
- Better support for transactions
- Industry standard for production applications

### 3. JWT Authentication
**Decision:** Stateless JWT tokens stored in localStorage

**Rationale:**
- Simplifies backend (no session storage needed)
- Works well with SPA architecture
- Allows easy horizontal scaling
- Self-contained tokens reduce database lookups

**Trade-off:** XSS vulnerability mitigated by proper input sanitization

### 4. Axios over Fetch
**Decision:** Use Axios for HTTP requests

**Rationale:**
- Built-in request/response interceptors for auth headers
- Automatic JSON parsing
- Better error handling with HTTP status codes
- Request cancellation support
- Consistent API across browsers

### 5. Docker Compose
**Decision:** Full containerization with Docker Compose

**Rationale:**
- Consistent development environment across machines
- Easy setup for new developers (single command)
- Production-ready deployment configuration
- Isolated services with clear dependencies
- Easy to add new services (Redis, etc.)

### 6. Component Architecture
**Decision:** Separate components for Card, Post, Sidebar, Popup

**Rationale:**
- Single Responsibility Principle - each component handles one concern
- Improves testability and reusability
- Easier maintenance and debugging
- Clear separation of concerns

### 7. TypeScript Throughout
**Decision:** Use TypeScript for both frontend and backend

**Rationale:**
- Type safety catches errors at compile time
- Better IDE support with autocompletion
- Self-documenting code through interfaces
- Easier refactoring with type checking
- Industry standard for modern JavaScript projects

### 8. RESTful API Design
**Decision:** Follow REST conventions for API endpoints

**Rationale:**
- Industry standard, widely understood
- Intuitive URL structure
- Proper HTTP method usage (GET, POST, PUT, DELETE)
- Stateless communication
- Easy to document and test

### 9. Responsive Design Approach
**Decision:** Mobile-first with CSS media queries

**Rationale:**
- Progressive enhancement ensures core functionality works on all devices
- Twitter-like design familiar to users
- Flexbox for layout flexibility
- Consistent experience across devices

### 10. Database Auto-Initialization
**Decision:** Auto-create tables on server startup

**Rationale:**
- Simplifies development setup - no manual migration scripts
- Tables are created if they don't exist
- Reduces onboarding friction for new developers
- Suitable for development and small-scale production

---
