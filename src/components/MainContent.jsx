import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import Pagination from "./Pagination";
import Loader from "./Loader";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

const MainContent = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [exams, setExams] = useState([]);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url = `https://grtc-new-node-backend.onrender.com/api/students`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const data = await response.json();
      setStudents(data.students);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (error) {
      setError("Error fetching student data: " + error.message);
      setLoading(false);
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

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const handleAssignExam = async (studentId, examId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://grtc-new-node-backend.onrender.com/api/exam/assign`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, examId }),
      });

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
      // Optionally, update state or show a success message
    } catch (error) {
      console.error("Error assigning exam:", error);
      toast.error(`Error: ${error.message}`);
      // Optionally, you can handle the error further if needed
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

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center p-6 bg-white">
          <h1 className="text-3xl font-bold">Students</h1>
          <div>
            <button
              onClick={exportCSV}
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
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
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student._id}>
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
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
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
                          <Link to={`/student-profile/${student._id}`}>
                            <button className="bg-blue-600 text-white h-10 w-24 rounded mr-2">
                              Profile
                            </button>
                          </Link>
                          <select
                            name="exam"
                            className="bg-blue-600 text-white h-10 w-24 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2" // Add mt-2 for margin-top
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
                            onClick={() => handleExamAssignment(student._id)}
                            className="bg-blue-600 text-white h-10 w-24 rounded ml-2"
                          >
                            Assign
                          </button>
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
              totalItems={students.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
