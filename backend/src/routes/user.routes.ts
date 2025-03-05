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

// Routes with bound controller methods
router.post('/', userValidation, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userValidation, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;