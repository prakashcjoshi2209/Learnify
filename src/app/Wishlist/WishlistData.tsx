
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import ProfileSection from "../Cart/ProfileSection";

// interface ICourse {
//   _id: string;
//   name: string;
//   image: string;
//   price: { current: number };
//   shortDescription: string;
//   studentsEnrolled: number;
//   courseId: number;
// }

// // Sample Wishlist Data
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

//   // Remove from Wishlist
//   const handleRemove = (courseId: number) => {
//     setWishlist((prev) => prev.filter((item) => item.courseId !== courseId));
//   };

//   // Move to Cart
//   const handleMoveToCart = (course: ICourse) => {
//     setIsProcessing(true);

//     setTimeout(() => {
//       handleRemove(course.courseId);
//       setIsProcessing(false);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
//       <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-xl p-8 max-w-4xl w-full border border-white/10">
//         <h2 className="text-4xl font-extrabold text-white text-center mb-6">Your Wishlist 💖</h2>

//         {/* Empty Wishlist Message */}
//         {wishlist.length === 0 ? (
//           <p className="text-center text-white/90 text-lg font-semibold">
//             Your wishlist is empty 😔
//           </p>
//         ) : (
//           <div className="space-y-6">
//             {wishlist.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex flex-col sm:flex-row items-center gap-6 bg-white/30 p-5 rounded-lg shadow-md hover:shadow-xl transition"
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   width={150}
//                   height={100}
//                   className="rounded-lg shadow-md"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-2xl font-bold text-white">{item.name}</h3>
//                   <p className="text-sm text-white/80 mb-2">{item.shortDescription}</p>
//                   <p className="text-sm font-semibold text-white/90">
//                     🎓 Enrolled: <span className="font-normal">{item.studentsEnrolled}</span>
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-lg font-bold text-white">₹{item.price.current}</p>
//                   <button
//                     onClick={() => handleMoveToCart(item)}
//                     className="mt-2 px-6 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md transition hover:bg-green-600"
//                     disabled={isProcessing}
//                   >
//                     {isProcessing ? "Processing..." : "Move to Cart"}
//                   </button>
//                   <button
//                     onClick={() => handleRemove(item.courseId)}
//                     className="mt-2 ml-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md transition hover:bg-red-600"
//                   >
//                     Remove ❌
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;



'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import ProfileSection from '../Cart/ProfileSection';

interface ICourse {
  _id: string;
  name: string;
  shortDescription: string;
  image: string;
  price: {
    current: number;
    original: number;
  };
  studentsEnrolled: number;
}

const initialWishlist: ICourse[] = [
  {
    _id: '1',
    name: 'React for Beginners',
    shortDescription: 'Learn the fundamentals of React.js',
    image: '/LoginImage.png',
    price: {
      current: 2999,
      original: 4999,
    },
    studentsEnrolled: 1200,
  },
  {
    _id: '2',
    name: 'Advanced Node.js',
    shortDescription: 'Deep dive into backend development with Node.js',
    image: '/LoginImage.png',
    price: {
      current: 3499,
      original: 5999,
    },
    studentsEnrolled: 800,
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<ICourse[]>(initialWishlist);
  const router = useRouter();
  const { data: session } = useSession(); // Fetch session data

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Profile Section */}
      <div className="w-1/4 p-6 bg-white shadow-lg flex flex-col items-center">
        <ProfileSection session={session} />
      </div>
      {/* Wishlist Section */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-purple-800 mb-6">Wishlist</h1>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md p-4">
              <Image
                src={course.image}
                alt={course.name}
                width={300}
                height={180}
                className="rounded-lg"
              />
              <div className="mt-4">
                <p className="text-gray-600 text-sm">📅 1 - 28 July 2022</p>
                <h3 className="text-lg font-semibold text-indigo-700">{course.name}</h3>
                <p className="text-sm text-gray-500">{course.shortDescription}</p>

                {/* Student Count */}
                <div className="flex items-center mt-2">
                  <Image src="/images/students-icon.png" alt="Students" width={20} height={20} />
                  <span className="text-sm text-gray-600 ml-2">+ {course.studentsEnrolled} students</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center mt-2">
                  <p className="text-lg font-bold text-black">₹{course.price.current}</p>
                  <p className="text-sm text-gray-400 line-through ml-2">₹{course.price.original}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
