



// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import Image from "next/image";
// import { ICourse } from "../models/Course";

// const OffersSection: React.FC = () => {
//   const [courses, setCourses] = useState<ICourse[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [startIndex, setStartIndex] = useState(0);
//   const [itemsPerSlide, setItemsPerSlide] = useState(3);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch("/api/courseOffers");
//         if (!response.ok) throw new Error("Failed to fetch course offers");

//         const data = await response.json();
//         const courseData: ICourse[] = data.data;
//         setCourses(courseData);
//         setLoading(false);
//       } catch (err: unknown) {
//         if(err instanceof Error){
//           console.error("Some error has occured",err);
//           setError("Failed to load offers. Please try again.");
//           setLoading(false);
//         }
//         else{
//           setError("Failed to load offers. Please try again.");
//           setLoading(false);
//         }
//       }
//     };

//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     const updateItemsPerSlide = () => {
//       if (window.innerWidth < 640) {
//         setItemsPerSlide(1);
//       } else if (window.innerWidth < 1024) {
//         setItemsPerSlide(2);
//       } else {
//         setItemsPerSlide(3);
//       }
//     };

//     updateItemsPerSlide();
//     window.addEventListener("resize", updateItemsPerSlide);
//     return () => window.removeEventListener("resize", updateItemsPerSlide);
//   }, []);

//   useEffect(() => {
//     if (!isHovered) {
//       const interval = setInterval(() => {
//         setStartIndex((prev) => (prev + itemsPerSlide) % courses.length);
//       }, 3000);

//       return () => clearInterval(interval);
//     }
//   }, [startIndex, isHovered, itemsPerSlide, courses.length]);

//   const nextSlide = () => {
//     setStartIndex((prev) => (prev + itemsPerSlide) % courses.length);
//   };

//   const prevSlide = () => {
//     setStartIndex((prev) => (prev - itemsPerSlide + courses.length) % courses.length);
//   };

//   return (
//     <div className="mt-8 px-6 py-8 bg-gradient-to-r from-purple-50 to-indigo-100 shadow-lg rounded-lg w-full max-w-6xl mx-auto flex flex-col items-center overflow-hidden">
//       <p className="text-center text-2xl font-bold text-purple-700 mb-6" style={{ fontFamily: "'Irish Grover', cursive" }}>
//         Something Special Just for You! 🎉
//       </p>

//       {loading && <p className="text-center text-gray-600">Loading offers...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && !error && courses.length > 0 && (
//         <div 
//           className="relative w-full max-w-5xl flex items-center justify-center"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 z-10 p-1 text-purple-600 rounded-full shadow-md hover:bg-purple-300 transition-all duration-300 focus:outline-none"
//           >
//             <FaChevronLeft size={24} />
//           </button>

//           <AnimatePresence>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
//               {courses.slice(startIndex, startIndex + itemsPerSlide).map((course) => (
//                 <motion.div
//                   key={course.courseId}
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -50 }}
//                   transition={{ duration: 0.6, ease: "easeInOut" }}
//                   className="w-full"
//                 >
//                   <Card className="relative flex flex-col p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white rounded-lg overflow-hidden transform hover:scale-105 h-[320px]">
//                     <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
//                       {course.price.discountPercentage}% OFF
//                     </span>

//                     <div className="w-full">
//                       <Image src={course.image} alt={course.name} height={32} width={32} className="object-cover rounded-lg" />
//                     </div>

//                     <CardHeader className="flex-grow px-2 py-3 flex flex-col justify-between">
//                       <CardTitle className="text-lg font-semibold text-gray-800">{course.name}</CardTitle>
//                       <CardDescription className="text-sm text-gray-600 mt-2">{course.shortDescription}</CardDescription>

//                       <div className="flex justify-between items-center mt-4">
//                         <p className="text-xs font-medium text-gray-500">By {course.authors.map(author => author.name).join(", ")}</p>
//                         <button className="py-2 px-4 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md">
//                           Enroll Now!
//                         </button>
//                       </div>
//                     </CardHeader>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </AnimatePresence>

//           <button
//             onClick={nextSlide}
//             className="absolute right-0 z-10 p-1 text-purple-600 rounded-full shadow-md hover:bg-purple-300 transition-all duration-300 focus:outline-none"
//           >
//             <FaChevronRight size={24} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OffersSection;


"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

interface Offer {
  id: number;
  title: string;
  description: string;
  author: string;
  discount: string;
  image: string;
}

const offers: Offer[] = [
  { id: 1, title: "Mastering Next.js", description: "Learn Next.js with real-world projects.", author: "John Doe", discount: "40% OFF", image: "/signuppageimage.png" },
  { id: 2, title: "Advanced TypeScript", description: "Master TypeScript with deep concepts.", author: "Jane Smith", discount: "50% OFF", image: "/signuppageimage.png" },
  { id: 3, title: "Full-Stack MERN Bootcamp", description: "Become a full-stack developer.", author: "David Johnson", discount: "30% OFF", image: "/signuppageimage.png" },
  { id: 4, title: "React Native from Scratch", description: "Build mobile apps using React Native.", author: "Sarah Lee", discount: "60% OFF", image: "/signuppageimage.png" },
  { id: 5, title: "Next.js Advanced", description: "Go beyond the basics in Next.js.", author: "John Doe", discount: "80% OFF", image: "/signuppageimage.png" },
  { id: 6, title: "TypeScript Pro", description: "Advanced TypeScript for developers.", author: "Jane Smith", discount: "90% OFF", image: "/signuppageimage.png" },
];

const OffersSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setStartIndex((prev) => (prev + itemsPerSlide) % offers.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [startIndex, isHovered, itemsPerSlide]);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + itemsPerSlide) % offers.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - itemsPerSlide + offers.length) % offers.length);
  };

  return (
    <div className="mt-8 px-6 py-8 bg-gradient-to-r from-purple-50 to-indigo-100 shadow-lg rounded-lg w-full max-w-6xl mx-auto flex flex-col items-center overflow-hidden">
      <p
        className="text-center text-2xl font-bold text-purple-700 mb-6"
        style={{
          fontFamily: "'Irish Grover', cursive",
        }}
      >
        Something Special Just for You! 🎉
      </p>

      <div 
        className="relative w-full max-w-5xl flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-1 text-purple-600 rounded-full shadow-md hover:bg-purple-300 transition-all duration-300 focus:outline-none"
        >
          <FaChevronLeft size={24} />
        </button>

        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {offers.slice(startIndex, startIndex + itemsPerSlide).map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full"
              >
                <Card className="relative flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white rounded-lg overflow-hidden transform hover:scale-105 h-[320px]">
                  {/* Discount Badge */}
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {offer.discount}
                  </span>

                  {/* Image Section - Limited to 1/3rd of Card Height */}
                  <div className="w-full h-[100px] relative">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>

                  {/* Content Section */}
                  <CardHeader className="flex-grow px-2 py-3 flex flex-col justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800">{offer.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-2">{offer.description}</CardDescription>

                    {/* Author & Button Section */}
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xs font-medium text-gray-500">By {offer.author}</p>
                      <button className="py-2 px-4 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md">
                        Enroll Now!
                      </button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-1 text-purple-600 rounded-full shadow-md hover:bg-purple-300 transition-all duration-300 focus:outline-none"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default OffersSection;
