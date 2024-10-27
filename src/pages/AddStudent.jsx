import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import FileUpload from '../components/FileUpload';
import Loader from '../components/Loader'


const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    course: '',
    dateOfAdmission: '',
    courseduration: '',
    dob: '',
    moteherName: '',
    fatherName: '',
    address: '',
    grade: '',
    password: '', // Optional
    coursecompleted: '',
    certificateissued: '',
    certificateNo: '',
    profilePic: '', // Changed to text field
    certificatePic: '', // Changed to text field
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const token = localStorage.getItem('token');

      // Send to the first API without password
      const studentDataResponse = await fetch(
        'https://grtcindia.in/grtc-server/api/students',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      // Send to the second API with password
      const apiResponse = await fetch('https://grtc-new-node-backend.onrender.com/api/students', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (studentDataResponse.ok && apiResponse.ok) {
        toast.success('Student created successfully');
        setFormData({
          name: '',
          registrationNo: '',
          course: '',
          dateOfAdmission: '',
          courseduration: '',
          dob: '',
          moteherName: '',
          fatherName: '',
          address: '',
          grade: '',
          password: '',
          profilePic: '',
          certificatePic: '',
          coursecompleted: '',
          certificateissued: '',
          certificateNo: '',
        });
        setLoading(false)
        navigate('/');
      } else {
        toast.error('Failed to create student');
      }
    } catch (err) {
      toast.error('Error creating student: ' + err.message);
      console.error('Error creating student:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
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
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Enter password (optional)"
                  name="password"
                  value={formData.password}
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
                  required
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
                  required
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
                  value={formData.courseduration}
                  onChange={handleChange}
                  required
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
                  value={formData.dob}
                  onChange={handleChange}
                  required
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
                  value={formData.moteherName}
                  onChange={handleChange}
                  required
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
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
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
                  value={formData.grade}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Completed
                </label>
                <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="coursecompleted"
                  value={formData.coursecompleted}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
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
                  value={formData.certificateissued}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Certificate No.
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter certificate number"
                  name="certificateNo"
                  value={formData.certificateNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <FileUpload label="Profile Picture" fieldName="profilePic" setFormData={setFormData} />
            <FileUpload label="Certificate Picture" fieldName="certificatePic" setFormData={setFormData} />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
