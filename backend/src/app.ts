import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import axios from 'axios';

import organizationRoutes from './routes/organization.routes';
import userRoutes from './routes/user.routes';
import userGroupRoutes from './routes/user-group.routes';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure base axios instance that will be used across the application
const baseAPI = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://dev.vexabot.ai',
  headers: {
    'Content-Type': 'application/json'
  }
});

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:4200'], // Your Angular app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If you're using cookies/sessions
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication middleware for protected routes
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Extract token
    const token = authHeader.substring(7);
    console.log('token found : ', token);
    
    // Add token to request object for use in route handlers
    (req as any).token = token;
    
    // Set the token in the axios instance for this request
    baseAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    next();
  } else {
    res.status(401).json({ error: 'Authorization token required' });
  }
};

// Make the base API instance available to route handlers
app.use((req, res, next) => {
  (req as any).baseAPI = baseAPI;
  next();
});

// Routes

// Public Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/organizations', authMiddleware, organizationRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/user-groups', authMiddleware, userGroupRoutes);

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI!)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   });

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('err : ', err);
  console.error('err stack : ', err.stack);

  if(err.name === 'ValidationError'){
    res.status(400).json({error : err.message});
  } else if (err.name === 'UnauthorizedError'){
    res.status(401).json({error : err.message});
  } else {
    res.status(500).json({error : 'Something went Wrong !!!', err: err});
  }

});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});