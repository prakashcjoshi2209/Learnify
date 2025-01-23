"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/DashBoard";

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setMessage("");
    setIsProcessing(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: redirectPath,
    });

    if (result?.error) {
      setIsProcessing(false);
      console.error("Login failed", result.error);
      setMessage("Invalid email or password.");
    } else {
      console.log("Login successful!");
      router.push(redirectPath);
    }
  };

  const handleSocialSignIn = async (provider: string) => {
    try {
      setLoader(true);
      await signIn(provider, { callbackUrl: redirectPath });
    } catch (error) {
      console.error("Social login failed", error);
      setMessage("Social login failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  // const handleLoaderForLink = () => {
  //   setIsProcessing(true);
  // };

  const handleLoader = () => {
    setLoader(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-4xl overflow-hidden">
        {/* Left Section: Image */}

        <div className="hidden md:flex bg-purple-500 p-8 w-1/2 items-center justify-center">
          <Image
            src="/LoginImage.png"
            alt="Login Illustration"
            width={400}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Right Section: Form */}
        <div className="flex-1 flex justify-center items-center p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
              Welcome Back!
            </h2>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-1/2 py-2 px-4 border rounded-md hover:bg-gray-100 transition"
                onClick={() => handleSocialSignIn("google")}
              >
                <Image
                  src="/google1.png"
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
                onClick={() => handleSocialSignIn("github")}
              >
                <Image
                  src="/github.png"
                  alt="GitHub"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                GitHub
              </button>
            </div>

            <div className="my-4 text-center text-gray-400">- OR -</div>

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
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-gray-600 text-sm">
                  <input
                    type="checkbox"
                    className="form-checkbox mr-2 focus:ring-purple-500"
                  />
                  Remember me
                </label>
                <Link
                  onClick={handleLoader}
                  href="/ForgetPassword"
                  className="text-purple-600 hover:underline text-sm"
                >
                  {loader ? <Loader /> : "Forgot Password?"}
                </Link>
              </div>
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md text-white transition ${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
                disabled={isProcessing}
              >
                {isProcessing ? "Loading..." : "Log In"}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link
                onClick={handleLoader}
                href="/signup"
                className="text-purple-600 hover:underline"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
