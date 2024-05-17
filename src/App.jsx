import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./components/Sidebar.jsx";
import MainContent from "./components/MainContent.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import GetStudent from "./pages/GetStudent.jsx";

const App = () => {
  return (
    <Router>
      <div className="flex bg-blue-50">
        <Sidebar />
        <div className="flex-1 overflow-auto"> {/* Added overflow-auto class */}
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/get-student" element={<GetStudent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
