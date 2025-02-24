"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineBell, AiOutlineMail, AiOutlineSetting } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";

const ProfileSection: React.FC<{ session: Session | null }> = ({ session }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("Good Morning");

  useEffect(() => {
    setProfileImage(session?.user?.image || null);

    const getISTHour = () => {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
      const istTime = new Date(now.getTime() + istOffset);
      return istTime.getUTCHours();
    };

    const hour = getISTHour();
    if (hour >= 5 && hour < 12) {
      setCurrentTime("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setCurrentTime("Good Afternoon");
    } else {
      setCurrentTime("Good Evening");
    }
  }, [session]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch("/api/updateProfileImg", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else {
        await signOut();
        setProfileImage(data.imageUrl);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-74 h-screen bg-white text-gray-800 border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mt-3 rounded-full border-4 border-purple-500 overflow-hidden">
          {loading ? (
            <div className="loader">Loading...</div>
          ) : profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-full h-full text-purple-600" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mt-3">
          {currentTime}, {session.user?.name || "User"}
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Continue Your Journey And Achieve Your Target
        </p>
      </div>
      
      {/* Buttons Section */}
      <div className="flex justify-around">
        {/* Notification Button with Navigation */}
        <button
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={() => router.push("/Notification")} // Navigates to Notification page
        >
          <AiOutlineBell className="text-xl text-gray-600" />
        </button>

        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
          <AiOutlineMail className="text-xl text-gray-600" />
        </button>

        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
          <AiOutlineSetting className="text-xl text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
