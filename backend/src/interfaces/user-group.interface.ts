import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string,
    description: string,
    id: string,
    createdAt: Date;
    updatedAt: Date;
    members: number;
}