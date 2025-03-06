// src/interfaces/chat.interface.ts
export interface IChatSession {
    id: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    organizationId?: string;
    projectId?: string;
    model?: string;
}

export interface IChatMessage {
    id: string;
    chatId?: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt: Date;
    userId?: string;
    model?: string;
}

export interface IStreamingResponse {
    stream: boolean;
    messageId: string;
    content?: string;
    streamSource?: any;
}