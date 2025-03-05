// src/routes/user.routes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { body } from 'express-validator';

const router = Router();
const userController = new UserController();

const userValidation = [
  body('name').trim().notEmpty().withMessage('User name is required'),
  // body('description').trim().notEmpty().withMessage('Description is required'),
//   body('type').trim().notEmpty().withMessage('User type is required'),
//   body('clientKey').trim().notEmpty().withMessage('Client key is required'),
//   body('secretKey').trim().notEmpty().withMessage('Secret key is required')
];

// User Groups Routes
router.post('/', userController.createUserGroup);
router.get('/', userController.getAllUserGroups);
router.get('/:id', userController.getUserGroupById);
router.put('/:id', userController.updateUserGroup);
router.delete('/:id', userController.deleteUserGroup);

export default router;