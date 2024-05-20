import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

const Base64 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [error, setError] = useState("");

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const token = localStorage.getItem('token');

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:3000/api/image-to-base64", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.text(); // Response is text, not JSON
        setBase64String(data);
      } else {
        setError("Failed to upload image");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("An error occurred while uploading the image.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64String).then(
      () => {
        alert("Base64 string copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
        setError("Failed to copy the base64 string.");
      }
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6 bg-gray-100 overflow-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Image To Base64</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Upload
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {base64String && (
            <div className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="10"
                value={base64String}
                readOnly
              ></textarea>
              <button
                onClick={handleCopy}
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Base64;
