import mongoose, { Schema } from 'mongoose';
import { IProject } from '../interfaces/project.interface';

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  organization_id:{
    type: String,
    // required: 
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model<IProject>('Project', ProjectSchema);