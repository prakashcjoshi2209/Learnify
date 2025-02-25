"use client"

import React from 'react'
import Notification from "../Notification/Notification";
import Sidebar from "../DashBoard/Sidebar";
import ProfileSection from "../DashBoard/ProfileSection"; 
import { useSession } from "next-auth/react";

const ShowNotify = () => {
    const { data: session } = useSession(); 
    return (
      <div className="flex flex-col  bg-gray-50">
        {/* Main Layout */}
        <div className="flex-grow flex">
          {/* Sidebar (Left) */}
          <div className="w-72 bg-white text-gray-800 border-r border-gray-200 flex flex-col justify-between">
          <Sidebar />
        </div>
  
          {/* Notification Content (Center) */}
          <div className="flex-1 ">
            <Notification />
          </div>
  
          <div className="w-72 bg-white border-l border-gray-200 ">
          <ProfileSection session={session} />
        </div>
        </div>
  
        
      </div>
    );
  };
  
  export default ShowNotify;