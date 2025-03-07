// src/services/chat.service.ts
import axios, { AxiosError, AxiosInstance } from 'axios';
import { IChatSession, IChatMessage, IStreamingResponse } from '../interfaces/chat.interface';

interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
}

interface HTTPValidationError {
    detail: ValidationError[];
}

export class ChatService {
    private api: AxiosInstance;

    constructor(baseURL: string, token?: string) {
        this.api = axios.create({
            baseURL,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (token) {
            this.api.defaults.headers.common['Authorization'] = `Bearer ${token.trim()}`;
        }
    }

    async createChatSession(sessionData: Partial<IChatSession>): Promise<IChatSession> {
        try {
            const response = await this.api.post<IChatSession>('/chat/sessions', sessionData);
            return response.data;
        } catch (error) {
            console.log('error : ', error);
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    // Process a chat request
    async processChat(messages: any[], chatId?: string, chatModel?: string): Promise<any> {
        try {
            const payload = {
                messages: messages,
                chat_id: chatId,
                chat_model: chatModel
            };

            // console.log('chat service payload', payload)

            const response = await this.api.post('/chat', payload);
            return response.data;
        } catch (error) {
            console.log('error : ', error);
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }


    async sendMessage(chatId: string, message: string, model?: string): Promise<IChatMessage> {
        try {
            const response = await this.api.post<IChatMessage>(`/chat/sessions/${chatId}/messages`, {
                content: message,
                model: model || 'default'
            });
            return response.data;
        } catch (error) {
            console.log('error : ', error);
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async getChatHistory(chatId: string): Promise<IChatMessage[]> {
        try {
            console.log('Request headers:', this.api.defaults.headers);
            const response = await this.api.get<IChatMessage[]>(`/chat/sessions/${chatId}/messages`);
            return response.data;
        } catch (error) {
            console.log('error : ', error);
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async getUserChats(): Promise<IChatSession[]> {
        try {
            console.log('Request headers:', this.api.defaults.headers);
            const response = await this.api.get<IChatSession[]>('/chat/sessions');
            return response.data;
        } catch (error) {
            console.log('error : ', error);
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async streamChat(chatId: string, message: string, model?: string): Promise<IStreamingResponse> {
        try {
            // Check if the API supports streaming
            const streamingSupported = await this.isStreamingSupported();

            if (!streamingSupported) {
                // Fallback to regular message if streaming is not supported
                const response = await this.sendMessage(chatId, message, model);
                return {
                    stream: false,
                    content: response.content,
                    messageId: response.id || String(Date.now())
                };
            }

            // Initialize streaming if supported
            const response = await this.api.post<any>(
                `/chat/sessions/${chatId}/stream`,
                {
                    content: message,
                    model: model || 'default'
                },
                {
                    responseType: 'stream'
                }
            );

            return {
                stream: true,
                streamSource: response.data,
                messageId: String(Date.now())
            };
        } catch (error) {
            console.log('error : ', error);
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async deleteChat(chatId: string): Promise<boolean> {
        try {
            const response = await this.api.delete<any>(`/chat/sessions/${chatId}`);
            return true;
        } catch (error) {
            console.log('error : ', error);
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    private async isStreamingSupported(): Promise<boolean> {
        try {
            // Try to check API capabilities
            const response = await this.api.get<any>('/chat/capabilities');
            return response.data?.streaming === true;
        } catch (error) {
            // If capability check fails, assume no streaming support
            console.log('Streaming capability check failed, assuming not supported');
            return false;
        }
    }

    private handleError(error: AxiosError<HTTPValidationError>): Error {
        console.log('Error response:', error.response?.data);

        if (error.response?.data?.detail) {
            const validationErrors = error.response.data.detail
                .map(err => `${err.loc.join('.')}: ${err.msg}`)
                .join('; ');
            return new Error(validationErrors);
        }
        return error as Error;
    }
}