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
      .min(6, "Password should have at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Page = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setApiError(null); // Clear any previous error
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong!");
      }

      // Redirect to login page after successful signup
      router.push("/login");
    } catch (error: any) {
      setApiError(error.message);
    }
  }
  const handleGoogleSignup = () => {
    signIn("google", { callbackUrl: "/DashBoard" }); // Replace '/' with your desired post-login URL
  };
  const handleGithubSignup = () => {
    signIn("github", { callbackUrl: "/Dashboard" }); // Replace '/' with your desired post-login URL
  };

  return (
    <>
      <div className="signUpWrapper flex flex-col lg:flex-row items-center justify-center min-h-screen p-4">
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <Image
            src="/signuppageimage.png"
            alt="Signup Page Image"
            className="max-w-full h-auto rounded-lg"
            width={600}
            height={400}
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="right w-full max-w-md px-4">
            <h3 className="text-center text-2xl font-semibold mb-6">
              Create your Free Account
            </h3>

            {apiError && (
              <div className="bg-red-100 text-red-600 p-3 mb-4 rounded-md text-center">
                {apiError}
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-0 py-3 mb-2">
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          className="w-full"
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
                    <FormItem className="space-y-0 py-3 mb-2">
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          {...field}
                          className="w-full"
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
                    <FormItem className="space-y-0 py-3 mb-2">
                      <FormControl>
                        <Input
                          placeholder="Enter password"
                          type="password"
                          {...field}
                          className="w-full"
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
                    <FormItem className="space-y-0 py-3 mb-6">
                      <FormControl>
                        <Input
                          placeholder="Confirm password"
                          type="password"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full lg:w-80 bg-purple-950 text-white py-2 px-4 rounded-lg mt-4"
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>

          <div className="w-full mt-6 text-center">
            <p className="my-6 text-gray-600">
              Already have an account?{" "}
              <Link href="/login">
                <strong className="text-blue-700">Log in</strong>
              </Link>
            </p>
            <p className="text-center py-3 text-gray-700 font-bold">- OR -</p>
            <div className="flex space-x-20 ms-28">
              <div className="border-solid border-2 border-black rounded-2xl p-1">
                <Button variant={"outline"} className="socialFormBtn" onClick={handleGoogleSignup}>
                  <FaGoogle className="h-5 w-5" />
                </Button>
                <p>Sign up with Google</p>
              </div>

              <div className="border-solid border-2 border-black rounded-2xl p-1">
                <Button variant={"outline"} className="socialFormBtn" onClick={handleGithubSignup}>
                  <FaGithub className="h-5 w-5" />
                </Button>
                <p>Sign up with Github</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;




