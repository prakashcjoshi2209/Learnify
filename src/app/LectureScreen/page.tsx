"use client";

import React, { useState } from "react";

const LectureScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Video Section */}
      <div className="relative text-center">
        <video 
          className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
          controls
          src="/intro.mp4"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Details Section */}
      <div className="px-5">
        {/* Tabs Navigation */}
        <nav className="flex gap-5 border-b border-gray-300 pb-3">
          {["Overview", "Q&A", "Notes", "Announcements", "Reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-base font-medium transition ${
                activeTab === tab
                  ? "border-b-2 border-black font-semibold text-black"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="mt-5 text-gray-700">
          {activeTab === "Overview" && (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Additional Tags: Lecture 2</h2>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="font-semibold text-yellow-500">⭐ 4.0</span>
                <span>4320 Students</span>
                <span>24+ Hours Total</span>
                <span>600 Ratings</span>
              </div>
            </div>
          )}
          {activeTab === "Q&A" && (
            <div>
              <h2 className="text-lg font-semibold">Q&A Content</h2>
              <p>Here are the questions and answers.</p>
            </div>
          )}
          {activeTab === "Notes" && (
            <div>
              <h2 className="text-lg font-semibold">Notes Content</h2>
              <p>These are the lecture notes.</p>
            </div>
          )}
          {activeTab === "Announcements" && (
            <div>
              <h2 className="text-lg font-semibold">Announcements Content</h2>
              <p>Latest announcements will appear here.</p>
            </div>
          )}
          {activeTab === "Reviews" && (
            <div>
              <h2 className="text-lg font-semibold">Reviews Content</h2>
              <p>Check out the course reviews.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LectureScreen;
