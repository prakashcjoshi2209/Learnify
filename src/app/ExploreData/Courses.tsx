"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import Footer from "../Footer/page";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";

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
  category: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("All Programmes");
  const [categories, setCategories ]= useState<any>([]);

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
            category: course.category, // Assuming category exists in API response
          }));
          setCourses(formattedCourses);
          const allCategories = data.data.map((course:any )=> course.category);
          console.log(allCategories);
          const uniqueCategories = Array.from(new Set(allCategories)).filter(Boolean);          
          setCategories(["All Programmes", ...uniqueCategories]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on the selected category
  const filteredCourses =
    activeCategory === "All Programmes"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800">Explore all Courses</h1>
          {/* Curved Line */}
          <div className="flex justify-self-center mt-2">
            <svg width="130" height="25" viewBox="0 0 120 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10 Q60 30 120 10" stroke="#7c3aed" strokeWidth="3" fill="none" />
            </svg>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 border rounded-full text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-purple-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        {loading ? (
          <div className="text-center text-lg">Loading courses...</div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                title={course.title}
                image={course.image}
                students={course.students}
                price={course.price}
                originalPrice={course.originalPrice}
                description={course.description}
                buttonLabel="Enroll Now"
                courseId={course.courseId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-lg">No courses available for this category.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Courses;
