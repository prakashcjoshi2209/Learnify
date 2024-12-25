import mongoose, { Schema, Document } from 'mongoose';

// Interfaces for nested objects
interface IAuthor {
  name: string;
  bio: string;
  profileImage: string;
}

interface ILargeDescription {
  intro: string;
  subPoints: string[];
}

interface IPrice {
  current: number;
  original: number;
  discountPercentage: number;
}

interface IModule {
  moduleNumber: number;
  moduleTitle: string;
  moduleDuration: string;
  reward: number;
}

interface IRating {
  average: number;
  totalRatings: number;
}

interface IReview {
  user: string;
  comment: string;
  rating: number;
}

interface IReward {
  totalReward: number;
}

interface IMediaContent {
  type: string;
  url: string;
}

// Main interface for the Course document
export interface ICourse extends Document {
  name: string;
  image: string;
  studentsEnrolled: number;
  shortDescription: string;
  authors: IAuthor[];
  largeDescription: ILargeDescription;
  price: IPrice;
  duration: string;
  modules: IModule[];
  requirements: string[];
  prerequisites: string[];
  ratings: IRating;
  reviews: IReview[];
  rewards: IReward;
  category: string;
  tags: string[];
  lastUpdated: Date;
  mediaContent: IMediaContent[];
}

// Schema definitions for nested objects
const AuthorSchema: Schema = new Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  profileImage: { type: String, required: true },
});

const LargeDescriptionSchema: Schema = new Schema({
  intro: { type: String, required: true },
  subPoints: { type: [String], required: true },
});

const PriceSchema: Schema = new Schema({
  current: { type: Number, required: true },
  original: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
});

const ModuleSchema: Schema = new Schema({
  moduleNumber: { type: Number, required: true },
  moduleTitle: { type: String, required: true },
  moduleDuration: { type: String, required: true },
  reward: { type: Number, required: true },
});

const RatingSchema: Schema = new Schema({
  average: { type: Number, required: true },
  totalRatings: { type: Number, required: true },
});

const ReviewSchema: Schema = new Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
});

const RewardSchema: Schema = new Schema({
  totalReward: { type: Number, required: true },
});

const MediaContentSchema: Schema = new Schema({
  type: { type: String, required: true },
  url: { type: String, required: true },
});

// Main Course schema
const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  studentsEnrolled: { type: Number, required: true },
  shortDescription: { type: String, required: true },
  authors: { type: [AuthorSchema], required: true },
  largeDescription: { type: LargeDescriptionSchema, required: true },
  price: { type: PriceSchema, required: true },
  duration: { type: String, required: true },
  modules: { type: [ModuleSchema], required: true },
  requirements: { type: [String], required: true },
  prerequisites: { type: [String], required: true },
  ratings: { type: RatingSchema, required: true },
  reviews: { type: [ReviewSchema], required: true },
  rewards: { type: RewardSchema, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  lastUpdated: { type: Date, required: true },
  mediaContent: { type: [MediaContentSchema], required: true },
});

// Export the model
export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
