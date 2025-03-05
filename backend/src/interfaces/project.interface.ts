import { Document } from 'mongoose';

export interface IProject extends Document {
    name: string;
    description: string;
    organization_id: string;
    createdAt: Date;
    // updatedAt: Date;
}