
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ICourse {
  _id: string;
  name: string;
  image: string;
  price: { current: number };
  shortDescription: string;
  studentsEnrolled: number;
  courseId: number;
}

// Sample Wishlist Data
const initialWishlist: ICourse[] = [
  {
    _id: "1",
    name: "React Mastery Course",
    image: "/images/react-course.jpg",
    price: { current: 4999 },
    shortDescription: "Learn React from scratch and build real-world projects.",
    studentsEnrolled: 1200,
    courseId: 101,
  },
  {
    _id: "2",
    name: "Next.js Advanced Guide",
    image: "/images/nextjs-course.jpg",
    price: { current: 5999 },
    shortDescription: "Master Next.js for full-stack web development.",
    studentsEnrolled: 850,
    courseId: 102,
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<ICourse[]>(initialWishlist);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Remove from Wishlist
  const handleRemove = (courseId: number) => {
    setWishlist((prev) => prev.filter((item) => item.courseId !== courseId));
  };

  // Move to Cart
  const handleMoveToCart = (course: ICourse) => {
    setIsProcessing(true);

    setTimeout(() => {
      handleRemove(course.courseId);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-xl p-8 max-w-4xl w-full border border-white/10">
        <h2 className="text-4xl font-extrabold text-white text-center mb-6">Your Wishlist 💖</h2>

        {/* Empty Wishlist Message */}
        {wishlist.length === 0 ? (
          <p className="text-center text-white/90 text-lg font-semibold">
            Your wishlist is empty 😔
          </p>
        ) : (
          <div className="space-y-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center gap-6 bg-white/30 p-5 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={150}
                  height={100}
                  className="rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                  <p className="text-sm text-white/80 mb-2">{item.shortDescription}</p>
                  <p className="text-sm font-semibold text-white/90">
                    🎓 Enrolled: <span className="font-normal">{item.studentsEnrolled}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">₹{item.price.current}</p>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="mt-2 px-6 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md transition hover:bg-green-600"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Move to Cart"}
                  </button>
                  <button
                    onClick={() => handleRemove(item.courseId)}
                    className="mt-2 ml-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md transition hover:bg-red-600"
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;





// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { BeatLoader } from "react-spinners";

// interface ICourse {
//   _id: string;
//   name: string;
//   image: string;
//   price: { current: number };
//   shortDescription: string;
//   studentsEnrolled: number;
//   courseId: number;
// }

// // Sample JSON Data
// const initialWishlist: ICourse[] = [
//   {
//     _id: "1",
//     name: "React Mastery Course",
//     image: "/images/react-course.jpg",
//     price: { current: 4999 },
//     shortDescription: "Learn React from scratch and build real-world projects.",
//     studentsEnrolled: 1200,
//     courseId: 101,
//   },
//   {
//     _id: "2",
//     name: "Next.js Advanced Guide",
//     image: "/images/nextjs-course.jpg",
//     price: { current: 5999 },
//     shortDescription: "Master Next.js for full-stack web development.",
//     studentsEnrolled: 850,
//     courseId: 102,
//   },
// ];

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState<ICourse[]>(initialWishlist);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const router = useRouter();

//   // Remove course from wishlist
//   const handleRemove = (courseId: number) => {
//     setWishlist((prev) => prev.filter((item) => item.courseId !== courseId));
//   };

//   // Move course to cart
//   const handleMoveToCart = (course: ICourse) => {
//     setIsProcessing(true);

//     // Simulating cart addition
//     setTimeout(() => {
//       handleRemove(course.courseId);
//       setIsProcessing(false);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center p-6">
//       <div className="bg-white shadow-2xl rounded-lg p-8 max-w-5xl w-full border border-gray-300">
//         <h2 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
//           Your Wishlist 💖
//         </h2>
//         <hr className="mb-6 border-gray-300" />

//         {/* Show when Wishlist is Empty */}
//         {wishlist.length === 0 ? (
//           <div className="text-center">
//             <p className="text-lg text-gray-600 font-semibold mb-4">
//               Your wishlist is empty 😔
//             </p>
//             <button
//               onClick={() => router.push("/courses")}
//               className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-300"
//             >
//               Browse Courses
//             </button>
//           </div>
//         ) : (
//           wishlist.map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="relative w-[150px] h-[100px] overflow-hidden rounded-lg shadow-lg">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   width={150}
//                   height={100}
//                   className="rounded-lg transform hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-2xl font-semibold text-gray-900">{item.name}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{item.shortDescription}</p>
//                 <p className="text-sm font-bold text-gray-700">
//                   🎓 Enrolled: <span className="font-normal">{item.studentsEnrolled}</span>
//                 </p>
//               </div>
//               <div className="text-right flex flex-col items-end">
//                 <p className="text-xl font-bold text-green-700">₹{item.price.current}</p>
//                 <button
//                   onClick={() => handleMoveToCart(item)}
//                   className="mt-3 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg shadow-md font-semibold hover:scale-105 transition-transform duration-300"
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? "Processing..." : "Move to Cart"}
//                 </button>
//                 <button
//                   onClick={() => handleRemove(item.courseId)}
//                   className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-red-600 transition-all duration-300"
//                 >
//                   Remove ❌
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;