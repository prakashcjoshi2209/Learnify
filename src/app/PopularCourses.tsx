import React from "react";
import Card from "./ExploreData/Card";


interface Course {
  id: number;
  title: string;
  image: string;
  students: number;
  price: number;
  originalPrice: number;
  description: string;
  dateRange: string;
}

// Data source (imported from `Courses` file or directly used here)
const courses: Course[] = [
  {
    id: 1,
    title: "Product Management Basics",
    image: "https://tse4.mm.bing.net/th?id=OIP.uO_Bh9tvWjr1yzqR9HhICQHaE-&pid=Api&P=0&h=180",
    students: 40,
    price: 380,
    originalPrice: 500,
    description: "Master Product Management basics with this beginner-friendly course.",
    dateRange: "1-20 July",
  },
  {
    id: 2,
    title: "IBM Data Science Professional Certificate",
    image: "https://tse1.mm.bing.net/th?id=OIP.72XNGfGgLcoukXFzxhl9-QHaEK&pid=Api&P=0&h=180",
    students: 11,
    price: 678,
    originalPrice: 1500,
    description: "Learn data science skills from IBM with hands-on case studies.",
    dateRange: "5-25 August",
  },
  {
    id: 3,
    title: "The Science of Well-Being",
    image: "https://tse4.mm.bing.net/th?id=OIP.uO_Bh9tvWjr1yzqR9HhICQHaE-&pid=Api&P=0&h=180",
    students: 234,
    price: 123,
    originalPrice: 500,
    description: "Learn the science behind well-being and happiness with practical tips.",
    dateRange: "10-30 September",
  },
  {
    id: 4,
    title: "Python for Everybody Specialization",
    image: "https://tse1.mm.bing.net/th?id=OIP.72XNGfGgLcoukXFzxhl9-QHaEK&pid=Api&P=0&h=180",
    students: 342,
    price: 567,
    originalPrice: 800,
    description: "Master Python programming with this beginner-friendly course.",
    dateRange: "15 October - 5 November",
  },
];

const PopularCourses: React.FC = () => {
  // Get the top 4 courses based on the number of students
  const topCourses = [...courses]
    .sort((a, b) => b.students - a.students) // Sort by students in descending order
    .slice(0, 4); // Get the top 4 courses

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800">Popular Courses</h1>
        {/* Curved Line */}
        <div className="flex justify-center mt-2">
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

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topCourses.map((course) => (
          <Card
            key={course.id}
            title={course.title}
            image={course.image}
            students={course.students}
            price={course.price}
            originalPrice={course.originalPrice}
            description={course.description}
            dateRange={course.dateRange}
            buttonLabel="Enroll Now"
          />
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
