import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { FaEye, FaEyeSlash, FaRegBuilding } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://grtc-new-node-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          data.errors.forEach((error) => toast.error(error.msg));
        } else {
          toast.error("Registration failed");
        }
      } else {
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Server error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-900 px-6">
      <div className="bg-gray-50 rounded-2xl shadow-lg max-w-lg w-full p-10 transform transition-all hover:shadow-2xl">
        <div className="text-center">
          <FaRegBuilding className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-bold text-indigo-800">Create Account</h2>
          <p className="text-sm text-gray-600 mb-6">Join us today!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <div className="flex items-center mt-1">
              <HiOutlineMail className="absolute left-3 text-indigo-500" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 shadow-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="flex items-center mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 shadow-sm"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-indigo-500 hover:text-indigo-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
