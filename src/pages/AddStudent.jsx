import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx"; // Import the Sidebar component

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    registrationNo: "",
    course: "",
    dateOfAdmission: "",
    courseDuration: "",
    dateOfBirth: "",
    mothersName: "",
    fathersName: "",
    address: "",
    grade: "",
    profilePic: "",
    certificatePic: "",
  });
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Student created successfully");
        setFormData({
          name: "",
          registrationNo: "",
          course: "",
          dateOfAdmission: "",
          courseDuration: "",
          dateOfBirth: "",
          mothersName: "",
          fathersName: "",
          address: "",
          grade: "",
          profilePic: "",
          certificatePic: "",
        });
      } else {
        console.error("Failed to create student");
      }
    } catch (err) {
      console.error("Error creating student:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="flex">
    <Sidebar />
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-5">
        <h1 className="text-3xl font-bold mb-1 text-center">Add Student</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-700 text-sm font-bold">
                  Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
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
                  value={formData.registrationNo}
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
                  value={formData.course}
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
                  value={formData.dateOfAdmission}
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
                  value={formData.courseDuration}
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
                  value={formData.dateOfBirth}
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
                  value={formData.mothersName}
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
                  value={formData.fathersName}
                  onChange={handleChange}
                />
              </div>
              <div className="block text-gray-700 text-sm font-bold mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Grade
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                />
              </div>
              <div className="block text-gray-700 text-sm font-bold mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="block text-gray-700 text-sm font-bold mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Pic
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter profilePic link"
                  name="profilePic"
                  value={formData.profilePic}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="block text-gray-700 text-sm font-bold mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Certificate Pic
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter certificatePic link"
                  name="certificatePic"
                  value={formData.certificatePic}
                  onChange={handleChange}
                ></textarea>
              </div>
             
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            >
              Add Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
