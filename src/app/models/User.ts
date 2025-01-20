import mongoose, { Schema, Document } from 'mongoose';
// import { CourseSchema, ICourse } from './Course'; // Assuming the Course schema is exported properly.

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  avatar?: string;
  githubId?: string;
  googleId?: string;
  // coursesBought?: ICourse[];
  coursesBought?: number; 
  reviews?: string[];
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.githubId && !this.googleId;
      },
    },
    avatar: { type: String },
    githubId: { type: String, unique: true, sparse: true },
    googleId: { type: String, unique: true, sparse: true },
    coursesBought: {
      type: [Number], // Embedding just the courseId 
      default: [],
    },
    reviews: { type: [String], default: [] },
    resetToken: {type:String, required: false},
    resetTokenExpiry: {type: Date, required: false},
  },
  { timestamps: true }
);


export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
