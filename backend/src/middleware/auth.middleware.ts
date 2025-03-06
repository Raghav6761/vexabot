// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';

// Define an extended Request interface
export interface AuthenticatedRequest extends Request {
    token?: string;
    user?: any;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract token
        const token = authHeader.substring(7);
        console.log('token found : ', token);
        
        // Add token to request object for use in route handlers
        req.token = token;
        
        // Proceed to the next middleware or route handler
        next();
    } else {
        // Send response but don't return it
        res.status(401).json({ error: 'Authorization token required' });
        // No next() call here - we're ending the request
    }
};