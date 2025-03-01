
// "use client";

// import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import ImageCard from "./ImageCard";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import NoCoursesAvailable from "./NoCoursesAvailable";
// import Loader from "@/components/ui/Loader";
// import { ICourse } from "../models/Course";
// import { useRouter } from "next/navigation";
// import OffersSection from "./OffersSection";

// const DashboardContent = () => {
//   const [courses, setCourses] = useState<ICourse[]>([]);
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
//   const [isEmpty, setIsEmpty] = useState<boolean>(false);
//   const [fetchingUserCourses, setFetchingUserCourses] = useState<boolean>(false);
//   const router = useRouter(); 
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     setFetchingUserCourses(true);
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch("/api/userCourses");
//         if (response.ok) {
//           const data = await response.json();
//           if (data.length > 0) {
//             setCourses(data);
//           } else {
//             setIsEmpty(true);
//           }
//         } else {
//           console.error("Failed to fetch courses");
//         }
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       } finally {
//         setFetchingUserCourses(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Sidebar */}
//       <div className={`w-64 bg-white text-gray-800 border-r border-gray-200 ${sidebarOpen ? "block" : "hidden"} md:block`}>
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-4 md:pl-8">
//         {/* Top Bar */}
//         <div className="flex justify-between items-center mb-6">
//           <input
//             type="text"
//             placeholder="Search your Course here..."
//             className="w-full md:max-w-md p-3 rounded-lg border border-gray-300 focus:outline-none"
//           />
//           <button className="ml-4 p-3 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200">
//             Settings
//           </button>

//           {/* Mobile Hamburger Menu */}
//           <button className="md:hidden p-3 text-gray-500" onClick={() => setSidebarOpen(!sidebarOpen)}>
//             {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Header Section */}
//         <div className="bg-purple-600 text-white p-4 rounded-lg mb-6">
//           <h2 className="text-xl font-bold mb-4">
//             Elevate Your Skills with Expert-Led Courses!
//           </h2>
//           <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center space-x-2" onClick={() => {
//             setLoading(true);
//             router.push("ExploreData");
//           }}>
//             {loading ? "Loading..." : "More Courses"}
//           </button>
//         </div>

//         {/* Offers Courses Section */}
//         <OffersSection />

//         {/* Enrolled Courses Section */}
//         <h3 className="text-xl font-semibold mt-6  mb-6">Enrolled Courses</h3>
//         {isEmpty ? (
//           <NoCoursesAvailable />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {fetchingUserCourses ? (
//               <Loader />
//             ) : (
//               courses.map((course) => (
                
//                 <div key={course.courseId} className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
//                                     {/* Course Card */}
//                         <ImageCard course={course}  />

//                                    {/* Progress Bar (Always at Bottom) */}
//                           <div className="mt-auto">
//                           <p className="text-sm font-semibold text-gray-600">
//                            Completion: {course.progress || 0}%
//                           </p>
//                           <div className="w-full bg-gray-200 rounded-full h-2.5">
//                           <div
//                            className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
//                           style={{ width: `${course.progress || 0}%` }}
//                           ></div>
//                </div>
//              </div>
//            </div>

//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardContent;


"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ImageCard from "./ImageCard";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NoCoursesAvailable from "./NoCoursesAvailable";
import Loader from "@/components/ui/Loader";
import { ICourse } from "../models/Course";
import { useRouter } from "next/navigation";
import OffersSection from "./OffersSection";

const DashboardContent = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [fetchingUserCourses, setFetchingUserCourses] = useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFetchingUserCourses(true);
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/userCourses");
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setCourses(data);
          } else {
            setIsEmpty(true);
          }
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setFetchingUserCourses(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar for Larger Screens */}
      <div className={`hidden md:block w-64 bg-white text-gray-800 border-r border-gray-200`}>
        <Sidebar />
      </div>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="w-64 h-full bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out">
          <button className="absolute top-4 right-4 text-gray-600" onClick={() => setSidebarOpen(false)}>
            <XMarkIcon className="h-6 w-6" />
          </button>
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:pl-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="Search your Course here..."
            className="w-full sm:w-auto flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none"
          />
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200">
              Settings
            </button>
            {/* Mobile Hamburger Menu */}
            <button className="md:hidden p-3 text-gray-500" onClick={() => setSidebarOpen(true)}>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-purple-600 text-white p-4 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Elevate Your Skills with Expert-Led Courses!</h2>
          <button
            className="bg-black text-white px-6 py-2 rounded-lg flex items-center space-x-2"
            onClick={() => {
              setLoading(true);
              router.push("ExploreData");
            }}
          >
            {loading ? "Loading..." : "More Courses"}
          </button>
        </div>

        {/* Offers Courses Section */}
        <OffersSection />

        {/* Enrolled Courses Section */}
        <h3 className="text-xl font-semibold mt-6 mb-6">Enrolled Courses</h3>
        {isEmpty ? (
          <NoCoursesAvailable />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fetchingUserCourses ? (
              <Loader />
            ) : (
              courses.map((course) => (
                <div key={course.courseId} className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
                  {/* Course Card */}
                  <ImageCard course={course} />

                  {/* Progress Bar (Always at Bottom) */}
                  <div className="mt-auto">
                    <p className="text-sm font-semibold text-gray-600">
                      Completion: {course.progress || 0}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
