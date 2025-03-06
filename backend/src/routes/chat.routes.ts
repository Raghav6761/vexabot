// src/routes/chat.routes.ts
import express from 'express';
import { ChatController } from '../controllers/chat.controller';
import { body, param } from 'express-validator';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();
const chatController = new ChatController();

// Test route - Fix: don't return the res.json call
router.get('/test', (req, res, next) => {
    try {
        res.json({ message: 'Chat API is working' });
    } catch (err) {
        next(err);
    }
});

// POST /chat
router.post('/',
    authenticateToken,
    chatController.processChat
);

// Create a new chat session
router.post('/sessions',
    authenticateToken,
    [
        body('name').optional().isString().trim(),
        body('model').optional().isString().trim(),
        body('organizationId').optional().isString().trim(),
        body('projectId').optional().isString().trim()
    ],
    chatController.createChatSession
);

// Get all chat sessions for the current user
router.get('/sessions',
    authenticateToken,
    chatController.getUserChats
);

// Get chat history for a specific session
router.get('/sessions/:chatId/messages',
    authenticateToken,
    [
        param('chatId').isString().trim().notEmpty()
    ],
    chatController.getChatHistory
);

// Send a message in a chat session
router.post('/sessions/:chatId/messages',
    authenticateToken,
    [
        param('chatId').isString().trim().notEmpty(),
        body('message').isString().trim().notEmpty(),
        body('model').optional().isString().trim()
    ],
    chatController.sendMessage
);

// Stream chat for real-time responses
router.post('/sessions/:chatId/stream',
    authenticateToken,
    [
        param('chatId').isString().trim().notEmpty(),
        body('message').isString().trim().notEmpty(),
        body('model').optional().isString().trim()
    ],
    chatController.streamChat
);

// Delete a chat session
router.delete('/sessions/:chatId',
    authenticateToken,
    [
        param('chatId').isString().trim().notEmpty()
    ],
    chatController.deleteChat
);

export default router;