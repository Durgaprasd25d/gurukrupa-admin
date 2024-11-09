import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaRegBuilding } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Loader from "../components/Loader";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://grtc-new-node-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          data.errors.forEach((error) => toast.error(error.msg));
        } else {
          toast.error("Login failed");
        }
        throw new Error("Login failed");
      } else {
        const token = data.token;
        login(token);
        toast.success("Login Success");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
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
          <h2 className="text-2xl font-bold text-indigo-800">Welcome Back</h2>
          <p className="text-sm text-gray-600 mb-6">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
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
                className="absolute right-3 text-indigo-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
            }`}
          >
            {loading ? <Loader /> : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
