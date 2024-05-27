import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";

const CreateQuestion = () => {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    examId: "",
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/exam/admin", {
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
    } catch (error) {
      toast.error("Error fetching exams: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create question");
      }

      toast.success("Question created successfully!");

      setFormData({
        examId: "",
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    } catch (error) {
      toast.error("Error creating question: " + error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-center p-6 bg-white">
          <h1 className="text-3xl font-bold">Add Question</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Exam:
            </label>
            <select
              name="examId"
              value={formData.examId}
              onChange={handleInputChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select an exam</option>
              {exams.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Question:
            </label>
            <textarea
              name="questionText"
              value={formData.questionText}
              onChange={handleInputChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter the question"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Options:
            </label>
            {formData.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                placeholder={`Option ${index + 1}`}
              />
            ))}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correct Answer:
            </label>
            <select
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleInputChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select the correct answer</option>
              {formData.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
