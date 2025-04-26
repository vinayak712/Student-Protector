import { useEffect } from "react";
import { studentAuthStore } from "../api/studentAuthStore";

function Dashboard() {
  const { studentInfo, fetchStudentInfo } = studentAuthStore();

  useEffect(() => {
    fetchStudentInfo(); // Fetch student info when the component mounts
  }, [fetchStudentInfo]);

  if (!studentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p>Loading student information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
            <img
              src={`http://localhost:7000${studentInfo.profile_pic}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{studentInfo.name}</h1>
            <p className="text-slate-400">{studentInfo.email}</p>
            <p className="text-slate-400">USN: {studentInfo.usn}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;