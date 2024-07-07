import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const CreateExam = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://grtc-new-node-backend.onrender.com/api/exam",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create exam");
      }

      // Exam created successfully, show success toast
      toast.success("Exam created successfully!");

      navigate("/exam");
      // Clear form fields after successful submission
      setFormData({
        title: "",
        description: "",
      });
      setLoading(false);
    } catch (error) {
      // Error creating exam, show error toast
      toast.error("Error creating exam: " + error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-between items-center p-6 bg-white">
              <h1 className="text-3xl font-bold">Add Exam</h1>
              {/* <div>
            <Link to="/">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Add Exam
              </button>
            </Link>
          </div> */}
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
                Add Exam
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateExam;
