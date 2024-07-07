import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";

const ExamDetails = () => {
  const { id } = useParams();
  const [examData, setExamData] = useState({
    title: "",
    description: "",
    questions: []
  });

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
      setExamData(examData);
    } catch (error) {
      toast.error("Error fetching exam details: " + error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h1 className="text-3xl font-bold mb-6">Exam Details</h1>
          <div className="mb-4 border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold mb-2">Exam Title:</h2>
            <p className="text-gray-800">{examData.title}</p>
          </div>
          <div className="mb-4 border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold mb-2">Description:</h2>
            <p className="text-gray-800">{examData.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Questions:</h2>
            {examData.questions.map((question, index) => (
              <div key={index} className="mb-6 border-b border-gray-200 pb-4">
                <p className="text-gray-800 mb-2">Question {index + 1}: {question.questionText}</p>
                <ul className="list-disc ml-6">
                  {question.options.map((option, i) => (
                    <li key={i} className="text-gray-600">{option}</li>
                  ))}
                </ul>
                <p className="text-gray-800 mt-2">Correct Answer: {question.correctAnswer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetails;
