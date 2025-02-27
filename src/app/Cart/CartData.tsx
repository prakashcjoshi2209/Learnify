"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ICourse } from "../models/Course";
import makePayments from "@/lib/makePayments";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/Loader";

const CartData = () => {
  const [cart, setCart] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Function to fetch cart data
  useEffect(() => {
    const fetchCartCourses = async () => {
      try {
        const response = await fetch("/api/cartCourses"); // Ensure correct API endpoint
        if (!response.ok) {
          console.error("Error fetching courses");
          return;
        }
        const data: ICourse[] = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartCourses();
  }, []);

  // Handle Payment - Remove course on success
  const handlePayment = async (amount: number, courseName: string, courseId: number) => {
    setIsProcessing(true);
    try {
      await makePayments(amount, courseName, courseId, session, router);
      setCart((prevCart) => prevCart.filter((item) => item.courseId !== courseId));
      router.push("/DashBoard");
    } catch (error: unknown) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Remove - Remove course manually
  const handleRemove = async (courseId: number) => {
    try {
      const response = await fetch(`/api/removeCourse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove course");
      }

      // Remove course from UI after successful removal
      setCart((prevCart) => prevCart.filter((item) => item.courseId !== courseId));
    } catch (error) {
      console.error("Error removing course:", error);
    }
  };

  if (loading) {
    return <> <Loader/> </>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
        <hr className="mb-6 border-gray-300" />

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-lg font-semibold">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6 p-4 border-b border-gray-200"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={100}
                className="rounded-lg shadow-sm"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.shortDescription}</p>
                <p className="text-sm font-bold text-gray-700">
                  Enrolled: <span className="font-normal">{item.studentsEnrolled}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">₹{item.price.current}</p>
                <button
                  onClick={() => handlePayment(item.price.current, item.name, item.courseId)}
                  className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </button>
                <button
                  onClick={() => handleRemove(item.courseId)}
                  className="mt-2 ml-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartData;
