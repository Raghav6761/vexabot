import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import axios from 'axios';

import http from 'http';
import path from 'path';
import { Server as SocketIOServer } from 'socket.io';

import organizationRoutes from './routes/organization.routes';
import userRoutes from './routes/user.routes';
import userGroupRoutes from './routes/user-group.routes';
import authRoutes from './routes/auth.routes';
import chatRoutes from './routes/chat.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Create HTTP server (required for Socket.IO)
const server = http.createServer(app);

// Configure base axios instance that will be used across the application
const baseAPI = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://dev.vexabot.ai',
  headers: {
    'Content-Type': 'application/json'
  }
});

// CORS configuration
const corsOptions = {
    origin: process.env.CLIENT_URL || ['http://localhost:4200'], // Your Angular app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If you're using cookies/sessions
};


// Initialize Socket.IO with CORS configuration
const io = new SocketIOServer(server, {
  cors: corsOptions
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // Handle chat room joins
  socket.on('join', (chatId) => {
    if (chatId) {
      socket.join(chatId);
      console.log(`Client ${socket.id} joined chat room: ${chatId}`);
    }
  });
  
  // Handle incoming messages
  socket.on('message', async (data) => {
    try {
      // Process message (you'll need to implement this part)
      console.log('Received message:', data);
      
      // Broadcast message to room or emit response
      // Example: io.to(data.chatId).emit('new-message', processedMessage);
      
      // Simple echo for testing
      socket.emit('message-received', { 
        success: true, 
        message: data.message,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Socket message error:', error);
      socket.emit('error', { message: 'Error processing message' });
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

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
app.use('/api/chat', chatRoutes);

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI!)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   });

// Serve Angular static files - this must come AFTER the API routes
// This assumes your Angular build files are in a 'public' directory at the same level as your compiled server code
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  // Only handle non-API routes
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(publicPath, 'index.html'));
  } else {
    // 404 for API routes not found
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

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

// Make Socket.IO available to route handlers
app.set('io', io);

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API is available at http://localhost:${PORT}/api`);
  console.log(`Angular app is served at http://localhost:${PORT}`);
});

export {app, server, io}