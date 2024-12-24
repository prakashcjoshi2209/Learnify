import React from "react";
import AboutCourse from "./AboutCourse";
import { FaCertificate, FaCoins, FaInfinity, FaLevelUpAlt, FaClosedCaptioning } from "react-icons/fa";

const CoursePage = () => {
  const courseData = {
    title: "Covers pretty much everything you need to know about UX",
    subtitle: "About Course",
    description:
      "This course will teach you everything you need to know about UX, including design, content, and coding. You'll learn from the ground up, so it doesn't matter how much experience you have when you start.",
    details: [
      "Apply UX strategies to a site's content & design",
      "Understand Information Architecture to enhance the content on your website",
      "Know what dictates how your website should look",
      "Design and code a B2B website, a B2C blog, and an eCommerce site",
    ],
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


