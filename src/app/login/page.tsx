"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/DashBoard";
  console.log(redirectPath);
  const handleLogin = async (e: any) => {
    setIsProcessing(true);
    e.preventDefault();
    setMessage("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: redirectPath,
    });

    // setIsProcessing(false);

    if (result?.error) {
      setIsProcessing(false);
      console.log("Login failed", result.error);
      setMessage("Invalid email or password. Please try again.");
    } else {
      console.log("Login successful!");
      router.push(redirectPath);
    }
  };

  const handleGoogleSignIn = () => {
    setIsProcessing(true);
    signIn("google", { callbackUrl: redirectPath });
  };
  const handleGithubSignIn = () => {
    setIsProcessing(true);
    signIn("github", { callbackUrl: redirectPath });
  };

  const handleLoaderForLink = ()=>{
    setIsProcessing(true);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-4xl overflow-hidden">
        <div className="hidden md:block bg-blue-100 p-8 w-1/2">
          <Image
            src="/signuppageimage.png"
            alt="Login Illustration"
            width={400}
            height={400}
            className="mt-14 w-full h-auto object-cover"
            priority
          />
        </div>

        <div className="flex-1 flex justify-center items-center p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Welcome Back!
            </h2>
            {message && (
              <p
                className={`text-center py-2 rounded-md ${
                  message.includes("Invalid")
                    ? "text-red-600 bg-red-100"
                    : "text-green-600 bg-green-100"
                }`}
              >
                {message}
              </p>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-gray-600 text-sm">
                  <input type="checkbox" className="form-checkbox mr-2" />
                  Remember me
                </label>
                <Link
                  onClick={handleLoaderForLink}
                  href="/ForgetPassword"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                disabled={isProcessing}
              >
                {isProcessing ? <Loader /> : "Log In"}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link onClick={handleLoaderForLink} href="/signup" className="text-blue-500 hover:underline">
                Signup
              </Link>
            </p>
            <div className="my-4 text-center text-gray-400">- OR -</div>
            <div className="flex gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-1/2 py-2 px-4 border rounded-md hover:bg-gray-100 transition"
                onClick={handleGoogleSignIn}
              >
                <Image
                  src="/images/google.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-1/2 py-2 px-4 border rounded-md hover:bg-gray-100 transition"
                onClick={handleGithubSignIn}
              >
                <Image
                  src="/images/github.png"
                  alt="GitHub"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
