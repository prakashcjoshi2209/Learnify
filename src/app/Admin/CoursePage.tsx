
"use client";
import React, { useState } from "react";

const CoursePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Course Introduction Page
      </h1>

      {/* Course Introduction Section */}
      <DynamicSection
        title="Course Introduction"
        initialFields={[
          "Demo",
          "Topic",
          "Long Description",
          "Sub Points",
          "Properties",
          "Publisher Name",
          "Publisher Bio",
          "Publisher Profile Image",
        ]}
      />

      {/* Course Details Section */}
      <DynamicSection
        title="Course Details"
        initialFields={["Content Duration", "No. of Assignment", "Video Lectures"]}
      />

      {/* About Course Section */}
      <DynamicSection
        title="About Course"
        initialFields={["Topic", "Intro",  "Syllabus"]}
      />

     
    </div>
  );
};

// Dynamic Section Component with Add Field Feature
const DynamicSection: React.FC<{ title: string; initialFields: string[] }> = ({
  title,
  initialFields,
}) => {
  const [fields, setFields] = useState<string[]>(initialFields);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});

  const addField = () => {
    const newField = prompt("Enter new field name:");
    if (newField) {
      setFields([...fields, newField]);
      setFieldValues({ ...fieldValues, [newField]: "" });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFieldValues({ ...fieldValues, [field]: value });
  };

  const handleFileChange = (field: string, file: File | null) => {
    if (file) {
      setFieldValues({ ...fieldValues, [field]: file.name }); // Store the file name
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Table fields={fields} fieldValues={fieldValues} onInputChange={handleInputChange} onFileChange={handleFileChange} />
        <div className="text-right mt-2">
          <button
            onClick={addField}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

// Table Component
const Table: React.FC<{ 
  fields: string[]; 
  fieldValues: { [key: string]: string }; 
  onInputChange: (field: string, value: string) => void;
  onFileChange: (field: string, file: File | null) => void;
}> = ({ fields, fieldValues, onInputChange, onFileChange }) => (
  <table className="w-full border-collapse border border-gray-300">
    <tbody>
      {fields.map((field, index) => (
        <tr key={index} className="border border-gray-300">
          <td className="p-2 border-r border-gray-300">{field}</td>
          <td className="p-2">
            {field === "Demo" ? (
              <input type="file" accept="video/*" onChange={(e) => onFileChange(field, e.target.files?.[0] || null)} className="border p-1" />
            ) : field === "Syllabus" ? (
              <input type="file" accept="application/pdf" onChange={(e) => onFileChange(field, e.target.files?.[0] || null)} className="border p-1" />
            ) : field === "Publisher Profile Image" ? (
              <input type="file" accept="image/*" onChange={(e) => onFileChange(field, e.target.files?.[0] || null)} className="border p-1" />
            ) : (
              <input 
                type={field.includes("Price") || field === "Discount Percentage" ? "number" : "text"} 
                value={fieldValues[field] || ""} 
                onChange={(e) => onInputChange(field, e.target.value)} 
                className="w-full border p-1 rounded"
              />
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CoursePage;

