import React from "react";

const ProfileCard = ({ student }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg max-w-sm mx-auto">
      <img
        className="w-24 h-24 rounded-full object-cover"
        src={student.profileImage} 
        alt={student.name}
      />
      <h2 className="mt-4 text-xl font-semibold">{student.name}</h2>
      <p className="text-gray-500">Registration No: {student.registrationNo}</p>
      <p className="text-gray-500">Course: {student.course}</p>
      <p className="text-gray-500">
        Date of Admission: {student.dateOfAdmission}
      </p>
      <p className="text-gray-500">Course Duration: {student.courseDuration}</p>
      <p className="text-gray-500">Date of Birth: {student.dateOfBirth}</p>
      <p className="text-gray-500">Mother's Name: {student.mothersName}</p>
      <p className="text-gray-500">Father's Name: {student.fathersName}</p>
      <p className="text-gray-500">Address: {student.address}</p>
      <p className="text-gray-500">Grade: {student.grade}</p>
      {/* <div className="flex mt-4">
      
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
          Connect
        </button>
      </div> */}
    </div>
  );
};

export default ProfileCard;
