"use client";

import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CardProps {
  title: string;
  image: string;
  students: number;
  price: number;
  originalPrice: number;
  description: string;
  buttonLabel: string;
  dateRange?: string;
  courseId: number;
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  students,
  price,
  originalPrice,
  description,
  buttonLabel,
  dateRange,
  courseId,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    router.push(`/CourseContent/${courseId}`);
  };

  const formatStudents = (num:number) => {
    const roundedNum = Math.round(num / 100) * 100;
    if (roundedNum >= 1_000_000) {
      return (roundedNum / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (roundedNum >= 1_000) {
      return (roundedNum / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return roundedNum;
  };

  return (
    <div className="w-full max-w-[360px] bg-white rounded-lg shadow-lg border hover:shadow-xl transform hover:scale-105 transition-transform duration-300 flex flex-col">
      {/* Image Section */}
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        {/* Students Badge */}
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 text-sm font-medium text-gray-800 rounded-full shadow-md flex items-center">
          <FaUsers className="text-purple-600 mr-2" />+{formatStudents(students)} students
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Date Range */}
        <div className="text-sm font-medium text-gray-500 mb-2">
          {dateRange}
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold mb-4 text-left"
          style={{ color: "#907CFF", fontFamily: "'Railway , cursive" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className=" text-left mb-4"
          style={{ color: "#4D4D4D", fontFamily: "'Railway , cursive'" }}
        >
          {description}
        </p>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-auto">
          {/* Price */}
          <div>
            <span
              className="text-lg font-bold "
              style={{ color: "#4D4D4D", fontFamily: "'Inter , cursive" }}
            >
              ₹{price}
            </span>{" "}
            <span className="text-sm line-through text-gray-400">
              ₹{originalPrice}
            </span>
          </div>

          {/* Enroll Button */}
          <button
            className="px-5 py-2 text-white text-sm font-medium rounded-md hover:bg-purple-700 shadow"
            style={{ backgroundColor: "#907CFF" }}
            onClick={handleClick}
          >
            {loading ? "Loading..." : buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
