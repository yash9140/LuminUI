# LuminUI - Scalable Web App with Authentication & Dashboard

A full-stack web application built with React.js frontend and Node.js/Express backend, featuring JWT authentication, user profiles, and task management with CRUD operations.

## 🚀 Features

### Frontend (React + Vite + TailwindCSS)
- ✅ Responsive design with TailwindCSS
- ✅ Protected routes with JWT authentication
- ✅ User registration and login forms with validation
- ✅ Dashboard with user profile display
- ✅ Task management with CRUD operations
- ✅ Search and filter functionality
- ✅ Loading states and error handling

### Backend (Node.js + Express + MongoDB)
- ✅ JWT-based authentication with bcrypt password hashing
- ✅ User registration and login endpoints
- ✅ Profile management (get/update)
- ✅ Task CRUD operations with search and pagination
- ✅ Input validation with Zod
- ✅ Error handling middleware
- ✅ MongoDB integration with Mongoose

## 📁 Project Structure

```
LuminUI/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── models/         # MongoDB models (User, Task)
│   │   ├── routes/         # API routes (auth, profile, tasks)
│   │   ├── middleware/     # JWT auth, error handling
│   │   └── index.js        # Server entry point
│   ├── API.md             # API documentation
│   ├── LuminUI.postman_collection.json
│   └── package.json
├── frontend/               # React.js web app
│   ├── src/
│   │   ├── pages/         # React components (Login, Register, Dashboard)
│   │   ├── lib/           # API client, auth utilities
│   │   └── App.jsx        # Main app component
│   └── package.json
└── README.md
```

## 🛠️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd LuminUI
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file
echo "PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/luminui
JWT_SECRET=your_super_secret_jwt_key_here" > .env

# Start MongoDB (if running locally)
# Windows: net start MongoDB
# macOS/Linux: brew services start mongodb-community

# Start backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Optional: Create environment file
echo "VITE_API_URL=http://localhost:4000" > .env

# Start frontend server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- API Health Check: http://localhost:4000/health

## 📖 API Documentation

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login with email/password

### Profile (Protected)
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Tasks (Protected)
- `GET /api/tasks` - Get tasks with search/filter/pagination
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

See `backend/API.md` for detailed API documentation.

## 🧪 Testing the API

Import `backend/LuminUI.postman_collection.json` into Postman to test all endpoints. The collection includes:
- Health check
- User registration/login (auto-saves JWT token)
- Profile management
- Task CRUD operations

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation with Zod
- **CORS Protection**: Configurable CORS settings
- **Error Handling**: Secure error responses without sensitive data

## 📈 Production Scaling Considerations

### Frontend Scaling
1. **Build Optimization**
   ```bash
   npm run build  # Creates optimized production build
   ```
2. **CDN Integration**: Serve static assets from CDN
3. **Code Splitting**: Implement React.lazy() for route-based splitting
4. **Caching**: Add service workers for offline functionality
5. **Environment Variables**: Use proper env vars for API URLs

### Backend Scaling
1. **Environment Configuration**
   ```bash
   NODE_ENV=production
   JWT_SECRET=your_secure_production_secret
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/luminui
   ```

2. **Database Optimization**
   - Add database indexes for frequently queried fields
   - Implement connection pooling
   - Consider read replicas for read-heavy operations

3. **API Rate Limiting**
   ```javascript
   // Add to backend/src/index.js
   import rateLimit from 'express-rate-limit'
   app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))
   ```

4. **Caching Layer**
   - Redis for session storage
   - Response caching for frequently accessed data

5. **Load Balancing**
   - Use PM2 for process management
   - Nginx reverse proxy
   - Horizontal scaling with multiple instances

6. **Monitoring & Logging**
   - Add Winston for structured logging
   - Health check endpoints
   - Error tracking (Sentry)

### Deployment Options
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Railway, Heroku, AWS EC2, DigitalOcean
- **Database**: MongoDB Atlas, AWS DocumentDB

### Security Enhancements
- HTTPS enforcement
- JWT token refresh mechanism
- API rate limiting
- Input sanitization
- Security headers (helmet.js)

## 🚀 Development Commands

```bash
# Backend
cd backend
npm run dev          # Start development server
npm start           # Start production server

# Frontend  
cd frontend
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## 📝 License

MIT License - feel free to use this project as a starting point for your own applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Note**: This is a demonstration project. For production use, ensure you implement additional security measures, proper error handling, and comprehensive testing.
