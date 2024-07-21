import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const FileUpload = ({ label, fieldName, setFormData }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://grtcindia.in/grtc-server/api/profilepic', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const url = data.file_path; // Adjusted according to your API response
        setImageUrl(url);
        setFormData(prevFormData => ({
          ...prevFormData,
          [fieldName]: url,
        }));
        toast.success('File uploaded successfully');
      } else {
        toast.error('Failed to upload file');
      }
    } catch (err) {
      toast.error('Error uploading file: ' + err.message);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(imageUrl);
    toast.success('Image URL copied to clipboard');
  };

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {imageUrl && (
        <div className="mt-2 flex items-center">
          <input
            type="text"
            value={imageUrl}
            readOnly
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={handleCopyUrl}
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Copy URL
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
