import { sendCookie } from "@/app/lib/cookie";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
        console.log("Email galat hai!")
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        console.log("Password Galat hai!");
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return sendCookie({
      user,
      message: "Logged in successfully!",
    });
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
