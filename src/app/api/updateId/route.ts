import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Course from "@/app/models/Course";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all courses without a `courseId` field
    const coursesWithoutId = await Course.find({ courseId: { $exists: false } });

    // If no courses found, return a response
    if (coursesWithoutId.length === 0) {
      return NextResponse.json({ message: "No courses found without courseId." });
    }

    // Update each course with a unique courseId
    let counter = 1; // Start the counter
    const updatePromises = coursesWithoutId.map((course) =>
      Course.findByIdAndUpdate(course._id, { courseId: counter++ }, { new: true })
    );

    // Wait for all updates to complete
    const updatedCourses = await Promise.all(updatePromises);

    // Respond with the updated courses
    return NextResponse.json({
      message: "Courses updated successfully.",
      updatedCourses,
    });
  } catch (error) {
    console.error("Error updating courses:", error);
    return NextResponse.json({ error: "Failed to update courses." }, { status: 500 });
  }
}