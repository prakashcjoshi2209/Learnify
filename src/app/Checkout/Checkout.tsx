



"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import OrderSummary from "./OrderSummary"; 
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  email: z.string().email("Email should be valid"),
});

const Checkout = () => {
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleContinue = (data: z.infer<typeof signUpSchema>) => {
    setShowOtpField(true);
    alert("OTP sent to email");
    console.log("OTP sent to:", data.email);
  };

  const handleGithubSignIn = () => signIn("github", { callbackUrl: "/DashBoard" });
  const handleGoogleSignIn = () => signIn("google", { callbackUrl: "/DashBoard" });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8">
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center">Checkout</h1>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700 text-center">
              Log in or create an account
            </h2>
            <p className="text-gray-600 text-sm text-center mt-1">
              A <span className="font-semibold text-purple-700">Learnify</span> account is required to access your purchased courses.
            </p>

            <div className="flex space-x-4 mt-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center border border-gray-300 px-4 py-2 rounded-lg w-1/2 justify-center hover:bg-gray-100 transition"
              >
                <FcGoogle size={24} className="mr-2" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center border border-gray-300 px-4 py-2 rounded-lg w-1/2 justify-center hover:bg-gray-100 transition"
                onClick={handleGithubSignIn}
              >
                <FaGithub size={24} className="mr-2" />
                GitHub
              </button>
            </div>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500 font-semibold">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleContinue)}>
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            {...field}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-gray-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-gray-500 text-xs mt-1">No password required</p>
                </div>

                {!showOtpField && (
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 mt-6 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Continue
                  </button>
                )}
              </form>
            </Form>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
