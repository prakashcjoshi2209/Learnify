"use client";
import React, { useState } from "react";
import courseData from "./course.json";
import Link from "next/link";

const CourseContentData: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  // Toggle the section (expand or collapse)
  const toggleSection = (index: number) => {
    setExpandedSections(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Collapse
          : [...prev, index] // Expand
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex items-center mb-6">
        <hr className="border-2 border-t-4 w-20 border-purple-600 " />
        <h2 className="text-2xl font-bold text-purple-700 ms-5 mb-3">
          {courseData.title}
        </h2>
      </div>
      <h1 className="text-3xl font-semibold mb-4">{courseData.description}</h1>
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Link href="#">{courseData.summary.lessons} Lessons</Link>
        <Link href="#">• {courseData.summary.videos} Videos</Link>
        <Link href="#">• {courseData.summary.articles} Articles</Link>
        <Link href="#">• {courseData.summary.assignments} Assignments</Link>
        <Link href="#">
          • {courseData.summary.completionTime} Completion Time
        </Link>
      </div>
      <div className="space-y-4">
        {courseData.sections.map((section, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(index)}
            >
              <h3 className="font-semibold flex items-center space-x-2">
                <span>{expandedSections.includes(index) ? "–" : "+"}</span>
                <span>{section.title}</span>
              </h3>
              <span className="text-gray-500">
                {section.sections} Sections, {section.duration}
              </span>
            </div>
            {expandedSections.includes(index) && (
              <div className="mt-4 space-y-2">
                {section.lessons.length > 0 ? (
                  section.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex justify-between items-center border-t pt-2"
                    >
                      <p className="flex items-center space-x-2">
                        <span className="text-blue-500">•</span>
                        <span>{lesson.title}</span>
                      </p>
                      <div className="flex items-center space-x-2">
                        {lesson.link && (
                          <a href="#" className="text-blue-500 underline">
                            {lesson.link}
                          </a>
                        )}
                        <span className="text-gray-500">{lesson.duration}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No lessons available.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContentData;
