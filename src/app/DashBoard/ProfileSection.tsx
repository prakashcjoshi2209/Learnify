"use client";

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineBell, AiOutlineMail, AiOutlineSetting } from "react-icons/ai";
import { useSession, signIn,signOut, getSession } from "next-auth/react";

const ProfileSection: React.FC<{ session: any | null }> = ({session}) => {
  // const { data: session , update} = useSession();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState(null);
  // console.log(session);
  useEffect(() => {
    setProfileImage(session?.user?.image || null);
  }, [session]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      }
      else{
        console.log("Executing what you wanted!!");
        // await update({
        //   ...session,
        //   user: {
        //     ...session?.user,
        //     image: data.imageUrl, // Update the user image in the session
        //   },
        // });
        // refreshSession();
        // session.user.image = data.imageUrl;
        // window.location.reload();
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
    <div className="w-74 h-screen  bg-white text-gray-800 border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mt-3 rounded-full border-4 border-purple-500 overflow-hidden">
          {loading ? (
            <div className="loader">Loading...</div>
          ) : profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
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
          Good Morning, {session.user?.name || "User"}  
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Continue Your Journey And Achieve Your Target
        </p>
      </div>
      <div className="flex justify-around ">
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
    </div>
  );
};

export default ProfileSection;