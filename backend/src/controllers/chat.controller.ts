// src/controllers/chat.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ChatService } from '../services/chat.service';
import { validationResult } from 'express-validator';
import { Server as SocketIOServer } from 'socket.io';

export class ChatController {
    // Private service instance
    private chatService: ChatService;

    constructor() {
        this.chatService = new ChatService(process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai');
    }

    // Create a new chat session
    createChatSession = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const token = (req as any).token;
            console.log('token in controller : ', token);

            // Set the authorization header before making the request
            this.chatService = new ChatService(
                process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
                token
            );

            const chatSession = await this.chatService.createChatSession(req.body);
            res.status(201).json(chatSession);
        } catch (error) {
            next(error);
        }
    };

    processChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const token = (req as any).token;

            // Initialize service with token
            this.chatService = new ChatService(
                process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
                token
            );

            // Extract request data
            const { messages, chat_id, chat_model } = req.body;

            // Get the Socket.IO server instance if available
            const io = req.app.get('io') as SocketIOServer | undefined;

            // Process the chat and get response
            const response = await this.chatService.processChat(messages, chat_id, chat_model);

            // Emit via Socket.IO if available and there's a chat_id
            if (io && response.chat_id) {
                io.to(response.chat_id).emit('new-message', {
                    role: 'assistant',
                    content: response.message,
                    timestamp: new Date()
                });
            }

            // Return response
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    // Send a message in a chat session
    sendMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const token = (req as any).token;
            console.log('token in controller : ', token);

            // Set the authorization header before making the request
            this.chatService = new ChatService(
                process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
                token
            );

            const { chatId } = req.params;
            const { message, model } = req.body;

            // Get the Socket.IO server instance
            const io = req.app.get('io') as SocketIOServer;

            // Process message and get response
            const response = await this.chatService.sendMessage(chatId, message, model);

            // Emit the message to all clients in the chat room
            io.to(chatId).emit('new-message', {
                sender: 'user',
                content: message,
                timestamp: new Date()
            });

            // Emit AI response
            io.to(chatId).emit('new-message', {
                sender: 'assistant',
                content: response.content,
                timestamp: new Date()
            });

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    // Get chat history for a specific chat session
    getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = (req as any).token;
            console.log('token in controller : ', token);

            // Set the authorization header before making the request
            this.chatService = new ChatService(
                process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
                token
            );

            const { chatId } = req.params;
            const history = await this.chatService.getChatHistory(chatId);

            if (!history) {
                res.status(404).json({ message: 'Chat session not found' });
                return;
            }

            res.json(history);
        } catch (error) {
            next(error);
        }
    };

    // Get all chat sessions for the current user
    getUserChats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = (req as any).token;
            console.log('token in controller : ', token);

            // Set the authorization header before making the request
            this.chatService = new ChatService(
                process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
                token
            );

            const chats = await this.chatService.getUserChats();
            res.json(chats);
        } catch (error) {
            next(error);
        }
    };

    // Process streaming chat request (Socket.IO based)
    // Process streaming chat request (Socket.IO based)
    streamChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const token = (req as any).token;
            console.log('token in controller : ', token);

            // Set the authorization header before making the request
            this.chatService = new ChatService(
                process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
                token
            );

            const { chatId } = req.params;
            const { message, model } = req.body;

            // Get the Socket.IO server instance
            const io = req.app.get('io') as SocketIOServer;

            // Signal streaming start to the client
            io.to(chatId).emit('assistant-response-start', { chatId });

            // Start streaming process
            const streamResponse = await this.chatService.streamChat(chatId, message, model);

            // Handle non-streaming fallback
            if (!streamResponse.stream) {
                io.to(chatId).emit('assistant-message-chunk', {
                    chatId,
                    chunk: streamResponse.content
                });

                io.to(chatId).emit('assistant-response-end', {
                    chatId,
                    messageId: streamResponse.messageId
                });

                res.status(200).json(streamResponse);
                return; // return void, not the response
            }

            // Send response to ensure the HTTP request completes
            res.status(200).json({
                success: true,
                message: 'Streaming started',
                chatId
            });

        } catch (error) {
            next(error);
        }
    };

    // Delete a chat session
    deleteChat = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = (req as any).token;
            console.log('token in controller : ', token);

            // Set the authorization header before making the request
            this.chatService = new ChatService(
                process.env.VEXABOT_API_URL || 'https://dev.vexabot.ai',
                token
            );

            const { chatId } = req.params;
            const result = await this.chatService.deleteChat(chatId);

            if (!result) {
                res.status(404).json({ message: 'Chat session not found' });
                return;
            }

            res.json({ message: 'Chat session deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}