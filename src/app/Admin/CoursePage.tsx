// "use client";
// import React, { useState } from "react";

// const CoursePage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-indigo-700 mb-6">
//         Course Introduction Page
//       </h1>

//       {/* Course Introduction Section */}
//       <DynamicSection
//         title="Course Introduction"
//         initialFields={[
//           "Demo",
//           "Long Description",
//           "Category",
//           "Select Level",
//           "Certificate Provider",
//           "Lifetime Access",
//           "Subtitles",
//           "Subtitles Language",
//           "Tags", 
//           "Prerequisite",
//           "Requirement",
//           "Publisher Name",
//           "Publisher Bio",
//           "Publisher Profile Image",
//         ]}
//       />

//       {/* Course Details Section */}
//       <DynamicSection
//         title="Course Details"
//         initialFields={["No. of Assignment", "Video Lectures"]}
//       />

//       {/* About Course Section */}
//       <DynamicSection title="About Course" initialFields={["Syllabus"]} />
//     </div>
//   );
// };

// const DynamicSection: React.FC<{ title: string; initialFields: string[] }> = ({
//   title,
//   initialFields,
// }) => {
//   const [fields, setFields] = useState<string[]>(initialFields);
//   const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});
//   const [categories, setCategories] = useState<string[]>([
//     "Programming",
//     "Web Development",
//     "Data Science",
//     "Cloud Computing",
//     "Cyber Security",
//     "Management",
//   ]);

//   const addField = () => {
//     const newField = prompt("Enter new field name:");
//     if (newField) {
//       setFields([...fields, newField]);
//       setFieldValues({ ...fieldValues, [newField]: "" });
//     }
//   };

//   const addCategory = () => {
//     const newCategory = prompt("Enter new category name:");
//     if (newCategory && !categories.includes(newCategory)) {
//       setCategories([...categories, newCategory]);
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFieldValues({ ...fieldValues, [field]: value.toString() });
//   };

//   return (
//     <div className="mb-6">
//       <h2 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h2>
//       <div className="bg-white p-4 rounded-lg shadow">
//         <Table
//           fields={fields}
//           fieldValues={fieldValues}
//           onInputChange={handleInputChange}
//           categories={categories}
//           addCategory={addCategory}
//         />
//         <div className="text-right mt-2">
//           <button
//             onClick={addField}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             Add Field
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Table: React.FC<{
//   fields: string[];
//   fieldValues: { [key: string]: string };
//   onInputChange: (field: string, value: string) => void;
//   categories: string[];
//   addCategory: () => void;
// }> = ({ fields, fieldValues, onInputChange, categories, addCategory }) => (
//   <table className="w-full border-collapse border border-gray-300">
//     <tbody>
//       {fields.map((field, index) => (
//         <tr key={index} className="border border-gray-300">
//           <td className="p-2 border-r border-gray-300">{field}</td>
//           <td className="p-2">
//             {field === "Category" ? (
//               <div className="flex items-center gap-2">
//                 <select
//                   value={fieldValues[field] || "Programming"}
//                   onChange={(e) => onInputChange(field, e.target.value)}
//                   className="w-full border p-1 rounded"
//                 >
//                   {categories.map((category, i) => (
//                     <option key={i} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   onClick={addCategory}
//                   className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   + Add Category
//                 </button>
//               </div>
//             ) : field === "Select Level" ||
//               field === "Certificate Provider" ||
//               field === "Lifetime Access" ||
//               field === "Subtitles" ? (
//               <select
//                 value={fieldValues[field] || "No"}
//                 onChange={(e) => onInputChange(field, e.target.value)}
//                 className="w-full border p-1 rounded"
//               >
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             ) : field === "Subtitles Language" && fieldValues["Subtitles"] === "Yes" ? (
//               <select
//                 value={fieldValues[field] || "English"}
//                 onChange={(e) => onInputChange(field, e.target.value)}
//                 className="w-full border p-1 rounded"
//               >
//                 <option value="English">English</option>
//                 <option value="Hindi">Hindi</option>
//                 <option value="Both">Both</option>
//               </select>
//             ) : (
//               <input
//                 type="text"
//                 value={fieldValues[field] || ""}
//                 onChange={(e) => onInputChange(field, e.target.value)}
//                 className="w-full border p-1 rounded"
//               />
//             )}
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// );

// export default CoursePage;


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
          "Long Description",
          "Category",
          "Certificate Provider",
          "Lifetime Access",
          "Select Level",
          "Tags", 
          "Prerequisite",
          "Requirement",
          "Publisher Name",
          "Publisher Bio",
          "Publisher Profile Image",
          "Subtitles",
         
        ]}
      />

      {/* Course Details Section */}
      <DynamicSection
        title="Course Details"
        initialFields={["No. of Assignment", "Video Lectures"]}
      />

      {/* About Course Section */}
      <DynamicSection title="About Course" initialFields={["Syllabus"]} />
    </div>
  );
};

const DynamicSection: React.FC<{ title: string; initialFields: string[] }> = ({
  title,
  initialFields,
}) => {
  const [fields, setFields] = useState<string[]>(initialFields);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});
  const [categories, setCategories] = useState<string[]>([
    "Programming",
    "Web Development",
    "Data Science",
    "Cloud Computing",
    "Cyber Security",
    "Management",
  ]);

  const addField = () => {
    const newField = prompt("Enter new field name:");
    if (newField) {
      setFields([...fields, newField]);
      setFieldValues({ ...fieldValues, [newField]: "" });
    }
  };

  const addCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFieldValues({ ...fieldValues, [field]: value.toString() });

    // Show or hide 'Subtitles Language' field based on 'Subtitles' selection
    if (field === "Subtitles") {
      if (value === "Yes") {
        if (!fields.includes("Subtitles Language")) {
          setFields([...fields, "Subtitles Language"]);
        }
      } else {
        setFields(fields.filter(f => f !== "Subtitles Language"));
      }
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Table
          fields={fields}
          fieldValues={fieldValues}
          onInputChange={handleInputChange}
          categories={categories}
          addCategory={addCategory}
        />
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

const Table: React.FC<{
  fields: string[];
  fieldValues: { [key: string]: string };
  onInputChange: (field: string, value: string) => void;
  categories: string[];
  addCategory: () => void;
}> = ({ fields, fieldValues, onInputChange, categories, addCategory }) => (
  <table className="w-full border-collapse border border-gray-300">
    <tbody>
      {fields.map((field, index) => (
        <tr key={index} className="border border-gray-300">
          <td className="p-2 border-r border-gray-300">{field}</td>
          <td className="p-2">
            {field === "Category" ? (
              <div className="flex items-center gap-2">
                <select
                  value={fieldValues[field] || "Programming"}
                  onChange={(e) => onInputChange(field, e.target.value)}
                  className="w-full border p-1 rounded"
                >
                  {categories.map((category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addCategory}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  + Add Category
                </button>
              </div>
            ) : field === "Select Level" ? (
              <select
                value={fieldValues[field] || "Beginner"}
                onChange={(e) => onInputChange(field, e.target.value)}
                className="w-full border p-1 rounded"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            ) : field === "Certificate Provider" ||
              field === "Lifetime Access" ||
              field === "Subtitles" ? (
              <select
                value={fieldValues[field] || "No"}
                onChange={(e) => onInputChange(field, e.target.value)}
                className="w-full border p-1 rounded"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : field === "Subtitles Language" ? (
              <select
                value={fieldValues[field] || "English"}
                onChange={(e) => onInputChange(field, e.target.value)}
                className="w-full border p-1 rounded"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Both">Both</option>
              </select>
            ) : (
              <input
                type="text"
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