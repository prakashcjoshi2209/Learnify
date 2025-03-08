

"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

// Define the types for module fields and internal details
interface ModuleField {
  number: string;
  topic: string;
  parts: string;
  duration: string;
  reward: string;
  subModules: InternalDetail[];
}

interface InternalDetail {
  partNumber: string;
  partName: string;
  duration: string;
  videoLecture: File | null;
}

const Breakdown: React.FC = () => {
  // State to manage module fields with nested sub-modules
  const [moduleFields, setModuleFields] = useState<ModuleField[]>([
    {
      number: "",
      topic: "",
      parts: "",
      duration: "",
      reward: "",
      subModules: [{ partNumber: "", partName: "", duration: "", videoLecture: null }],
    },
  ]);

  // Handle adding new module field
  const addModuleField = () => {
    setModuleFields([
      ...moduleFields,
      {
        number: "",
        topic: "",
        parts: "",
        duration: "",
        reward: "",
        subModules: [{ partNumber: "", partName: "", duration: "", videoLecture: null }],
      },
    ]);
  };

  // Handle adding new internal detail row inside a module
  const addInternalDetailRow = (moduleIndex: number) => {
    const updatedFields = [...moduleFields];
    updatedFields[moduleIndex].subModules.push({
      partNumber: "",
      partName: "",
      duration: "",
      videoLecture: null,
    });
    setModuleFields(updatedFields);
  };

  // Handle input changes for module fields
  const handleModuleInputChange = (
    index: number,
    field: keyof ModuleField,
    value: string
  ) => {
    const updatedFields = [...moduleFields];
    if (field !== "subModules") { // Ensure only non-array fields are updated with string
      updatedFields[index][field] = value;
    }
    setModuleFields(updatedFields);
  };

  // Handle input changes for internal details inside modules
  const handleInternalDetailChange = (
    moduleIndex: number,
    index: number,
    field: keyof InternalDetail,
    value: string | File | null
  ) => {
    const updatedFields = [...moduleFields];
    updatedFields[moduleIndex].subModules[index][field] = value as any;
    setModuleFields(updatedFields);
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "learnify_frontend");
    formData.append("cloud_name", "dtfe8o5ny");
  
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dtfe8o5ny/video/upload`, {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      toast.success("Lecture Video uploaded successfully")
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };
  
  const handleSave = async () => {
  console.log("Complete object before upload:", moduleFields);

  try {
    const updatedFields = [...moduleFields];

    // Iterate over modules and submodules to upload videos
    for (let module of updatedFields) {
      for (let subModule of module.subModules) {
        if (subModule.videoLecture instanceof File) {
          const uploadedUrl = await uploadToCloudinary(subModule.videoLecture);
          if (uploadedUrl) {
            subModule.videoLecture = uploadedUrl;
          } else {
            throw new Error("Video upload failed");
          }
        }
      }
    }

    // Now send the updated data with Cloudinary URLs to backend
    const response = await fetch("/api/saveCourseBreakdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error("Failed to save data");
    }

    const result = await response.json();
    console.log("Success:", result);
    toast.success("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
    toast.error("Failed to save data.");
  }
};

  

  return (
    <div>
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Course Breakdown</h1>
      {moduleFields.map((field, moduleIndex) => (
        <div key={moduleIndex} className="mb-8 border p-4 rounded-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Module</h2>
          <table className="w-full border border-gray-300">
            <tbody>
              {["Number", "Topic", "Parts", "Duration", "Reward"].map((label) => (
                <tr key={label}>
                  <td className="px-4 py-2 bg-gray-100 font-semibold text-purple-700">{label}</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={field[label.toLowerCase() as keyof ModuleField] as string}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      onChange={(e) =>
                        handleModuleInputChange(moduleIndex, label.toLowerCase() as keyof ModuleField, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Sub Module Table inside Module */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-purple-700 mb-4">Sub Module</h2>
            <table className="w-full border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  {["Part Number", "Part Name", "Duration", "Video Lecture"].map((heading) => (
                    <th key={heading} className="px-4 py-2 text-left font-semibold text-purple-700">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {field.subModules.map((row, index) => (
                  <tr key={index}>
                    {["partNumber", "partName", "duration"].map((key) => (
                      <td key={key} className="px-4 py-2">
                        <input
                          type="text"
                          value={row[key as keyof InternalDetail] as string}
                          placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          onChange={(e) =>
                            handleInternalDetailChange(moduleIndex, index, key as keyof InternalDetail, e.target.value)
                          }
                        />
                      </td>
                    ))}
                    <td className="px-4 py-2">
                      <input
                        type="file"
                        accept="video/*"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        onChange={(e) =>
                          handleInternalDetailChange(moduleIndex, index, "videoLecture", e.target.files?.[0] || null)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
              onClick={() => addInternalDetailRow(moduleIndex)}
            >
              Add Sub Module
            </button>
          </div>
          <button
            onClick={addModuleField}
            className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
          >
            Add Module
          </button>
        </div>
      ))}

      {/* Save Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Breakdown;
