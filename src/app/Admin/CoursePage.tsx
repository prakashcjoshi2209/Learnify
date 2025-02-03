"use client";
import React, { useState } from "react";

const CoursePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Course Introduction Page
      </h1>

      {/* Course Introduction Section */}
      <DynamicSection title="Course Introduction" initialFields={["Demo", "Topic", "Description", "Rating", "Publisher"]} />

      {/* Course Details Section */}
      <DynamicSection title="Course Details" initialFields={["Content Duration", "No. of Assignment", "Video Lectures", "Students Enrolled"]} />

      {/* About Course Section */}
      <DynamicSection title="About Course" initialFields={["Topic", "Details", "Properties", "Syllabus"]} />
    </div>
  );
};

// Dynamic Section Component with Add Field Feature
const DynamicSection: React.FC<{ title: string; initialFields: string[] }> = ({ title, initialFields }) => {
  const [fields, setFields] = useState<string[]>(initialFields);

  const addField = () => {
    const newField = prompt("Enter new field name:");
    if (newField) setFields([...fields, newField]);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Table fields={fields} />
        <div className="text-right mt-2">
          <button onClick={addField} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

// Table Component
const Table: React.FC<{ fields: string[] }> = ({ fields }) => (
  <table className="w-full border-collapse border border-gray-300">
    <tbody>
      {fields.map((field, index) => (
        <tr key={index} className="border border-gray-300">
          <td className="p-2 border-r border-gray-300">{field}</td>
          <td className="p-2">
            {field === "Demo" ? (
              <button className="px-2 py-1 bg-gray-200 text-sm rounded">Choose Video</button>
            ) : field === "Syllabus" ? (
              <button className="px-2 py-1 bg-gray-200 text-sm rounded">Choose PDF</button>
            ) : (
              ""
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CoursePage;
