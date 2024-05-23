import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    registrationNo: "",
    course: "",
    dateOfAdmission: "",
    courseDuration: "",
    dateOfBirth: "",
    mothersName: "",
    fathersName: "",
    grade: "",
    address: "",
    profilePic: null,
    certificatePic: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      // Update date fields formatting
      const formattedStudent = {
        ...data,
        dateOfAdmission: formatDate(data.dateOfAdmission),
        dateOfBirth: formatDate(data.dateOfBirth),
      };
      setStudent(formattedStudent);
      setLoading(false);
    } catch (error) {
      setError("Error fetching student data: " + error.message);
      setLoading(false);
    }
  };

  // Function to format dates as "yyyy-MM-dd"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      for (const key in student) {
        formData.append(key, student[key]);
      }

      const response = await fetch(`http://localhost:3000/api/students/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to update student data");
      }
      navigate(`/`);
    } catch (error) {
      setError("Error updating student data: " + error.message);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-5">
          <h1 className="text-3xl font-bold mb-1 text-center">Edit Student</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Registration No
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter registration number"
                  name="registrationNo"
                  value={student.registrationNo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter course"
                  name="course"
                  value={student.course}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date of Admission
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  name="dateOfAdmission"
                  value={student.dateOfAdmission}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Duration
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter course duration"
                  name="courseDuration"
                  value={student.courseDuration}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date of Birth
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  name="dateOfBirth"
                  value={student.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mother's Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter mother's name"
                  name="mothersName"
                  value={student.mothersName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Father's Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter father's name"
                  name="fathersName"
                  value={student.fathersName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Grade
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter grade"
                  name="grade"
                  value={student.grade}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter address"
                  name="address"
                  value={student.address}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Pic
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Certificate Pic
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  name="certificatePic"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            >
              Edit Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
