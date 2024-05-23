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
      const response = await fetch(`http://localhost:3000/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
                <p>{formatDate(student.dateOfBirth)}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Date of admission:</h2>
                <p>{formatDate(student.dateOfAdmission)}</p>
              </div>
              {/* Add more fields as needed */}
            </div>
          </div>
          <div className="absolute top-6 right-6">
            <img
              src={`http://localhost:3000/${
                student.profilePic
                  ? student.profilePic.replace(/\\/g, "/")
                  : "defaultProfilePic.jpg"
              }`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center bg-gray-100 shadow-md">
          <img
            src={`http://localhost:3000/${
              student.certificatePic
                ? student.certificatePic.replace(/\\/g, "/")
                : "defaultCertificatePic.jpg"
            }`}
            alt="Certificate"
            className="w-100 h-100 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
