"use client";

import React from "react";
import Link from "next/link";
import { BsGear, BsInbox, BsBook, BsCheckSquare, BsBoxArrowRight } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { signOut } from "next-auth/react";

// Logout handler
const handleLogout = async () => {
  await signOut({ redirect: true, callbackUrl: "/login" });
};

const sidebarConfig = {
  logo: "LEARNIFY",
  mainSections: [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", icon: <BsInbox className="text-lg" />, href: "/DashBoard" },
        { label: "Rewards", icon: <BsInbox className="text-lg" />, href: "/Rewards" },
        { label: "Assignments", icon: <BsBook className="text-lg" />, href: "/Assignments" },
        { label: "Notifications", icon: <BsCheckSquare className="text-lg" />, href: "/notification" },
        { label: "Group", icon: <FaUserFriends className="text-lg" />, href: "/group" },
      ],
    },
  ],
  accountSection: [
    { label: "Settings", icon: <BsGear className="text-gray-500" />, href: "/settings" },
  ],
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white text-gray-800 border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Top Section */}
      <div className="p-6">
        {/* Logo */}
        <Link href="/">
          <div className="text-xl font-bold text-purple-600 mb-10 text-center cursor-pointer">
            {sidebarConfig.logo}
          </div>
        </Link>

        {/* Main Sections */}
        {sidebarConfig.mainSections.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-gray-400 text-sm uppercase mb-4">{section.title}</h3>
            <ul className="space-y-6">
              {section.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-center space-x-3 hover:text-purple-600 cursor-pointer"
                >
                  {item.icon}
                  <Link href={item.href}>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-6 mt-auto">
        <ul className="space-y-4">
          {/* Settings Link */}
          {sidebarConfig.accountSection.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="flex items-center space-x-3 hover:text-purple-600 cursor-pointer"
            >
              {item.icon}
              <Link href={item.href}>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}

          {/* Logout Button */}
          <li
            className="flex items-center space-x-3 hover:text-purple-600 cursor-pointer"
            onClick={handleLogout} // Attach the handleLogout function here
          >
            <BsBoxArrowRight className="text-gray-500" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;