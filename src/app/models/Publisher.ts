import mongoose, { Schema, Document } from 'mongoose';


interface ICoursesPublished {
    coursesPublished: number[];
    totalCoursesPublished: number;
}

export interface IPublisher extends Document {
    name: string;
    email: string;
    bio: string;
    description: string;
    reviews: number;
    ratings: number;
    coursesPublished: ICoursesPublished;
    studentsTaught: number;
}

const CoursesSchema : Schema = new Schema({
    publishedCourses: {type: [Number],},
    totalPublishedCourses: {type: Number, }
})


const PublisherSchema: Schema = new Schema(
    {   name: {type: String, },
        email: { type: String, unique: true },
        bio: {type: String},
        description: {type: String},
        reviews: {type: Number, default: 0},
        ratings: {type: Number, default: 0},
        coursesPublished: {type: CoursesSchema},
        studentsTaught: {type: Number, default: 0},
    },
    { timestamps: true }
);


export default mongoose.models.Publisher || mongoose.model<IPublisher>('Publisher', PublisherSchema);

