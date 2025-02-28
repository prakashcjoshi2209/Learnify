

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { ICourse } from "../models/Course";
// import makePayments from "@/lib/makePayments";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import Loader from "@/components/ui/Loader";

// const CartData = () => {
//   const [cart, setCart] = useState<ICourse[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCartCourses = async () => {
//       try {
//         const response = await fetch("/api/cartCourses");
//         if (!response.ok) throw new Error("Error fetching courses");
//         const data: ICourse[] = await response.json();
//         setCart(data);
//       } catch (error) {
//         console.error("Error fetching cart data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartCourses();
//   }, []);

//   const handlePayment = async (amount: number, courseName: string, courseId: number) => {
//     setIsProcessing(true);
//     try {
//       await makePayments(amount, courseName, courseId, session, router);
//       setCart((prevCart) => prevCart.filter((item) => item.courseId !== courseId));
//       router.push("/DashBoard");
//     } catch (error) {
//       console.error("Payment failed:", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleRemove = async (courseId: number) => {
//     try {
//       const response = await fetch("/api/removeCourse", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ courseId }),
//       });

//       if (!response.ok) throw new Error("Failed to remove course");

//       setCart((prevCart) => prevCart.filter((item) => item.courseId !== courseId));
//     } catch (error) {
//       console.error("Error removing course:", error);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Your Cart Heading (Left Aligned) */}
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-lg font-semibold text-gray-600">Your cart is empty</p>
//       ) : (
//         <div className="space-y-6">
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col sm:flex-row items-center gap-6 bg-white p-5 rounded-lg shadow-md border-b-4 border-purple-500 hover:shadow-lg transition"
//             >
//               {/* Course Image */}
//               <Image
//                 src={item.image}
//                 alt={item.name}
//                 width={150}
//                 height={100}
//                 className="rounded-lg shadow-md"
//               />

//               {/* Course Details */}
//               <div className="flex-1">
//                 <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{item.shortDescription}</p>
//                 <p className="text-sm font-medium text-gray-700">
//                   Enrolled: <span className="font-normal">{item.studentsEnrolled}</span>
//                 </p>
//               </div>

//               {/* Price & Buttons */}
//               <div className="text-right">
//                 <p className="text-lg font-bold text-gray-900">₹{item.price.current}</p>

//                 {/* Pay Now Button */}
//                 <button
//                   onClick={() => handlePayment(item.price.current, item.name, item.courseId)}
//                   className="mt-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? "Processing..." : "Pay Now"}
//                 </button>

//                 {/* Remove Button */}
//                 <button
//                   onClick={() => handleRemove(item.courseId)}
//                   className="mt-2 ml-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartData;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/Loader";
import ProfileSection from "./ProfileSection";
import makePayments from "@/lib/makePayments";
import { TrashIcon } from "@heroicons/react/24/solid";

interface ICourse {
  _id: string;
  name: string;
  image: string;
  shortDescription: string;
  studentsEnrolled: number;
  price: { current: number; original: number };
  courseId: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingCourse, setProcessingCourse] = useState<number | null>(null);
  const { data: session } = useSession(); // Retrieve session
  const router = useRouter();

  useEffect(() => {
    const fetchCartCourses = async () => {
      try {
        const response = await fetch("/api/cartCourses");
        if (!response.ok) throw new Error("Error fetching courses");
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

  const handlePayment = async (amount: number, courseName: string, courseId: number) => {
    setProcessingCourse(courseId);
    try {
      await makePayments(amount, courseName, courseId, session, router);
      const updatedCart = cart.filter((item) => item.courseId !== courseId);
      setCart(updatedCart);
      router.push("/DashBoard");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setProcessingCourse(null);
    }
  };

  const handleRemove = async (courseId: number) => {
    try {
      const response = await fetch("/api/removeCourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) throw new Error("Failed to remove course");

      setCart((prevCart) => prevCart.filter((item) => item.courseId !== courseId));
    } catch (error) {
      console.error("Error removing course:", error);
    }
  };

  if (loading) return <Loader />;

  const totalAmount = cart.reduce((sum, item) => sum + item.price.current, 0);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Profile Section Sidebar */}
      <div className="w-1/4 p-6 bg-white shadow-lg flex flex-col items-center">
        <ProfileSection session={session} /> {/* Pass session prop */}
      </div>

      {/* Cart Section */}
      <div className="w-3/4 p-8">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-lg font-semibold text-gray-600">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="relative flex items-center gap-6 bg-white p-6 rounded-lg shadow-md border-l-8 border-purple-500 hover:shadow-lg transition transform hover:-translate-y-1 duration-300"
              >
                {/* Remove Button with Trash Icon */}
                <button
                  onClick={() => handleRemove(item.courseId)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>

                {/* Course Image */}
                <div className="w-32 h-32 overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Course Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.shortDescription}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Enrolled: {item.studentsEnrolled} students
                  </p>
                </div>

                {/* Pricing & Actions */}
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">₹{item.price.current}</p>
                  <p className="text-sm text-gray-500 line-through">₹{item.price.original}</p>
                  <button
                    onClick={() => handlePayment(item.price.current, item.name, item.courseId)}
                    className={`mt-3 px-5 py-2 text-white rounded-lg transition shadow-md ${
                      processingCourse === item.courseId
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-indigo-600  hover:bg-green-700"
                    }`}
                    disabled={processingCourse === item.courseId}
                  >
                    {processingCourse === item.courseId ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total Amount Section */}
        {cart.length > 0 && (
          <div className="mt-8 p-6 bg-white shadow-md rounded-lg flex justify-between items-center border-t-4 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-800">Total: ₹{totalAmount}</h3>
            <button
              onClick={() => handlePayment(totalAmount, "Total Cart Payment", 0)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600  text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
