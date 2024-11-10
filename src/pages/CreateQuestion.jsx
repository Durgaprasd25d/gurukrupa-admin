import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { useDropzone } from "react-dropzone";

const CreateQuestion = () => {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    examId: "",
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    file: null, // for handling file upload
  });
  const [loading, setLoading] = useState(false);
  const [isBulkUpload, setIsBulkUpload] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await fetch("https://grtc-new-node-backend.onrender.com/api/exam/admin", {
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      setLoading(true);
      const token = localStorage.getItem("token");

      // For Single Question Creation
      if (!isBulkUpload) {
        const response = await fetch("https://grtc-new-node-backend.onrender.com/api/questions/create_question", {
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
          file: null,
        });
      } else {
        // For Bulk Question Upload
        const formDataToSend = new FormData();
        formDataToSend.append("file", formData.file);
        formDataToSend.append("examId", formData.examId);

        const response = await fetch("https://grtc-new-node-backend.onrender.com/api/questions/create_question", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend, // Body is FormData, which handles multipart/form-data
        });
        

        if (!response.ok) {
          throw new Error("Failed to upload bulk questions");
        }

        toast.success("Bulk questions uploaded successfully!");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error creating question: " + error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFormData({ ...formData, file: acceptedFiles[0] });
    },
    accept: ".xlsx", // Accept only .xlsx files
  });

  return (
    <div className="flex h-auto min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                {isBulkUpload ? "Bulk Upload Questions" : "Add Single Question"}
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">Select Exam</label>
                  <select
                    name="examId"
                    value={formData.examId}
                    onChange={handleInputChange}
                    className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Exam</option>
                    {exams.map((exam) => (
                      <option key={exam._id} value={exam._id}>
                        {exam.title}
                      </option>
                    ))}
                  </select>
                </div>

                {!isBulkUpload ? (
                  <>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600">Question</label>
                      <textarea
                        name="questionText"
                        value={formData.questionText}
                        onChange={handleInputChange}
                        className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the question"
                      ></textarea>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Options</label>
                      {formData.options.map((option, index) => (
                        <input
                          key={index}
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="mt-2 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Option ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600">Correct Answer</label>
                      <select
                        name="correctAnswer"
                        value={formData.correctAnswer}
                        onChange={handleInputChange}
                        className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select the correct answer</option>
                        {formData.options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <div
                    {...getRootProps()}
                    className="mt-4 p-4 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <p className="text-center text-gray-600">
                      {formData.file
                        ? `File: ${formData.file.name}`
                        : "Drag & drop an Excel file here, or click to select"}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {isBulkUpload ? "Upload Questions" : "Add Question"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBulkUpload(!isBulkUpload)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {isBulkUpload ? "Add Single Question" : "Upload Bulk Questions"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateQuestion;
