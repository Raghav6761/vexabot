import { Document } from 'mongoose';

export interface IOrganization extends Document {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}