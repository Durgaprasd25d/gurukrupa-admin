import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import GetStudent from "./pages/GetStudent.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const App = () => {
  return (
    <Router>
      <div className="flex bg-blue-50">
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/get-student" element={<GetStudent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
