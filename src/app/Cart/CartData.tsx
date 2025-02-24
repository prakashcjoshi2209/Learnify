


"use client";

import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import Card from "../ExploreData/Card"; 

const initialCartItems = [
  {
    courseId: 1,
    title: "React for Beginners",
    image: "/consistiimage.png",
    students: 1200,
    price: 999,
    originalPrice: 1999,
    description: "Learn the basics of React.js with  projects.",
    buttonLabel: "Enroll Now",
    dateRange: "March 1 - April 15",
  },
  {
    courseId: 2,
    title: "Advanced TypeScript",
    image: "/consistiimage.png",
    students: 850,
    price: 1299,
    originalPrice: 2499,
    description: "Master TypeScript with real-world applications.",
    buttonLabel: "Enroll Now",
    dateRange: "April 10 - May 25",
  },
  {
    courseId: 3,
    title: "Next.js Masterclass",
    image: "/consistiimage.png",
    students: 600,
    price: 1499,
    originalPrice: 2999,
    description: "Deep dive into Next.js with real-world projects.",
    buttonLabel: "Enroll Now",
    dateRange: "May 5 - June 20",
  },
];

const CartData = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  return (
    <div className="container mx-auto p-6">
      {/* Gradient Purple Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-600 to-indigo-500 text-transparent bg-clip-text">
        Your Cart !!!
      </h1>

      {/* Cart Items Count */}
      <h2 className="text-lg font-semibold text-gray-700 text-purple-700 text-4xl text-center mb-6">
        {cartItems.length} {cartItems.length === 1 ? "Course" : "Courses"} in Cart
      </h2>

      {/* Empty Cart Section */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <FaCartShopping size={100} className="text-purple-500 mb-4 animate-bounce" />
          <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-500">No courses available</p>
        </div>
      ) : (
        // Responsive Grid - 3 Cards Per Row on Large Screens
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cartItems.map((course) => (
            <div 
              key={course.courseId} 
              className="transition-transform transform hover:scale-105  duration-300 min-h-[400px] flex flex-col"
            >
              <Card {...course} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartData;
