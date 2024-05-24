import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainContent from "./components/MainContent";
import AddStudent from "./pages/AddStudent";
import GetStudent from "./pages/GetStudent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateStudent from "./pages/UpdateStudent";
import StudentProfile from "./pages/StudentProfile";
import ProtectedRoute from "../context/ProtectedRoute";
import AuthProvider from "../context/AuthContext";
import useAuth from "../context/useAuth";
import CreateExam from "../src/pages/CreateExam.jsx";
import GetExam from "../src/pages/GetExams.jsx";
import CreateQuestion from "./pages/CreateQuestion.jsx";
import UpdateExam from "./pages/UpdateExam.jsx";
import ExamDetails from "./pages/ExamDetails.jsx";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-student"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-student"
            element={
              <ProtectedRoute>
                <GetStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-student/:id"
            element={
              <ProtectedRoute>
                <UpdateStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-profile/:id"
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/exam" element={<CreateExam />} />
          <Route path="/get-exam" element={<GetExam />} />
          <Route path="/edit-exam/:id" element={<UpdateExam />} />
          <Route path="/exam-details/:id" element={<ExamDetails />} />
          <Route path="/question" element={<CreateQuestion />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
