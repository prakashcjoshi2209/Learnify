
"use client";

import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline"; 

// Define Notification type
type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
};

const NotificationsPage = () => {
  // Sample notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Course Available!",
      message: "A new React course has been added to the library.",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Assignment Due",
      message: "Your JavaScript assignment is due tomorrow.",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "Reminder: Live Session",
      message: "Join the live session on Machine Learning at 6 PM today.",
      time: "1 day ago",
    },
  ]);

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 py-10 px-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-purple-600 mb-6 flex items-center">
          <BellIcon className="h-8 w-8 text-purple-600 mr-2" /> Notifications
        </h2>

        {notifications.length === 0 ? (
          <p className="text-lg text-gray-500 text-center py-10">
            No notifications.
          </p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="p-4 bg-gray-100 border-l-4 border-blue-500 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {notification.title}
                </h3>
                <p className="text-gray-600">{notification.message}</p>
                <span className="text-sm text-gray-400">{notification.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
