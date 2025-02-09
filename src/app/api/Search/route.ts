import connectDB from "@/lib/dbConnect";
import Course from "@/app/models/Course";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    let courses;
    if (query) {
      // Case-insensitive search on course name and description
      courses = await Course.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }).lean();
    } else {
      courses = await Course.find({}).lean(); // Return all courses if no query is provided
    }

    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error("Error searching courses:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch courses." },
      { status: 500 }
    );
  }
}
