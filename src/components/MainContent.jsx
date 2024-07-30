import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Pagination from "./Pagination";
import Sidebar from "../components/Sidebar"; // Ensure Sidebar is imported
import Loader from "./Loader"; // Ensure Loader is imported
import Papa from "papaparse";
import { Link } from "react-router-dom";
import Search from "./Search";

const MainContent = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [useAlternateAPI, setUseAlternateAPI] = useState(false);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchExams();
  }, [currentPage, useAlternateAPI]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = useAlternateAPI
        ? `https://grtcindia.in/grtc-server/api/students?page=${currentPage}`
        : `https://grtc-new-node-backend.onrender.com/api/students?page=${currentPage}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (useAlternateAPI) {
        const { data, meta } = response.data;
        setStudents(data);
        setTotalPages(meta.last_page);
      } else {
        const { students, totalPages } = response.data;
        setStudents(students);
        setTotalPages(totalPages);
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch students: " + error.message);
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://grtc-new-node-backend.onrender.com/api/students/${studentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      // Remove the deleted student from the state
      setStudents(students.filter((student) => student._id !== studentId));
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error("Error deleting student: " + error.message);
    }
  };

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = "https://grtc-new-node-backend.onrender.com/api/exam/admin";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch exams");
      }

      const data = await response.json();
      setExams(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching exams: " + error.message);
      setLoading(false);
    }
  };

  const handleAssignExam = async (studentId, examId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Log the studentId and examId to ensure they are being set correctly
      console.log("Assigning exam:", { studentId, examId });

      const response = await fetch(
        `https://grtc-new-node-backend.onrender.com/api/exam/assign`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId, examId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.errors
          ? errorData.errors[0].msg
          : "Failed to assign exam";
        toast.error(`Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      toast.success("Exam Assigned Successfully");
      console.log("Exam assigned successfully");
    } catch (error) {
      console.error("Error assigning exam:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExamAssignment = (studentId) => {
    const examId = document.getElementById(`exam-${studentId}`).value;
    if (!examId) {
      alert("Please select an exam to assign.");
      return;
    }

    const confirmAssign = window.confirm(
      "Are you sure you want to assign this exam?"
    );

    if (confirmAssign) {
      handleAssignExam(studentId, examId);
    } else {
      console.log("Assignment cancelled");
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleToggle = () => {
    setUseAlternateAPI(!useAlternateAPI);
  };

  const handleSearchSubmit = async (registrationNo) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = useAlternateAPI
        ? `https://grtcindia.in/grtc-server/api/studentReg/${registrationNo}`
        : `https://grtc-new-node-backend.onrender.com/api/students/${registrationNo}`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let studentData;

      if (useAlternateAPI) {
        // GRTC API structure
        studentData = response.data.data;
      } else {
        // Render.com API structure
        studentData = response.data;
      }

      if (studentData) {
        setStudents([studentData]);
        setTotalPages(1); // Reset pagination as we are showing a single result
      } else {
        toast.error("Student not found");
        setStudents([]);
      }
    } catch (error) {
      setError("Error fetching student: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const csv = Papa.unparse(students);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "student_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center p-6 bg-white">
          <h1 className="text-3xl font-bold">Students</h1>
          <Search onSubmit={handleSearchSubmit} />
          <div>
            <button
              onClick={exportCSV}
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              Export CSV
            </button>
            {!useAlternateAPI && (
              <Link to="/add-student">
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Add Student
                </button>
              </Link>
            )}
          </div>
          <label className="flex items-center">
            <span className="mr-2">Enable GRTC API</span>
            <div
              className={`relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in`}
            >
              <input
                type="checkbox"
                id="toggle"
                checked={useAlternateAPI}
                onChange={handleToggle}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                style={{
                  left: useAlternateAPI ? "calc(100% - 1.5rem)" : "0",
                }}
              />
              <label
                htmlFor="toggle"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  useAlternateAPI ? "bg-primary-dark" : "bg-primary"
                }`}
              ></label>
            </div>
          </label>
        </div>
        <div className="flex-1 bg-gray-100 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
                        Name
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registration No
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DOB
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      {!useAlternateAPI && (
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student, index) => (
                      <tr key={student._id || index}>
                        {" "}
                        {/* Use a unique key, fallback to index if _id is not available */}
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.name}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.registrationNo}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                          {student.course}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(student.dob)}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                          {student.grade}
                        </td>
                        {!useAlternateAPI && (
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                            <>
                              <button
                                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
                                onClick={() => handleDeleteStudent(student._id)}
                              >
                                Delete
                              </button>
                              <Link to={`/edit-student/${student._id}`}>
                                <button className="bg-blue-600 text-white h-10 w-24 rounded mr-2">
                                  Edit
                                </button>
                              </Link>

                              <select
                                name="exam"
                                className="bg-blue-600 text-white h-10 w-24 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2"
                                id={`exam-${student._id}`}
                                defaultValue=""
                              >
                                <option disabled value="">
                                  Exam
                                </option>
                                {exams.map((exam) => (
                                  <option
                                    className="py-2 px-4 text-black bg-white hover:bg-blue-600 hover:text-white"
                                    key={exam._id}
                                    value={exam._id}
                                  >
                                    {exam.title}
                                  </option>
                                ))}
                              </select>

                              <button
                                onClick={() =>
                                  handleExamAssignment(student._id)
                                }
                                className="bg-blue-600 text-white h-10 w-24 rounded ml-2"
                              >
                                Assign
                              </button>
                            </>
                          </td>
                        )}
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
              itemsPerPage={10} // Use a fixed number of items per page if needed
              totalItems={students.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
