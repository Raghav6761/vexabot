// src/controllers/project.controller.ts
import { Request, Response, NextFunction } from 'express';  // Added NextFunction for error handling
import { ProjectService } from '../services/project.service';
import { validationResult } from 'express-validator';

export class ProjectController {
  // Private service instance
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService(process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai');
    // const authService = new AuthService(process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai');
    // Removed manual method binding as we're using arrow functions now
  }

  // Changed to arrow function to:
  // 1. Automatically bind 'this'
  // 2. Properly type as Express middleware
  // 3. Support error handling with NextFunction
  createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;  // Added explicit return
      }

      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.projectService = new ProjectService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const orgId = req.params.oId;
      console.log('org Id : ', orgId)

      const project = await this.projectService.createProject(req.body, orgId);
      res.status(201).json(project);
    } catch (error) {
      // Using next(error) instead of direct error response
      // This allows central error handling middleware to process the error
      next(error);
    }
  };

  // Arrow function syntax ensures 'this' is properly bound
  // Added NextFunction for standardized error handling
  getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.projectService = new ProjectService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const orgId = req.params.oId;
      console.log('org Id : ', orgId)

      const projects = await this.projectService.getAllProjects(orgId);
      res.json(projects);
    } catch (error) {
      next(error);  // Delegate error handling to middleware
    }
  };

  // Consistent arrow function syntax with error handling
  getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.projectService = new ProjectService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const project = await this.projectService.getProjectById(req.params.id);
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;  // Added explicit return after response
      }
      res.json(project);
    } catch (error) {
      next(error);
    }
  };

  // Arrow function with proper Express middleware signature
  updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.projectService = new ProjectService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const project = await this.projectService.updateProject(req.params.id, req.body);
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }
      res.json(project);
    } catch (error) {
      next(error);
    }
  };

  // Consistent error handling pattern across all methods
  deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.projectService = new ProjectService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const orgId = req.params.oId;
      const prjId = req.params.pId;
      console.log('org and prj Id : ', orgId, prjId)
      
      const project = await this.projectService.deleteProject(orgId, prjId);
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  addUsersToProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.projectService = new ProjectService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );
      
      const project = await this.projectService.addUsersToProject(req.params.id);
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}