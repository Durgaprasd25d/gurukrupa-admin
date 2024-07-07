import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import { Link, useParams,useNavigate } from "react-router-dom";

const UpdateExam = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate()

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const fetchExamDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://grtc-new-node-backend.onrender.com/api/exam/${id}/adminId`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch exam details");
      }

      const examData = await response.json();
      setFormData({
        title: examData.title,
        description: examData.description,
      });
    } catch (error) {
      toast.error("Error fetching exam details: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://grtc-new-node-backend.onrender.com/api/exam/${id}`, { // Replace with your actual server URL
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update exam");
      }
  
      // Exam updated successfully, show success toast
      toast.success("Exam updated successfully!");
      navigate('/get-exam')
    } catch (error) {
      // Error updating exam, show error toast
      toast.error("Error updating exam: " + error.message);
    }
  };
  

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-center p-6 bg-white">
          <h1 className="text-3xl font-bold">Update Exam</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Exam Title:
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter exam title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter exam description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Exam
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExam;
