import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'user name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [false, 'Description is required'],
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model<IUser>('User', UserSchema);