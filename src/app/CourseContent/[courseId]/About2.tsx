import React from "react";
import AboutCourse from "./AboutCourse";
import { FaCertificate, FaCoins, FaInfinity, FaLevelUpAlt, FaClosedCaptioning } from "react-icons/fa";
import { ICourse } from "@/app/models/Course";

interface CoursePageProps{
  course: ICourse;
}

const CoursePage : React.FC<CoursePageProps> = ({ course }) => {
  const courseData = {
    title: "Covers pretty much everything you need to know about UX",
    subtitle: "About Course",
    description: course.largeDescription.intro,
    details: course.largeDescription.subPoints,
    features: [
      {
        icon: <FaCertificate className="text-purple-600 text-xl" />,
        label: "Authentic Certificate",
        description: "Earn a Certificate of Completion",
      },
      {
        icon: <FaCoins className="text-purple-600 text-xl" />,
        label: "Rewards",
        description: "Unlock rewards as you progress",
      },
      {
        icon: <FaInfinity className="text-purple-600 text-xl" />,
        label: "Lifetime Access",
        description: "Set and manage your pace",
      },
      {
        icon: <FaLevelUpAlt className="text-purple-600 text-xl" />,
        label: "Beginner Level",
        description: "No prior experience required",
      },
      {
        icon: <FaClosedCaptioning className="text-white-600 text-xl bg-purple-600" />,
        label: "Subtitles",
        description: "English & Hindi",
      },
    ],
  };

  return <AboutCourse {...courseData} />;
};

export default CoursePage;


