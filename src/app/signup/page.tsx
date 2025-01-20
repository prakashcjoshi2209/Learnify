"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email should be valid"),
    password: z.string().min(6, "Password should have at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Password should have at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleGoogleSignup = () => {
    signIn("google", { callbackUrl: "/DashBoard" });
  };

  const handleGithubSignup = () => {
    signIn("github", { callbackUrl: "/DashBoard" });
  };

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setApiError(null);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong!");

      router.push("/login");
    } catch (error: any) {
      setApiError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-4xl overflow-hidden">
        {/* Left Section: Illustration */}
        <div className="hidden md:block bg-blue-100 p-8 w-1/2">
          <Image
            src="/signuppageimage.png"
            alt="Signup Illustration"
            width={400}
            height={400}
            className="mt-14 w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Right Section: Signup Form */}
        <div className="flex-1 flex justify-center items-center p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
              Create Your Account
            </h2>

            {apiError && (
              <div className="bg-red-100 text-red-600 p-3 mb-4 rounded-md text-center">
                {apiError}
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          className="w-full px-4 py-2 bg-white text-black placeholder:text-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          type="email"
                          className="w-full px-4 py-2 bg-white text-black placeholder:text-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          type="password"
                          className="w-full px-4 py-2 bg-white text-black placeholder:text-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Confirm your password"
                          {...field}
                          type="password"
                          className="w-full px-4 py-2 bg-white text-black placeholder:text-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition-colors"
                >
                  Sign Up
                </Button>
              </form>
            </Form>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>

            <div className="my-4 text-center text-gray-400">- OR -</div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-1/2 py-2 px-4 border rounded-md hover:bg-gray-100 transition"
                onClick={handleGoogleSignup}
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
                onClick={handleGithubSignup}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
