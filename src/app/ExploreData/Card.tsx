

import React from "react";
import { FaUser, FaUsers } from "react-icons/fa";

interface CardProps {
  title: string;
  image: string;
  students: number;
  price: number;
  originalPrice: number;
  description: string;
  buttonLabel: string;
  dateRange: string;
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
}) => {
  return (
    <div className="w-full max-w-[320px] bg-white rounded-lg shadow-lg border hover:shadow-xl transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        {/* Icons and Students Badge */}
        <div className="absolute top-[90%] left-1/2 transform -translate-x-1/2 flex items-center px-4 py-2 rounded-full shadow-md bg-gray-400">
          <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full shadow-md">
            <FaUser size={16} />
          </div>
          <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full shadow-md">
            <FaUsers size={16} />
          </div>
          <div className="text-black text-xs">+{students} students</div>
        </div>
      </div>

      {/* Date Range */}
      <div className="text-sm font-medium text-gray-500 text-left ml-4 mt-4">
        {dateRange}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mt-2">
          {description}
        </p>

        {/* Price and Button */}
        <div className="mt-auto flex justify-between items-center">
          {/* Price */}
          <div>
            <span className="text-lg font-bold text-red-600">₹{price}</span>{" "}
            <span className="text-sm line-through text-gray-400">
              ₹{originalPrice}
            </span>
          </div>

          {/* Enroll Button */}
          <button className="px-4 py-1 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 shadow">
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
