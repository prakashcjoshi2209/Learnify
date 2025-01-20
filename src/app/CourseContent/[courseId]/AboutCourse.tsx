

import React from "react";
import {
  FaCertificate,
  FaCoins,
  FaInfinity,
  FaLevelUpAlt,
  FaClosedCaptioning,
  FaDownload,
} from "react-icons/fa";

// Define types for props
type Feature = {
  icon: JSX.Element;
  label: string;
  description: string;
};

type CourseDetailsProps = {
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  features: Feature[];
};

const AboutCourse: React.FC<CourseDetailsProps> = ({
  title,
  subtitle,
  description,
  details,
  features,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 p-8 rounded-lg shadow-lg">
      {/* Left Section */}
      <div className="lg:w-2/3">
        <div className="flex items-center mb-4">
          <div className="w-12 h-1 bg-purple-600 rounded-full mr-2"></div> {/* Bold Line */}
          <h3 className="text-purple-600 font-bold text-lg">{subtitle}</h3>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-snug">{title}</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Details:</h4>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        <a
          href="#"
          className="text-purple-600 font-medium mt-6 inline-block hover:underline"
        >
          Read More...
        </a>
      </div>

      
      <div className="lg:w-1/3 space-y-4 ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center p-4  hover:shadow-lg transition duration-300"
          >
            <div className="text-white bg-purple-900 text-2xl mr-4">{feature.icon}</div>
            <div>
              <h4 className="font-bold text-gray-800">{feature.label}</h4>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
        <button className="w-full bg-white text-purple-700 py-3 border border-purple-600 rounded-lg font-semibold flex items-center justify-center hover:bg-gray-300 transition duration-300">
          <FaDownload className="mr-2 text-lg" />
          Download Syllabus for Complete Details
        </button>
      </div>
    </div>
  );
};

export default AboutCourse;
