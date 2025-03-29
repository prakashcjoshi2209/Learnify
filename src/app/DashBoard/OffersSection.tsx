// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { ICourse } from "../models/Course";

// const OffersSection: React.FC = () => {
//   const [courses, setCourses] = useState<ICourse[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [navigating, setNavigating] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [startIndex, setStartIndex] = useState(0);
//   const [itemsPerSlide, setItemsPerSlide] = useState(3);
//   const [isHovered, setIsHovered] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch("/api/courseOffers");
//         if (!response.ok) throw new Error("Failed to fetch course offers");

//         const data = await response.json();
//         const courseData: ICourse[] = data.data;
//         console.log(courseData);
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
//                         <button onClick={()=> 
//                           {
//                             setNavigating(true);
//                             router.push(`/CourseContent/${course.courseId}`); 
//                           }} className="py-2 px-4 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md">
//                           { navigating ? "Loading..." : "Enroll Now!"}
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
//     </div>
//   );
// };

// export default OffersSection;





"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ICourse } from "../models/Course";

const OffersSection: React.FC = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courseOffers");
        if (!response.ok) throw new Error("Failed to fetch course offers");

        const data = await response.json();
        setCourses(data.data);
        setLoading(false);
      } catch (err: unknown) {
        setError("Failed to load offers. Please try again.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
        setStartIndex((prev) => (prev + itemsPerSlide) % courses.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [startIndex, isHovered, itemsPerSlide, courses.length]);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + itemsPerSlide) % courses.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - itemsPerSlide + courses.length) % courses.length);
  };

  return (
    <div className="mt-8 px-6 py-8 bg-gradient-to-r from-purple-50 to-indigo-100 shadow-lg rounded-lg w-full max-w-6xl mx-auto flex flex-col items-center overflow-hidden">
      <p className="text-center text-2xl font-bold text-purple-700 mb-6" style={{ fontFamily: "'Irish Grover', cursive" }}>
        Something Special Just for You! 🎉
      </p>

      {loading && <p className="text-center text-gray-600">Loading offers...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div  
        className="relative w-full max-w-5xl flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-1 text-purple-600 rounded-full shadow-md hover:bg-purple-300 transition-all duration-300 focus:outline-none"
        >
          <FaChevronLeft size={24} />
        </button>

        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {courses.slice(startIndex, startIndex + itemsPerSlide).map((course) => (
              <motion.div
                key={course.courseId}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full"
              >
                <Card className="relative flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white rounded-lg overflow-hidden transform hover:scale-105 h-[320px]">
                  {/* Image Section (Top 1/3 of Card) */}
                  <div className="relative w-full h-1/3 flex-shrink-0">
                    <Image src={course.image} alt={course.name} layout="fill" objectFit="cover" className="rounded-t-lg" />

                    {/* Discount Badge on Image (Top Right) */}
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                      {course.price.discountPercentage}% OFF
                    </span>
                  </div>

                  {/* Content Section (Below Image) */}
                  <CardHeader className="flex-grow p-4 flex flex-col justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800">{course.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-2">{course.shortDescription}</CardDescription>

                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xs font-medium text-gray-500">By {course.authors.map(author => author.name).join(", ")}</p>
                      <button 
                        onClick={() => {
                          setNavigating(true);
                          router.push(`/CourseContent/${course.courseId}`); 
                        }} 
                        className="py-2 px-4 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md"
                      >
                        {navigating ? "Loading..." : "Enroll Now!"}
                      </button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

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
