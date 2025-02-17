"use client";

import React from "react";

interface SubField {
  id: number;
  name: string;
  type: string;
  placeholder: string;
}

interface Field {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  subFields?: SubField[];
}


const CardTemplateForm: React.FC = () => {

  const fields: Field[] = [
    { id: 1, name: "Hero IMG", type: "file", placeholder: "" },
    { id: 2, name: "Duration", type: "text", placeholder: "Enter Duration" },
    { id: 3, name: "Topic", type: "text", placeholder: "Enter Topic" },
    { id: 4, name: "Short Description", type: "text", placeholder: "Enter Description" },
    { 
      id: 5, 
      name: "Price", 
      type: "number", 
      placeholder: "Enter Price", 
      subFields: [
        { id: 51, name: "Current Price", type: "number", placeholder: "Enter Current Price" },
        { id: 52, name: "Original Price", type: "number", placeholder: "Enter Original Price" },
        { id: 53, name: "Discount Percentage", type: "number", placeholder: "Enter Discount %" },
      ],
    },
  ];

  // const addField = () => {
  //   setFields([
  //     ...fields,
  //     { id: Date.now(), name: "New Field", type: "text", placeholder: "Enter Field Value" },
  //   ]);
  // };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <table className="w-full text-left border-collapse border border-gray-200 mb-4">
        <thead>
          <tr>
            <th className="p-2 border border-gray-200">Field Name</th>
            <th className="p-2 border border-gray-200">Input</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <React.Fragment key={field.id}>
              <tr>
                <td className="p-2 border border-gray-200">{field.name}</td>
                <td className="p-2 border border-gray-200">
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="border p-2 rounded w-full"
                  />
                </td>
              </tr>
              {/* Render subfields for Price */}
              {field.subFields &&
                field.subFields.map((subField) => (
                  <tr key={subField.id}>
                    <td className="pl-6 p-2 border border-gray-200 text-gray-600">
                      ├─ {subField.name}
                    </td>
                    <td className="p-2 border border-gray-200">
                      <input
                        type={subField.type}
                        placeholder={subField.placeholder}
                        className="border p-2 rounded w-full"
                      />
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Buttons for adding new fields */}
      {/* <div className="flex justify-between">
        <button
          onClick={addField}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Add Field
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update
        </button>
      </div> */}
    </div>
  );
};

export default CardTemplateForm;
