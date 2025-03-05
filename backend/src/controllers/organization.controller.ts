// src/controllers/organization.controller.ts
import { Request, Response, NextFunction } from 'express';  // Added NextFunction for error handling
import { OrganizationService } from '../services/organization.service';
import { validationResult } from 'express-validator';

export class OrganizationController {
  // Private service instance
  private organizationService: OrganizationService;

  constructor() {
    this.organizationService = new OrganizationService(process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai');
    // const authService = new AuthService(process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai');
    // Removed manual method binding as we're using arrow functions now
  }

  // Changed to arrow function to:
  // 1. Automatically bind 'this'
  // 2. Properly type as Express middleware
  // 3. Support error handling with NextFunction
  createOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;  // Added explicit return
      }

      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.organizationService = new OrganizationService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const organization = await this.organizationService.createOrganization(req.body);
      res.status(201).json(organization);
    } catch (error) {
      // Using next(error) instead of direct error response
      // This allows central error handling middleware to process the error
      next(error);
    }
  };

  // Arrow function syntax ensures 'this' is properly bound
  // Added NextFunction for standardized error handling
  getAllOrganizations = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.organizationService = new OrganizationService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const organizations = await this.organizationService.getAllOrganizations();
      res.json(organizations);
    } catch (error) {
      next(error);  // Delegate error handling to middleware
    }
  };

  // Consistent arrow function syntax with error handling
  getOrganizationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.organizationService = new OrganizationService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const organization = await this.organizationService.getOrganizationById(req.params.id);
      if (!organization) {
        res.status(404).json({ message: 'Organization not found' });
        return;  // Added explicit return after response
      }
      res.json(organization);
    } catch (error) {
      next(error);
    }
  };

  // Arrow function with proper Express middleware signature
  updateOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.organizationService = new OrganizationService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );

      const organization = await this.organizationService.updateOrganization(req.params.id, req.body);
      if (!organization) {
        res.status(404).json({ message: 'Organization not found' });
        return;
      }
      res.json(organization);
    } catch (error) {
      next(error);
    }
  };

  // Consistent error handling pattern across all methods
  deleteOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const token = (req as any).token;
      console.log('token in controller : ', token);

      // Set the authorization header before making the request
      this.organizationService = new OrganizationService(
        process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
        token
      );
      
      const organization = await this.organizationService.deleteOrganization(req.params.id);
      if (!organization) {
        res.status(404).json({ message: 'Organization not found' });
        return;
      }
      res.json({ message: 'Organization deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  
  // getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  //   try {

  //     const token = (req as any).token;
  //     console.log('token in controller : ', token);

  //     // Set the authorization header before making the request
  //     this.organizationService = new OrganizationService(
  //       process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
  //       token
  //     );

  //     const orgId = req.params.oId;
  //     console.log('org Id : ', orgId)

  //     const organizations = await this.organizationService.getAllProjects(orgId);
  //     res.json(organizations);
  //   } catch (error) {
  //     next(error);  // Delegate error handling to middleware
  //   }
  // };
}