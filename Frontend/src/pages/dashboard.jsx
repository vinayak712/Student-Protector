import { useEffect, useState } from "react";
import { studentAuthStore } from "../api/studentAuthStore";
import { Menu, Home, Settings, Calendar, BarChart, User, Book, X } from "lucide-react";

function Dashboard() {
  const { studentInfo, fetchStudentInfo } = studentAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

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

  function toggleMenu() {
    setMenuOpen(prev => !prev);
  }

  return (
    <div className=" pt-[100px] min-h-screen bg-gradient-to-r from-slate-900 to-slate-950 relative">
      {/* Top Menu Button */}
      <div className="p-4">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <X className="text-white size-10" />
          ) : (
            <Menu className="text-white size-10" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-[100px] left-0 h-full bg-slate-900 shadow-lg transform transition-transform duration-300 ease-in-out
         ${menuOpen ? "translate-x-0" : "-translate-x-full"}
         w-64 p-6 z-50`}
      >
        {/* Close Button Inside Sidebar */}
        <button
          className="absolute top-4 right-4 text-white"
          onClick={toggleMenu}
        >
          <X className="size-10" />
        </button>

        <h1 className="text-2xl font-bold text-white mb-6 text-center">Facilities</h1>

        <div className="flex flex-col gap-4">
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition text-white bg-slate-800">
            <Home /> Dashboard
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition text-white bg-slate-800">
            <Book /> Courses
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition text-white bg-slate-800">
            <User /> Chats
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition text-white bg-slate-800">
            <BarChart /> Grades
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition text-white bg-slate-800">
            <Calendar /> Schedule
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition text-white bg-slate-800">
            <Settings /> Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
