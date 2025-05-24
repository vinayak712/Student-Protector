import { useEffect, useState } from "react";
import { studentAuthStore } from "../api/studentAuthStore";
import NavDash from "../components/navDash";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  const { studentInfo, fetchStudentInfo } = studentAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudentInfo();
      setIsLoading(false);
    };
    fetchData();
  }, [fetchStudentInfo]);

  if (isLoading || !studentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-500/30 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
      <NavDash />
      <div className="ml-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                Welcome back,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {studentInfo.name}
                </span>
              </h1>
              <p className="text-gray-400 mt-2 text-sm">Here’s your academic overview.</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 text-sm text-gray-300 shadow-sm">
              <Calendar className="text-blue-400 w-5 h-5" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </motion.header>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row"
          >
            <div className="relative h-36 md:h-auto md:w-1/3 bg-gradient-to-r from-blue-600 to-purple-600 flex items-end justify-center">
              <div className="absolute md:static -bottom-12 md:bottom-auto left-1/2 md:left-auto transform -translate-x-1/2 md:translate-x-0">
                <div className="w-24 h-24 rounded-full border-4 border-slate-800 shadow-lg overflow-hidden ring-2 ring-blue-400/40 bg-white">
                  <img
                    src={studentInfo.profile_pic || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="pt-16 md:pt-8 px-6 pb-6 flex-1">
              <h3 className="text-2xl font-semibold">{studentInfo.name}</h3>
              <p className="text-gray-400 text-sm">{studentInfo.email}</p>
               <p className="text-gray-400 text-sm">{studentInfo.usn}</p>
              <p className="text-purple-400 text-sm mt-1">
  Semester: {
    (() => {
      if (!studentInfo.usn) return "Unknown";
      const year = studentInfo.usn.slice(3, 5); // <-- FIXED
      if (year === "24") return 2;
      if (year === "23") return 4;
      if (year === "22") return 6;
      return "Unknown";
    })()
  }
</p>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Overall Progress</h4>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${studentInfo.progress || 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>Current Semester</span>
                  <span className="text-blue-400">
                    {studentInfo.progress || 0}% completed
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">Upcoming Deadlines</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              {studentInfo.deadlines && studentInfo.deadlines.length > 0 ? (
                studentInfo.deadlines.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-slate-700/30 p-3 rounded-lg">
                    <span>{item.title}</span>
                    <span className="text-blue-400">{item.date}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No upcoming deadlines.</li>
              )}
            </ul>
          </motion.section>

          {/* Announcements */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">Latest Announcements</h2>
            <div className="space-y-4 text-sm text-gray-300">
              <Link
                to="/doc"
                className="flex items-center gap-2 border-l-4 border-blue-500 pl-4 py-2 hover:bg-slate-700/40 rounded transition"
              >
                Click Here to View Announcements
              </Link>
            </div>
          </motion.section>

          {/* Quick Actions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <Link to="/doc" className="bg-blue-500/30 hover:bg-blue-500/40 text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                Announcement
              </Link>
              <Link to="/courses" className="bg-purple-500/30 hover:bg-purple-500/40 text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                Courses
              </Link>
              <Link to="/grades" className="bg-green-500/30 hover:bg-green-500/40 text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                Grades
              </Link>
              <Link to="/stuProfile" className="bg-yellow-500/30 hover:bg-yellow-500/40 text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                Profile
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
