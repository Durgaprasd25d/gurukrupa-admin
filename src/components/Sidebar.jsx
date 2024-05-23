import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col h-screen"> {/* Added h-screen class */}
      <div className="flex items-center justify-center h-16 border-b border-blue-800">
        <div className="text-2xl font-bold">Gurukrupa | Admin</div>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <Link to="/" className="flex items-center text-blue-300 hover:text-white">
              <span className="material-icons">dashboard</span>
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          {/* <li className="mb-4">
            <Link to="/get-student" className="flex items-center text-blue-300 hover:text-white">
              <span className="material-icons">group</span>
              <span className="ml-2">Students</span>
            </Link>
          </li> */}
          <li className="mb-4">
            <Link to="/add-student" className="flex items-center text-blue-300 hover:text-white">
              <span className="material-icons">school</span>
              <span className="ml-2">Add Student</span>
            </Link>
          </li>
          {/* <li className="mb-4">
            <Link to="/imageToBase64" className="flex items-center text-blue-300 hover:text-white">
              <span className="material-icons">school</span>
              <span className="ml-2">Generate Link</span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
