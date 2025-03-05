import mongoose, { Schema } from 'mongoose';
import { IOrganization } from '../interfaces/organization.interface';

const OrganizationSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Organization name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);