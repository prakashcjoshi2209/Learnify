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
// export {auth as middleware} from "../auth";

// export const config = {
//   matcher: []
// }


import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
// import { auth } from '../auth';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log("Middleware Debug - Token:", token);
  console.log("Request Path:", req.nextUrl.pathname);


  const isAuth = !!token; // Check if the user has a valid token
  const isLoginPage = req.nextUrl.pathname === '/login';
  const isForgetPasswordPage = req.nextUrl.pathname=== '/ForgetPassword';

  // If the user is authenticated and tries to access the login page, redirect them to the dashboard
  if (isAuth && isLoginPage) {
    console.log("User tries to access the login pages while he/she is successfully registered.");
    return NextResponse.redirect(new URL('/DashBoard', req.url));
  }
  
  // If the user is authenticated and tries to access the Forget Password page, redirect them to the dashboard
  if (isAuth && isForgetPasswordPage) {
    console.log("Redirecting to /dashboard");
    return NextResponse.redirect(new URL('/DashBoard', req.url));
  }

  // If the user is not authenticated and tries to access a protected route, redirect them to the login page
  if (!isAuth && req.nextUrl.pathname.startsWith('/DashBoard')) {
    console.log("Redirecting to /login due to missing auth");
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // For testing purposes
  if (!isAuth && req.nextUrl.pathname.startsWith('/pay')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Define the paths where the middleware should run
export const config = {
  matcher: ['/DashBoard/:path*', '/login', "/pay/:path*", "/ForgetPassword"], 
};