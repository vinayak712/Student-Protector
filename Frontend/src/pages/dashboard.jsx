import { useEffect, useState } from "react";
import { studentAuthStore } from "../api/studentAuthStore";
import NavDash from "../components/navDash";

function Dashboard() {
  const { studentInfo, fetchStudentInfo } = studentAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchStudentInfo();
  }, [fetchStudentInfo]);

  if (!studentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p>Loading student information...</p>
      </div>
    );
  }

  return (
    <div className="pt-[100px] min-h-screen bg-gradient-to-r from-slate-900 to-slate-950 relative">
      
<NavDash/>
      {/* Main Content */}
      <div className="ml-64 flex items-center justify-center h-[calc(100vh-100px)] w-[calc(100%-16rem)]">
        <div className="text-center flex flex-col items-center justify-center space-y-8 animate-fadeIn">
          
          {/* Welcome Text */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight transition-all duration-700 animate-pulse">
            Welcome, {studentInfo.name}!
          </h1>

          {/* EduMantra Title */}
          <div className="border-4 border-blue-700 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-500">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Edu<span className="text-blue-500">Mantra</span>
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-400 tracking-wide animate-fadeIn">
            Select any facility from the menu and start exploring!
          </p>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
