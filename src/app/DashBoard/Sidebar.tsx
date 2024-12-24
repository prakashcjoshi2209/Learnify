

// "use client";

// import React from "react";
// import Link from "next/link";
// import { BsGear, BsInbox, BsBook, BsCheckSquare, BsBoxArrowRight } from "react-icons/bs";
// import { FaUserFriends } from "react-icons/fa";

// // Define the sidebar items in JSON format
// const sidebarConfig = {
//   logo: "LEARNIFY",
//   mainSections: [
//     {
//       title: "Overview",
//       items: [
//         { label: "Dashboard", icon: <BsInbox className="text-lg" />, href: "/DashBoard" },
//         { label: "Rewards", icon: <BsInbox className="text-lg" />, href: "/Rewards" },
//         { label: "Assignments", icon: <BsBook className="text-lg" />, href: "/Assignments" },
//         { label: "Notifications", icon: <BsCheckSquare className="text-lg" />, href: "/notification" },
//         { label: "Group", icon: <FaUserFriends className="text-lg" />, href: "/group" },
//       ],
//     },
//   ],
//   accountSection: [
//     { label: "Settings", icon: <BsGear className="text-gray-500" />, href: "/settings" },
//     { label: "Logout" , icon: <BsBoxArrowRight className="text-gray-500" />, href: "/logout" },
//   ],
// };

// const Sidebar: React.FC = () => {
//   return (
//     <div className="w-64 h-screen bg-white text-gray-800 border-r border-gray-200 flex flex-col">
//       {/* Top Section */}
//       <div className="flex-1 p-6">
//         {/* Logo */}
//         <div className="text-xl font-bold text-purple-600 mb-10 text-center">
//           {sidebarConfig.logo}
//         </div>

//         {/* Main Sections */}
//         {sidebarConfig.mainSections.map((section, index) => (
//           <div key={index} className="mb-6">
//             <h3 className="text-gray-400 text-sm uppercase mb-4">{section.title}</h3>
//             <ul className="space-y-6">
//               {section.items.map((item, itemIndex) => (
//                 <li
//                   key={itemIndex}
//                   className="flex items-center space-x-3 hover:text-purple-600 cursor-pointer"
//                 >
//                   {item.icon}
//                   <Link href={item.href}>
//                     <span>{item.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Section */}
//       <div className="p-6 border-t border-gray-200">
//         <ul className="space-y-4">
//           {sidebarConfig.accountSection.map((item, itemIndex) => (
//             <li
//               key={itemIndex}
//               className="flex items-center space-x-3 hover:text-purple-600 cursor-pointer"
//             >
//               {item.icon}
//               <Link href={item.href}>
//                 <span>{item.label}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

"use client";

import React from "react";
import Link from "next/link";
import { BsGear, BsInbox, BsBook, BsCheckSquare, BsBoxArrowRight } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

// Define the sidebar items in JSON format
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
    { label: "Logout", icon: <BsBoxArrowRight className="text-gray-500" />, href: "/logout" },
  ],
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white text-gray-800 border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Top Section */}
      <div className="p-6">
        {/* Logo with Redirect */}
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
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;