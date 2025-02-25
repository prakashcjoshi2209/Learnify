"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface SearchResult {
  _id: string;
  name: string;
  image: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    // console.log("This is the search term: ", searchTerm);

    if (query.length > 1) {
      try {
        const response = await fetch("/api/Search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });
        if (!response.ok) throw new Error("Failed to fetch search results");

        const data = await response.json();
        setResults(data.data);
        // console.log("This is the data coming form backend: ", data.data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-full max-w-[500px]">
      <div className="flex items-center bg-white text-gray-700 rounded-full px-3 py-2 mx-4 flex-grow">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for Anything..."
          className="w-full bg-transparent text-sm focus:outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Display search results */}
      {results.length > 0 && (
        <ul className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg w-full max-h-60 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item._id}
              className="p-2 border-b text-gray-800 cursor-pointer hover:bg-gray-100 flex items-center space-x-3"
            >
              <Image src={item.image} alt={item.name} width={100} height={100} className="object-cover" />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
