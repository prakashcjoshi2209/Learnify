"use client";

import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineBell, AiOutlineMail, AiOutlineSetting } from "react-icons/ai";

// Define types for progress data
type ProgressData = { day: string; progress: number };

const ProfileSection: React.FC = () => {
  // Static progress data
  const progressData: ProgressData[] = [
    { day: "Mon", progress: 100 },
    { day: "Tue", progress: 120 },
    { day: "Wed", progress: 80 },
    { day: "Thu", progress: 90 },
    { day: "Fri", progress: 110 },
    { day: "Sat", progress: 60 },
    { day: "Sun", progress: 90 },
  ];

  // State for profile image
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-80 space-y-6">
      {/* Profile and Greeting */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full border-4 border-purple-500 overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-full h-full text-purple-600" />
          )}
          {/* Image Upload Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mt-3">
          Good Morning, Prashant
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Continue Your Journey And Achieve Your Target
        </p>
      </div>

      {/* Icon Buttons */}
      <div className="flex justify-around">
        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
          <AiOutlineBell className="text-xl text-gray-600" />
        </button>
        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
          <AiOutlineMail className="text-xl text-gray-600" />
        </button>
        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
          <AiOutlineSetting className="text-xl text-gray-600" />
        </button>
      </div>

      {/* Daily Progress Graph */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-800">Daily Progress</h3>
        <div className="flex items-end space-x-2">
          {progressData.map(({ day, progress }) => (
            <div key={day} className="flex flex-col items-center">
              <div
                className="bg-purple-600 w-4 rounded-md"
                style={{ height: `${progress}px` }}
              ></div>
              <span className="text-sm text-gray-500 mt-2">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
