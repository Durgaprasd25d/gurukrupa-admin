import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Invoke the onSearch function with the current query
  };

  return (
    <div className="flex items-center mb-4 justify-center">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Enter Roll Number"
        className="mr-2 px-3 py-2 border rounded"
      />
      <button
        onClick={() => onSearch(searchQuery)} // Invoke onSearch when the button is clicked
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
