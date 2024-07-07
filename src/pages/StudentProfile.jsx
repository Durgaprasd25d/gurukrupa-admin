import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import Sidebar from "../components/Sidebar.jsx";

const StudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://grtc-new-node-backend.onrender.com/api/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      const data = await response.json();
      setStudent(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching student data: " + error.message);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  // Function to format date as "dd-mm-yy"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col md:flex-row w-full p-6">
        <div className="relative flex-1 flex flex-col justify-between p-6 bg-white shadow-md mr-4">
          <div>
            <h1 className="text-3xl font-bold mb-4">
              {student.name}'s Profile
            </h1>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Registration No:</h2>
                <p>{student.registrationNo}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Date of Admission:</h2>
                <p>{formatDate(student.dateOfAdmission)}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Course Name:</h2>
                <p>{student.course}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Date of birth:</h2>
                <p>{formatDate(student.dob)}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Date of admission:</h2>
                <p>{formatDate(student.dateOfAdmission)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
