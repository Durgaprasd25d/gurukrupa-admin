import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import ProfileCard from '../components/ProfileCard.jsx'; // Import the ProfileCard component

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

  // Dummy student data
  const student = {
    name: "Dhedi",
    registrationNo: "10",
    course: "gandapda",
    dateOfAdmission: "01-01-2001",
    courseDuration: "6 months",
    dateOfBirth: "01-01-2005",
    mothersName: "Sophia",
    fathersName: "Benjamin",
    address: "555 Birch St",
    grade: "A+",
    profileImage: "https://via.placeholder.com/150" // Placeholder profile picture URL
  };
  
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Add Sidebar component */}
      <div className="flex items-center justify-center flex-1">
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
              {/* Pass the student data to the ProfileCard component */}
              <ProfileCard student={student} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStudent;
