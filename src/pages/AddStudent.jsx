import React, { useState } from "react";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    state: "New Mexico",
    zip: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic to submit the student data
    console.log("Submitting student data:", formData);
    // Clear form fields after submission
    setFormData({
      firstName: "",
      lastName: "",
      password: "",
      city: "",
      state: "New Mexico",
      zip: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-lg bg-white rounded-lg ml-9 shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Student</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="New Mexico">New Mexico</option>
                <option value="Missouri">Missouri</option>
                <option value="Texas">Texas</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Zip
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
