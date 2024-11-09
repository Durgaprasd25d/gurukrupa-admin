import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const CreateImageUpload = () => {
  const [formData, setFormData] = useState({
    image_category: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setImageFiles(acceptedFiles);
    const previews = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImagePreviews(previews);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    directory: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (imageFiles.length === 0) {
      toast.error("Please add at least one image.");
      return false;
    }
    if (!formData.image_category) {
      toast.error("Please select an image category.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      imageFiles.forEach((file) => formDataToSend.append("images", file));
      formDataToSend.append("image_category", formData.image_category);

      const response = await axios.post(
        "https://grtc-new-node-backend.onrender.com/api/bulk-images",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImagePreviews([]);
      toast.success(response.data.message || "Images uploaded successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error uploading images.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 p-6 overflow-y-auto bg-white shadow-lg rounded-lg mx-4 my-6">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-t-lg shadow-md">
              <h1 className="text-2xl sm:text-3xl font-bold">Upload Images</h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 w-full max-w-lg mx-auto sm:px-6 px-4 bg-white shadow-md p-8 rounded-lg"
            >
              {/* Image Category Dropdown */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Image Category:
                </label>
                <select
                  name="image_category"
                  value={formData.image_category}
                  onChange={handleInputChange}
                  className="appearance-none border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="">Select a category</option>
                  <option value="picnic">Picnic</option>
                  <option value="students">Students</option>
                  <option value="slider">Slider</option>
                  <option value="banner">Banner</option>
                  <option value="farewell">Farewell</option>
                </select>
              </div>

              {/* Drag-and-Drop Zone */}
              <div
                {...getRootProps()}
                className={`border-dashed border-4 border-blue-300 rounded-lg p-4 text-center cursor-pointer transition duration-200 ${
                  isDragActive ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <input {...getInputProps()} />
                <p className="text-gray-700 font-semibold">
                  {isDragActive
                    ? "Drop images here ..."
                    : "Drag & drop some images here, or click to select files (folders supported)"}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                Upload Images
              </button>
            </form>

            {/* Image Preview Section */}
            <div className="flex flex-wrap justify-center mt-6 w-full lg:w-1/2">
              {imagePreviews.length > 0 &&
                imagePreviews.slice(0, 9).map((file, index) => (
                  <div key={index} className="w-32 h-32 m-2 relative">
                    <img
                      src={file.preview}
                      alt="Preview"
                      className="object-cover w-full h-full rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              {/* Show "X more images" if there are more than 9 images */}
              {imagePreviews.length > 9 && (
                <div className="w-32 h-32 m-2 bg-gray-300 flex justify-center items-center rounded-lg shadow-lg">
                  <span className="text-white text-sm">+{imagePreviews.length - 9} more images</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateImageUpload;
