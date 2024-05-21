import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import GetStudent from "./pages/GetStudent.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UpdateStudent from "./pages/UpdateStudent.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
// import Base64 from "./pages/Utils.jsx";

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
            <Route path="/edit-student/:id" element={<UpdateStudent />} />
            <Route path="/student-profile/:id" element={<StudentProfile />} />
            {/* <Route path="/imageToBase64" element={<Base64 />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
