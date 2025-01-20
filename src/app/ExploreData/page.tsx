// "use client";

// import React from "react";
// import Card from "./Card";
// import Navbar from "../Navbar/page";
// import Footer from "../Footer/page";


// interface Course {
//   id: number;
//   title: string;
//   image: string;
//   students: number;
//   price: number;
//   originalPrice: number;
//   description: string;
//   dateRange: string;
// }

// const courses: Course[] = [
//   {
//     id: 1,
//     title: "Product Management Basics",
//     image: "https://tse4.mm.bing.net/th?id=OIP.uO_Bh9tvWjr1yzqR9HhICQHaE-&pid=Api&P=0&h=180",
//     students: 40,
//     price: 380,
//     originalPrice: 500,
//     description:
//       "Master Product Management basics with this beginner-friendly course.",
//     dateRange: "1-20 July",
//   },
//   {
//     id: 2,
//     title: "IBM Data Science Professional Certificate",
//     image: "https://tse1.mm.bing.net/th?id=OIP.72XNGfGgLcoukXFzxhl9-QHaEK&pid=Api&P=0&h=180",
//     students: 11,
//     price: 678,
//     originalPrice: 1500,
//     description:
//       "Learn data science skills from IBM with hands-on case studies.",
//     dateRange: "5-25 August",
//   },
//   {
//     id: 3,
//     title: "The Science of Well-Being",
//     image: "https://tse4.mm.bing.net/th?id=OIP.uO_Bh9tvWjr1yzqR9HhICQHaE-&pid=Api&P=0&h=180",
//     students: 234,
//     price: 123,
//     originalPrice: 500,
//     description:
//       "Learn the science behind well-being and happiness with practical tips.",
//     dateRange: "10-30 September",
//   },
//   {
//     id: 4,
//     title: "Python for Everybody Specialization",
//     image: "https://tse1.mm.bing.net/th?id=OIP.72XNGfGgLcoukXFzxhl9-QHaEK&pid=Api&P=0&h=180",
//     students: 342,
//     price: 567,
//     originalPrice: 800,
//     description: "Master Python programming with this beginner-friendly course.",
//     dateRange: "15 October - 5 November",
//   },
// ];

// const Courses: React.FC = () => {
//   return (
//     <>  <Navbar/>
//     <div className="min-h-screen bg-gray-100 py-10 px-6">
       
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-purple-800">Explore all Courses</h1>
//         {/* Curved Line */}
//         <div className="flex justify-self-center mt-2">
//           <svg
//             width="130"
//             height="20"
//             viewBox="0 0 120 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M0 10 Q60 30 120 10"
//               stroke="#7c3aed" /* Purple color */
//               strokeWidth="3"
//               fill="none"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Filter Bar */}
//       <div className="flex justify-center space-x-4 mb-8">
//         {["All Programmes", "UI/UX Design", "Program Design"].map((filter) => (
//           <button
//             key={filter}
//             className="px-4 py-2 border rounded-full text-sm font-medium text-gray-700 hover:bg-purple-100 focus:bg-purple-200 focus:ring-2 focus:ring-purple-600"
//           >
//             {filter}
//           </button>
//         ))}
//       </div>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {courses.map((course) => (
//           <Card
//             key={course.id}
//             title={course.title}
//             image={course.image}
//             students={course.students}
//             price={course.price}
//             originalPrice={course.originalPrice}
//             description={course.description}
//             dateRange={course.dateRange}
//             buttonLabel="Enroll Now"
//           />
//         ))}
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Courses;

"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import Navbar from "../Navbar/page";
import Footer from "../Footer/page";

interface Course {
  id: number;
  title: string;
  image: string;
  students: number;
  price: number;
  originalPrice: number;
  description: string;
  dateRange: string;
  courseId: number;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        if (data.success) {
          const formattedCourses = data.data.map((course: any) => ({
            id: course.courseId,
            title: course.name,
            image: course.image,
            students: course.studentsEnrolled,
            price: course.price.current,
            originalPrice: course.price.original,
            description: course.shortDescription,
            dateRange: course.duration,
            courseId: course.courseId,
          }));
          setCourses(formattedCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800">Explore all Courses</h1>
          {/* Curved Line */}
          <div className="flex justify-self-center mt-2">
            <svg
              width="130"
              height="20"
              viewBox="0 0 120 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10 Q60 30 120 10"
                stroke="#7c3aed" /* Purple color */
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center space-x-4 mb-8">
          {["All Programmes", "UI/UX Design", "Program Design"].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 border rounded-full text-sm font-medium text-gray-700 hover:bg-purple-100 focus:bg-purple-200 focus:ring-2 focus:ring-purple-600"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        {loading ? (
          <div className="text-center text-lg">Loading courses...</div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                title={course.title}
                image={course.image}
                students={course.students}
                price={course.price}
                originalPrice={course.originalPrice}
                description={course.description}
                // dateRange={course.dateRange}
                buttonLabel="Enroll Now"
                courseId={course.courseId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-lg">No courses available.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Courses;
