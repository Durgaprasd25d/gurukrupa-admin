import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import { toast } from "react-hot-toast";

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    registrationNo: "",
    course: "",
    dateOfAdmission: "",
    courseduration: "",
    dob: "",
    moteherName: "",
    fatherName: "",
    address: "",
    grade: "",
    password: "", // Required for local API
    coursecompleted: "false", // Required for remote API
    certificateissued: "false", // Required for remote API
    certificateNo: 0, // Required for remote API
    profilePic: "",
    certificatePic: "",
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
      const formattedStudent = {
        ...data,
        dateOfAdmission: formatDate(data.dateOfAdmission),
        dob: formatDate(data.dob),
        coursecompleted: data.coursecompleted ? "true" : "false",
        certificateissued: data.certificateissued ? "true" : "false",
        certificateNo: data.certificateNo || 0,
      };
      setStudent(formattedStudent);
      setLoading(false);
    } catch (error) {
      setError("Error fetching student data: " + error.message);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Prepare data for remote API
      const remoteData = {
        ...student,
        password: undefined, // Exclude password from remoteData
        coursecompleted: student.coursecompleted === "true",
        certificateissued: student.certificateissued === "true",
      };

      // Send data to the remote API
      await fetch(`https://grtcindia.in/grtc-server/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(remoteData),
      });

      // Prepare data for local API
      const localData = new FormData();
      for (const key in student) {
        localData.append(key, student[key]);
      }

      // Send data to the local API
      const response = await fetch(`https://grtc-new-node-backend.onrender.com/api/students/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: localData,
      });

      if (!response.ok) {
        throw new Error("Failed to update student data");
      }

      // Show success toast
      toast.success("Student data updated successfully!");
      navigate(`/`);
    } catch (error) {
      setError("Error updating student data: " + error.message);
      // Show error toast
      toast.error("Failed to update student data!");
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  name="courseduration"
                  value={student.courseduration}
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
                  name="dob"
                  value={student.dob}
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
                  name="moteherName"
                  value={student.moteherName}
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
                  name="fatherName"
                  value={student.fatherName}
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
                  type="text"
                  placeholder="Enter profile picture URL"
                  name="profilePic"
                  value={student.profilePic}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Certificate Pic
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter certificate picture URL"
                  name="certificatePic"
                  value={student.certificatePic}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Completed
                </label>
                <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="coursecompleted"
                  value={student.coursecompleted}
                  onChange={handleChange}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Certificate Issued
                </label>
                <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="certificateissued"
                  value={student.certificateissued}
                  onChange={handleChange}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Certificate No
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  placeholder="Enter certificate number"
                  name="certificateNo"
                  value={student.certificateNo}
                  onChange={handleChange}
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
