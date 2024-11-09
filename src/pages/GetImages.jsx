import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { FaTrash } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { TbSelectAll } from "react-icons/tb";
import { TbDeselect } from "react-icons/tb";

const DeleteImage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://grtcindia.in/grtc-server/api/get-images",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Parse category from URL and add to each image object
        const imagesWithCategory = response.data.images.map((image) => ({
          ...image,
          category: image.public_id.split("/")[1] || "Uncategorized",
        }));

        setImages(imagesWithCategory);
      } catch (error) {
        toast.error("Error fetching images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (public_id) => {
    setLoading(true); // Show loader during the operation
    try {
      setDeleting(public_id);
      const token = localStorage.getItem("token");

      await axios.delete("https://grtcindia.in/grtc-server/api/delete-images", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { public_id },
      });

      setImages((prevImages) =>
        prevImages.filter((image) => image.public_id !== public_id)
      );
      toast.success("Image deleted successfully!");
    } catch (error) {
      toast.error("Error deleting image.");
    } finally {
      setDeleting(null);
      setLoading(false); // Hide loader after the operation
    }
  };

  const handleDeleteSelected = async () => {
    setLoading(true); // Show loader during the operation
    try {
      const token = localStorage.getItem("token");

      await axios.delete("https://grtcindia.in/grtc-server/api/delete-images", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { public_ids: selectedImages },
      });

      setImages((prevImages) =>
        prevImages.filter((image) => !selectedImages.includes(image.public_id))
      );
      setSelectedImages([]);
      toast.success("Selected images deleted successfully!");
    } catch (error) {
      toast.error("Error deleting selected images.");
    } finally {
      setLoading(false); // Hide loader after the operation
    }
  };

  const handleSelectImage = (public_id) => {
    setSelectedImages((prev) =>
      prev.includes(public_id)
        ? prev.filter((id) => id !== public_id)
        : [...prev, public_id]
    );
  };

  const handleSelectAll = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(images.map((image) => image.public_id));
    }
  };

  const toggleMarking = () => setMarking((prev) => !prev);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 p-6 overflow-y-auto bg-white shadow-lg rounded-lg mx-4 my-6">
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full max-w-lg mx-auto">
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-900 to-blue-900 text-white rounded-t-lg shadow-md">
              <h1 className="text-2xl sm:text-3xl font-bold">Delete Images</h1>
              {images.length > 0 && (
                <button
                  onClick={toggleMarking}
                  className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg flex items-center gap-2"
                >
                  {marking ? <MdCancel /> : <CiCircleCheck />}
                  {marking ? "Unmark" : "Mark"}
                </button>
              )}
            </div>

            <div className="space-y-6 bg-white shadow-md p-8 rounded-lg">
              {images.length > 0 ? (
                <>
                  {marking && (
                    <div className="flex justify-between mb-4">
                      <button
                        onClick={handleSelectAll}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                      >
                        {selectedImages.length === images.length ? (
                          <TbDeselect />
                        ) : (
                          <TbSelectAll />
                        )}
                      </button>

                      {selectedImages.length > 0 && (
                        <button
                          onClick={handleDeleteSelected}
                          className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-white rounded-lg"
                        >
                          <FaTrash className="inline mr-2" />
                          Delete Selected
                        </button>
                      )}
                    </div>
                  )}

                  {images.slice(0, 9).map((image) => (
                    <div
                      key={image.public_id}
                      className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm h-24"
                    >
                      {marking && (
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(image.public_id)}
                          onChange={() => handleSelectImage(image.public_id)}
                          id={`checkbox-${image.public_id}`}
                          className="hidden"
                        />
                      )}

                      {marking && (
                        <label
                          htmlFor={`checkbox-${image.public_id}`}
                          className="flex items-center cursor-pointer select-none"
                        >
                          <span className="w-6 h-6 rounded-full border-2 border-blue-500 bg-white flex justify-center items-center transition-colors duration-300 relative">
                            {selectedImages.includes(image.public_id) && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 text-blue-500 absolute"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </span>
                        </label>
                      )}

                      <img
                        src={image.url}
                        alt="Preview"
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                      />
                      <div className="flex flex-col justify-center ml-4">
                        <p className="text-sm font-semibold text-gray-700">
                          {image.category.charAt(0).toUpperCase() +
                            image.category.slice(1).toLowerCase()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(image.public_id)}
                        disabled={deleting === image.public_id}
                        className={`px-4 py-2 font-semibold text-white rounded-lg transition duration-200 ${
                          deleting === image.public_id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-900 hover:bg-blue-900"
                        }`}
                      >
                        {deleting === image.public_id ? (
                          "Deleting..."
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    </div>
                  ))}

                  {images.length > 9 && (
                    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
                      <p className="text-gray-700">
                        +{images.length - 9} more images
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center text-gray-700 font-semibold">
                  No images available for deletion.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteImage;
