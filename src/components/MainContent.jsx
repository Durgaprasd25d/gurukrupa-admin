import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Loader from "./Loader.jsx"; // Import the Loader component
import Search from "../components/Search.jsx"; // Import the Search component

const MainContent = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // Initialize totalPages state

  const itemsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, [currentPage, searchQuery]);

  const filterStudents = (students, query) => {
    if (!query) {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) =>
          (student.firstName &&
            student.firstName.toLowerCase().includes(query.toLowerCase())) ||
          (student.lastName &&
            student.lastName.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredStudents(filtered);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      const data = await response.json();
      setStudents(data.users);
      filterStudents(data.users, searchQuery); // Pass searchQuery to filterStudents
      setTotalPages(Math.ceil(data.users.length / itemsPerPage)); // Calculate totalPages
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      setError("Error fetching student data: " + error.message);
      setLoading(false); // Set loading to false on error
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-6 bg-white">
        <h1 className="text-3xl font-bold">Students</h1>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
            Export CSV
          </button>
          <Link to="/add-student">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Add Student
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 overflow-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Search onSearch={handleSearch} />
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {loading ? (
              <Loader />
            ) : error ? (
              <div className="p-6 text-center text-red-600">{error}</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email address
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.id}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                        {student.firstName}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                        {student.age}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                        {student.gender}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            totalItems={students.length} // Pass the total number of students
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
