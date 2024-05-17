import React, { useState } from "react";

const GetStudent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStudentCard, setShowStudentCard] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    setShowStudentCard(true);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-lg p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Get Student</h1>
        <div className="flex items-center mb-4 justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Enter Roll Number"
            className="mr-2 px-3 py-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
        {showStudentCard && (
         <div className="flex justify-center">
         <div className="bg-white shadow rounded-lg p-6 mr-4 w-80">
           <img
             src="https://via.placeholder.com/150"
             alt="Profile Pic"
             className="rounded-full h-20 w-20 mx-auto mb-4"
           />
           <h2 className="text-lg font-bold">Dummy Student Name</h2>
           <p className="text-gray-600">Address: Dummy Address</p>
           <p className="text-gray-600">Email: dummy@example.com</p>
           {/* Add more dummy student details as needed */}
         </div>
         <div className="bg-white shadow p-6 mr-4 w-80">
           <div className="h-32 w-32 mx-auto mb-4">
             <img
               src="https://via.placeholder.com/150"
               alt="Profile Pic"
               className="h-full w-full object-cover"
             />
           </div>
           {/* Add more dummy student details as needed */}
         </div>
       </div>
       
        )}
      </div>
    </div>
  );
};

export default GetStudent;
