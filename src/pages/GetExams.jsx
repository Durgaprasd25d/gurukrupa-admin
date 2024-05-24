import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";

const GetExam = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 10;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchExams();
  }, [currentPage]);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/exam", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch exam data");
      }

      const data = await response.json();
      setExams(data);
      setTotalPages(
        data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 0
      );
      setLoading(false);
    } catch (error) {
      setError("Error fetching exam data: " + error.message);
      setLoading(false);
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteExam = async (examId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/exam/${examId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete exam");
      }

      // Remove the deleted exam from the state
      setExams(exams.filter((exam) => exam._id !== examId));
      toast.success("Exam deleted successfully");
    } catch (error) {
      toast.error("Error deleting exam: " + error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center p-6 bg-white">
          <h1 className="text-3xl font-bold">Exams</h1>
          <div>
            <Link to="/exam">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Add Exams
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-gray-100 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {loading ? (
              <Loader />
            ) : error ? (
              <div className="p-6 text-center text-red-600">{error}</div>
            ) : (
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
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exams.map((exam) => (
                      <tr key={exam._id}>
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                          {exam.title}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                          {exam.description}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                        <Link to={`/edit-exam/${exam._id}`}>
                            <button className=" bg-blue-600 text-white px-4 py-2 rounded mr-2">
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
                          {/* <Link to={`/add-questions/${exam._id}`}>
                            <button className="bg-green-600 text-white px-4 py-2 rounded">
                              Add Questions
                            </button>
                          </Link> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  itemsPerPage={itemsPerPage}
                  totalItems={exams.length}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetExam;
