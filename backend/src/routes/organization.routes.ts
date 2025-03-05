// src/routes/organization.routes.ts
import { Router } from 'express';
import { OrganizationController } from '../controllers/organization.controller';
import { ProjectController } from '../controllers/project.controller';
import { body } from 'express-validator';

const router = Router();
const organizationController = new OrganizationController();
const projectController = new ProjectController();

const organizationValidation = [
  body('name').trim().notEmpty().withMessage('Project name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
//   body('type').trim().notEmpty().withMessage('Project type is required'),
//   body('clientKey').trim().notEmpty().withMessage('Client key is required'),
//   body('secretKey').trim().notEmpty().withMessage('Secret key is required')
];

const projectValidation = [
  body('name').trim().notEmpty().withMessage('Project name is required'),
  // body('description').trim().notEmpty().withMessage('Description is required'),
//   body('type').trim().notEmpty().withMessage('Project type is required'),
//   body('clientKey').trim().notEmpty().withMessage('Client key is required'),
//   body('secretKey').trim().notEmpty().withMessage('Secret key is required')
];

// Routes with bound controller methods
router.post('/', organizationValidation, organizationController.createOrganization);
router.get('/', organizationController.getAllOrganizations);
router.get('/:id', organizationController.getOrganizationById);
router.put('/:id', organizationValidation, organizationController.updateOrganization);
router.delete('/:id', organizationController.deleteOrganization);
// router.get('/:oId/projects', organizationController.getAllProjects);

// Project routes
router.post('/:oId/projects', projectValidation, projectController.createProject);
router.get('/:oId/projects', projectController.getAllProjects);
router.get('/:oId/projects/:pId', projectController.getProjectById);
router.put('/:oId/projects/:pId', projectValidation, projectController.updateProject);
router.delete('/:oId/projects/:pId', projectController.deleteProject);
// update later
// router.post('/:pId/add-users', projectController.addUsersToProject);
// router.post('/:pId/remove-users', projectController.removeUsersFromProject);
// router.post('/:pId/add-user-groups', projectController.addUserGroupsToProject);
// router.post('/:pId/remove-user-groups', projectController.removeUserGroupsFromProject);

export default router;