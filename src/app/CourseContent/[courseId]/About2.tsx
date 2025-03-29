"use client";
import React from "react";
import AboutCourse from "./AboutCourse";
import { FaCertificate, FaCoins, FaInfinity, FaLevelUpAlt, FaClosedCaptioning } from "react-icons/fa";
import { ICourse } from "@/app/models/Course";

interface CoursePageProps {
  course: ICourse;
}

const CoursePage: React.FC<CoursePageProps> = ({ course }) => {

  const levelDescription = {
    Beginner: "No prior experience required",
    Intermediate: "Some experience recommended",
    Advanced: "Strong understanding required",
  }[course.level] || "Level information not available";

  // Determine Subtitle Language
  const subtitlesLang = {
    English: "English",
    Hindi: "Hindi",
    Both: "English & Hindi",
  }[course.subtitles?.[0]?.language] || "No subtitles available";

  
  const courseData = {
    courseId: course.courseId,
    title: course.courseHeading,
    subtitle: "About Course",
    description: course.largeDescription?.intro,
    details: course.largeDescription?.subPoints || [],
    features: [
      course.certificate?.toLowerCase() === "yes" && {
        icon: <FaCertificate className="text-purple-600 text-xl" />,
        label: "Authentic Certificate",
        description: "Earn a Certificate of Completion",
      },
      {
        icon: <FaCoins className="text-purple-600 text-xl" />,
        label: "Rewards",
        description: "Unlock rewards as you progress",
      },
      course.lifeTimeAccess?.toLowerCase() === "yes" && {
        icon: <FaInfinity className="text-purple-600 text-xl" />,
        label: "Lifetime Access",
        description: "Set and manage your pace",
      },
      {
        icon: <FaLevelUpAlt className="text-purple-600 text-xl" />,
        label: course.level,
        description: levelDescription,
      },
      course.subtitles?.[0]?.language.length>1 && {
        icon: <FaClosedCaptioning className="text-white-600 text-xl bg-purple-600" />,
        label: "Subtitles",
        description: subtitlesLang,
      },
    ],
  };

  return <AboutCourse {...courseData} />;
};

export default CoursePage;
