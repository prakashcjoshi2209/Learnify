
"use client";
import React, { useState } from "react";
import Breakdown from "./Breakdown";  
import CoursePage from "./CoursePage";

const AdminCoursePage: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabs = ["Card Template", "Intro Page", "Breakdown"];
  const [fields, setFields] = useState([
    { heroImg: "", duration: "", topic: "", description: "", price: "" },
  ]);

  const addField = () => {
    setFields([
      ...fields,
      { heroImg: "", duration: "", topic: "", description: "", price: "" },
    ]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index][field as keyof typeof fields[0]] = value;
    setFields(updatedFields);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-2">
        {/* Top Navigation */}
        <div className="flex items-center  justify-between mb-6">
          <input
            type="text"
            placeholder="Search your course here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <button className="ml-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
            Add
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setActiveTabIndex((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
          >
            &lt;
          </button>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`flex-1 mx-2 px-4 py-2 text-center rounded-lg ${
                activeTabIndex === index
                  ? "bg-purple-700 text-white"
                  : "bg-purple-200 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
              }`}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={() => setActiveTabIndex((prev) => Math.min(prev + 1, tabs.length - 1))}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>

        {/* Tab Content */}
        {activeTabIndex === 0 && (
          <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Card Template</h2>
            <div className="w-full border border-gray-300 rounded-md mb-4">
              <table className="w-full">
                <tbody>
                  {fields.map((field, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="bg-gray-100 text-purple-700 font-bold px-4 py-2">Hero IMG</td>
                        <td className="px-4 py-2">
                          <input
                            type="file"
                            className="w-full p-1 border border-gray-300 rounded-md"
                            onChange={(e) => handleInputChange(index, "heroImg", e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-gray-100 text-purple-700 font-bold px-4 py-2">Duration</td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={field.duration}
                            onChange={(e) => handleInputChange(index, "duration", e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-gray-100 text-purple-700 font-bold px-4 py-2">Topic</td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={field.topic}
                            onChange={(e) => handleInputChange(index, "topic", e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-gray-100 text-purple-700 font-bold px-4 py-2">
                          Description
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={field.description}
                            onChange={(e) => handleInputChange(index, "description", e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-gray-100 text-purple-700 font-bold px-4 py-2">Price</td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={field.price}
                            onChange={(e) => handleInputChange(index, "price", e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md"
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={addField}
              className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 mb-4"
            >
              Add Field
            </button>
          </div>
        )}

        {activeTabIndex === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Intro Page</h2>
            {/* <p>Intro page here .....</p> */}
            <CoursePage />
          </div>
        )}

        {activeTabIndex === 2 && (
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Breakdown</h2>
            <Breakdown /> {/* Render the Breakdown component here */}
          </div>
        )}

        {/* Update Button */}
        <div className="flex justify-center items-center">
        <button className="px-4 py-2 my-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Update
        </button>
        </div>
      </main>
    </div>
  );
};

export default AdminCoursePage;
