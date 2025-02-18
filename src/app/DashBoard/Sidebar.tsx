"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BsGear,
  BsInbox,
  BsBook,
  BsCheckSquare,
  BsBoxArrowRight,
} from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { signOut } from "next-auth/react";

const handleLogout = async () => {
  await signOut({ redirect: true, callbackUrl: "/login" });
};

const sidebarConfig = {
  logo: "LEARNIFY",
  mainSections: [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          icon: <BsInbox className="text-lg" />,
          href: "/DashBoard",
        },
        {
          label: "Rewards",
          icon: <BsInbox className="text-lg" />,
          href: "/Rewards",
        },
        {
          label: "Assignments",
          icon: <BsBook className="text-lg" />,
          href: "/Assignments",
        },
        {
          label: "Notifications",
          icon: <BsCheckSquare className="text-lg" />,
          href: "/notification",
        },
        {
          label: "Group",
          icon: <FaUserFriends className="text-lg" />,
          href: "/group",
        },
      ],
    },
  ],
  accountSection: [
    {
      label: "Settings",
      icon: <BsGear className="text-lg" />,
      href: "/settings",
    },
  ],
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-white text-gray-800 border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-6">
        <Link href="/">
          <div
            className="text-xl font-bold text-purple-600 mb-10 text-center cursor-pointer"
            style={{ fontFamily: "'Irish Grover', cursive" }}
          >
            {sidebarConfig.logo}
          </div>
        </Link>

        {sidebarConfig.mainSections.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-gray-400 text-sm uppercase mb-4">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => {
                const isActive = pathname === item.href;
                return (
                  <li key={itemIndex}>
                    <Link href={item.href}>
                      <div
                        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition 
                        ${
                          isActive
                            ? "text-purple-600 font-semibold border-2 border-purple-600"
                            : "hover:bg-purple-100 text-gray-800"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-64 bg-white border-t border-gray-200 p-6">
        <ul className="space-y-2">
          {sidebarConfig.accountSection.map((item, itemIndex) => {
            const isActive = pathname === item.href;
            return (
              <li key={itemIndex}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition 
                    ${
                      isActive
                        ? "border-2 border-purple-600 bg-purple-600 text-white font-semibold"
                        : "hover:bg-purple-100 text-gray-800"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </Link>
              </li>
            );
          })}

          <li
            className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition hover:bg-purple-100 text-gray-800"
            onClick={handleLogout}
          >
            <BsBoxArrowRight className="text-lg" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
