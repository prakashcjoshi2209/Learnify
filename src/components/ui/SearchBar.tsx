"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchResult {
  id: string;
  name: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.length > 1) {
      try {
        const response = await fetch(`/api/search?query=${query}`);
        if (!response.ok) throw new Error("Failed to fetch search results");

        const data: SearchResult[] = await response.json();
        setResults(data);
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
              key={item.id}
              className="p-2 border-b text-gray-800 cursor-pointer hover:bg-gray-100"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;