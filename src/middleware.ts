// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// // export { auth as middleware } from "@/auth"

// import { auth } from "@/auth";

// const JWT_SECRET:string = process.env.JWT_SECRET || 'your-secure-secret-key';

// // Middleware function
// export async function middleware(req: NextRequest) {
//   const cookies = req.cookies; // Access cookies
//   const token = cookies.get('token')?.value; 

//   if (!token) {
//     return NextResponse.json(
//       { error: 'Unauthorized - Token not found' },
//       { status: 401 }
//     );
//   }

//   try {
//     jwt.verify(token, JWT_SECRET);
//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Unauthorized - Invalid token' },
//       { status: 401 }
//     );
//   }
// }

// export const config = {
//   matcher: ['/api/'], 
// };

// This will keep maintaining the session till the user is logged in and uses your app.
export {auth as middleware} from "../auth";

export const config = {
  matcher: []
}