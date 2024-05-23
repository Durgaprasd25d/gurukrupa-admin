import React, { useState } from "react";

const Search = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(searchQuery.trim()); // Invoke the onSubmit function with the current query (trimmed)
    setSearchQuery(""); // Clear the search query after submitting the form
  };
  


  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4 justify-center">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Enter Roll Number"
        className="mr-2 px-3 py-2 border rounded"
      />
      <button
        type="submit" // Ensure the button triggers form submission
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
