import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  avatar?: string;
  githubAvatar?: string;
  githubId?: string;
  googleAvatar?: string;
  googleId?: string;
  coursesBought?: number;
  reviews?: string[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { 
    type: String, 
    required: function(this: IUser) { 
      return !this.githubId && !this.googleId; 
    } 
  },
  avatar: { type: String },
  githubAvatar: { type: String },
  githubId: { type: String, unique: true, sparse: true },
  googleAvatar: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  coursesBought: { type: Number, default: 0 },
  reviews: { type: Array, default: [] },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
