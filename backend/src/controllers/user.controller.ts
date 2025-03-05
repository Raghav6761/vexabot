// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';  // Added NextFunction for error handling
import { UserService } from '../services/user.service';
import { validationResult } from 'express-validator';

export class UserController {
  // Private service instance
  private userService: UserService;

  constructor() {
    this.userService = new UserService(process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai');
    // Removed manual method binding as we're using arrow functions now
  }

  //#region User
  // Changed to arrow function to:
  // 1. Automatically bind 'this'
  // 2. Properly type as Express middleware
  // 3. Support error handling with NextFunction
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   res.status(400).json({ errors: errors.array() });
      //   return;  // Added explicit return
      // }

      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.userService = new UserService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      // Using next(error) instead of direct error response
      // This allows central error handling middleware to process the error
      next(error);
    }
  };

  // Arrow function syntax ensures 'this' is properly bound
  // Added NextFunction for standardized error handling
  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.userService = new UserService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);  // Delegate error handling to middleware
    }
  };

  // Consistent arrow function syntax with error handling
  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;  // Added explicit return after response
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  // Arrow function with proper Express middleware signature
  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  // Consistent error handling pattern across all methods
  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.userService = new UserService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  //#region User Group
  // Changed to arrow function to:
  // 1. Automatically bind 'this'
  // 2. Properly type as Express middleware
  // 3. Support error handling with NextFunction
  createUserGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   res.status(400).json({ errors: errors.array() });
      //   return;  // Added explicit return
      // }

      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.userService = new UserService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const user = await this.userService.createUserGroup(req.body);
      res.status(201).json(user);
    } catch (error) {
      // Using next(error) instead of direct error response
      // This allows central error handling middleware to process the error
      next(error);
    }
  };

  // Arrow function syntax ensures 'this' is properly bound
  // Added NextFunction for standardized error handling
  getAllUserGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.userService = new UserService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );
      const users = await this.userService.getAllUserGroups();
      res.json(users);
    } catch (error) {
      next(error);  // Delegate error handling to middleware
    }
  };

  // Consistent arrow function syntax with error handling
  getUserGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserGroupById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;  // Added explicit return after response
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  // Arrow function with proper Express middleware signature
  updateUserGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const user = await this.userService.updateUserGroup(req.params.id, req.body);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  // Consistent error handling pattern across all methods
  deleteUserGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.userService = new UserService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const user = await this.userService.deleteUserGroup(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}