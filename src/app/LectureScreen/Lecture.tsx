"use client";

import React, { useState } from "react";

// JSON Data
const lectureData = {
  video: {
    src: "/intro.mp4",
    title: "Lecture 2",
    rating: 4.0,
    students: 4320,
    duration: "24+ Hours Total",
    reviews: 600,
  },
  tabs: [
    { id: "Overview", content: "This lecture covers the fundamentals of the topic." },
    { id: "Q&A", content: "Here are the questions and answers." },
    { id: "Notes", content: "These are the lecture notes." },
    { id: "Announcements", content: "Latest announcements will appear here." },
    { id: "Reviews", content: "Check out the course reviews." },
  ],
};

const LectureScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex flex-col gap-6 font-sans px-4 lg:px-10 py-6">
      {/* Video Section */}
      <div className="relative text-center">
        <video
          className="w-full max-w-5xl mx-auto rounded-xl shadow-lg"
          controls
          src={lectureData.video.src}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Details Section */}
      <div className="bg-white shadow-md rounded-lg p-5">
        {/* Tabs Navigation */}
        <nav className="flex gap-4 border-b border-gray-300 pb-3 overflow-x-auto">
          {lectureData.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 text-sm sm:text-base font-medium transition-all rounded-t-md ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {tab.id}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="mt-5 text-gray-700">
          {lectureData.tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <div key={tab.id}>
                  <h2 className="text-lg font-semibold">{tab.id}</h2>
                  <p>{tab.content}</p>
                </div>
              )
          )}
        </div>

        {/* Lecture Info */}
        {activeTab === "Overview" && (
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="font-semibold text-yellow-500">⭐ {lectureData.video.rating}</span>
            <span>{lectureData.video.students} Students</span>
            <span>{lectureData.video.duration}</span>
            <span>{lectureData.video.reviews} Ratings</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureScreen;
