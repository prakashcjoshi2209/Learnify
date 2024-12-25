import connectDB from "@/lib/dbConnect";
import Course from "@/app/models/Course";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Fetch all courses
    const courses = await Course.find({}).lean();

    // Return the courses in JSON format
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch courses." }, { status: 500 });
  }
}
