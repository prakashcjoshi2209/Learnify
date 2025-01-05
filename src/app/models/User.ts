import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  avatar?: string;
  // githubAvatar?: string;
  githubId?: string;
  // googleAvatar?: string;
  googleId?: string;
  coursesBought?: ICourse[]; 
  reviews?: string[];
}

interface ICourse {
  courseName: string;
  courseImage: string;
  tutor: string;
  category: string;
  completionStatus: number;
}

const CourseSchema: Schema = new Schema({
  courseName: { type: String, required: true},
  courseImage: { type: String, required: true},
  tutor: {type: String, required: true},
  category: { type: String, required: true},
  completionStatus: { type: Number, default: 0, min: 0, max: 100 }, // Default to 0% completion
});

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
    // githubAvatar: { type: String },
    githubId: { type: String, unique: true, sparse: true },
    // googleAvatar: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    coursesBought: { 
      type: [CourseSchema],
      default: [
        {
          courseName: "Default Course 1",
          courseImage: "cloudinary/default_image",
          tutor: "john doe",
          category: "Programming",
          completionStatus: 0,
        },
        {
          courseName: "Default Course 2",
          courseImage: "cloudinary/default_image_2",
          tutor: "Kunal",
          category: "Design",
          completionStatus: 0,
        },
      ],
    },
    reviews: { type: Array, default: [] },
  },
  { timestamps: true }
);


export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
