import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    is_super_admin: boolean;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}