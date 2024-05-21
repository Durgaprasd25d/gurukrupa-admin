import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";

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

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">{student.name}'s Profile</h1>
      <div className="mt-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Registration No:</h2>
          <p>{student.registrationNo}</p>
        </div>
        {/* Repeat for other fields */}
      </div>
    </div>
  );
};

export default StudentProfile;
