import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import axios from "axios";

const ExamSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("title");

  const handleSearch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://grtc-new-node-backend.onrender.com/api/exam/getExamByName`,
        { examName: searchTerm.toLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSearchResults(response.data);
      setError(null);
    } catch (err) {
      setError(err.response.data.errors[0].msg);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExam = (id) => {
    // Add your delete exam logic here
    console.log(`Delete exam with id: ${id}`);
  };

  const sortResults = (results, type) => {
    return results.slice().sort((a, b) => {
      if (type === "title") {
        return a.title.localeCompare(b.title);
      } else if (type === "date") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
  };

  const handleSortChange = (type) => {
    setSortType(type);
    setSearchResults((prevResults) => sortResults(prevResults, type));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear());
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid Date";
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center p-6 bg-white">
          <h1 className="text-3xl font-bold">Search Exam</h1>
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border border-gray-400 rounded px-3 py-2 w-full"
              placeholder="Enter exam title..."
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 ml-2 rounded"
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex justify-end p-6 bg-white">
          <button
            onClick={() => handleSortChange("title")}
            className={`${
              sortType === "title" ? "bg-blue-600" : "bg-gray-600"
            } text-white px-4 py-2 rounded mr-2`}
          >
            Sort by Title (A-Z)
          </button>
          <button
            onClick={() => handleSortChange("date")}
            className={`${
              sortType === "date" ? "bg-blue-600" : "bg-gray-600"
            } text-white px-4 py-2 rounded`}
          >
            Sort by Date Created
          </button>
        </div>
        {loading && <Loader />}
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        {searchResults.length > 0 && (
          <div className="mt-4">
            <div className="flex-1 bg-gray-100 overflow-auto">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {searchResults.map((exam) => (
                        <tr key={exam._id}>
                          <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                            {exam.title}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                            {exam.description}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatDate(exam.createdAt)}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                            <Link to={`/edit-exam/${exam._id}`}>
                              <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
                                Edit
                              </button>
                            </Link>
                            <Link to={`/exam-details/${exam._id}`}>
                              <button className="bg-green-600 text-white px-4 py-2 rounded mr-2">
                                Details
                              </button>
                            </Link>
                            <button
                              className="bg-red-600 text-white px-4 py-2 rounded mr-2"
                              onClick={() => handleDeleteExam(exam._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamSearch;
