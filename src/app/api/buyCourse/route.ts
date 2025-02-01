import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "@/lib/dbConnect";
import Course from "@/app/models/Course";
import { auth } from "../../../../auth";
import User from "@/app/models/User";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});


export async function POST(request: NextRequest) {
    const session = await auth();
    const { cId, paymentId } = await request.json();
    await connectDB();

    const course = await Course.findOne({ courseId: cId });
    if (!course) {
        return NextResponse.json({ error: "Invalid course ID." }, { status: 400 });
    }

    const user = await User.findOne({ _id: session?.user?.id });
    if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    
    try {
        const paymentDetails = await razorpay.payments.fetch(paymentId);
        if (paymentDetails.status === "captured") {
            if (!user.coursesBought.includes(cId)) {
                user.coursesBought.push(cId);
                await user.save();
                course.studentsEnrolled +=1;
                await course.save();
            }
            return NextResponse.json({ message: `Payment successful and ${course.name} course added.` }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Error verifying payment:", error);
        return NextResponse.json({ error: "Error verifying payment." }, { status: 500 });
    }
}
