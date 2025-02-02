
"use client";

import React, { useState } from "react";

// Define the types for module fields and internal details
interface ModuleField {
  number: string;
  topic: string;
  parts: string;
  duration: string;
}

interface InternalDetail {
  partNumber: string;
  partName: string;
  duration: string;
  lastDate: string;
}

const Breakdown: React.FC = () => {
  // State to manage module fields
  const [moduleFields, setModuleFields] = useState<ModuleField[]>([
    { number: "", topic: "", parts: "", duration: "" },
  ]);

  // State to manage internal details rows
  const [internalDetails, setInternalDetails] = useState<InternalDetail[]>([
    { partNumber: "", partName: "", duration: "", lastDate: "" },
  ]);

  // Handle adding new module field
  const addModuleField = () => {
    setModuleFields([
      ...moduleFields,
      { number: "", topic: "", parts: "", duration: "" },
    ]);
  };

  // Handle adding new internal detail row
  const addInternalDetailRow = () => {
    setInternalDetails([
      ...internalDetails,
      { partNumber: "", partName: "", duration: "", lastDate: "" },
    ]);
  };

  // Handle input changes for module fields
  const handleModuleInputChange = (
    index: number,
    field: keyof ModuleField,
    value: string
  ) => {
    const updatedFields = [...moduleFields];
    updatedFields[index][field] = value;
    setModuleFields(updatedFields);
  };

  // Handle input changes for internal details
  const handleInternalDetailChange = (
    index: number,
    field: keyof InternalDetail,
    value: string
  ) => {
    const updatedRows = [...internalDetails];
    updatedRows[index][field] = value;
    setInternalDetails(updatedRows);
  };

  return (
    <div>
      {/* Breakdown Content */}
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Course Breakdown</h1>

      {/* Module Table */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-purple-700 mb-4">Module</h2>
        <table className="w-full border border-gray-300">
          <tbody>
            {moduleFields.map((field, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="px-4 py-2 bg-gray-100 font-semibold text-purple-700">Number</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={field.number}
                      placeholder="Enter number"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      onChange={(e) =>
                        handleModuleInputChange(index, "number", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 bg-gray-100 font-semibold text-purple-700">Topic</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={field.topic}
                      placeholder="Enter topic"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      onChange={(e) =>
                        handleModuleInputChange(index, "topic", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 bg-gray-100 font-semibold text-purple-700">Parts</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={field.parts}
                      placeholder="Enter parts"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      onChange={(e) =>
                        handleModuleInputChange(index, "parts", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 bg-gray-100 font-semibold text-purple-700">Duration</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={field.duration}
                      placeholder="Enter duration"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      onChange={(e) =>
                        handleModuleInputChange(index, "duration", e.target.value)
                      }
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <button
          onClick={addModuleField}
          className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
        >
          Add Field
        </button>
      </div>

      {/* Internal Details Table */}
      <div>
        <h2 className="text-lg font-semibold text-purple-700 mb-4">Internal Details</h2>
        <table className="w-full border border-gray-300 mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-purple-700">Part Number</th>
              <th className="px-4 py-2 text-left font-semibold text-purple-700">Part Name</th>
              <th className="px-4 py-2 text-left font-semibold text-purple-700">Duration</th>
              <th className="px-4 py-2 text-left font-semibold text-purple-700">Last Date</th>
            </tr>
          </thead>
          <tbody>
            {internalDetails.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.partNumber}
                    placeholder="Enter part number"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      handleInternalDetailChange(index, "partNumber", e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.partName}
                    placeholder="Enter part name"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      handleInternalDetailChange(index, "partName", e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.duration}
                    placeholder="Enter duration"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      handleInternalDetailChange(index, "duration", e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.lastDate}
                    placeholder="Enter last date"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      handleInternalDetailChange(index, "lastDate", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 mx-1 my-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
            onClick={addInternalDetailRow}
          >
            Add Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default Breakdown;
