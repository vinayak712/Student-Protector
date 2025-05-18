import { useEffect, useState } from "react";
import { TeacherAuthStore } from "../../api/teacherAuthStore";
import NavDashT from "./navDashT";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

function Teacherdashboard() {
  const { teacherInfo, fetchTeacherInfo, teacherUser } = TeacherAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTeacherInfo();
      setIsLoading(false);
    };
    fetchData();
  }, [fetchTeacherInfo]);

  if (isLoading || !teacherUser || !teacherInfo) {
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
      <NavDashT />
      <div className="ml-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-10">
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
                  {teacherInfo.name}
                </span>
              </h1>
              <p className="text-gray-400 mt-2 text-sm">Here’s your teaching overview.</p>
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
          {/* Teacher-specific dashboard content */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">Teacher Dashboard</h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-300 text-lg mb-4"
            >
              Welcome to your dashboard.
            </motion.p>
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
              className="mt-10"
            >
              <h2 className="text-xl font-semibold mb-6 text-white">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <Link
                  to="/anouc"
                  className="bg-blue-500/40 hover:bg-blue-600/60 text-white text-lg py-6 px-6 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  Announcement
                </Link>
                <Link
                  to="/Tprofile"
                  className="bg-yellow-500/40 hover:bg-yellow-600/60 text-white text-lg py-6 px-6 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  Profile
                </Link>
                <Link
                  to="/doc"
                  className="bg-purple-500/40 hover:bg-purple-600/60 text-white text-lg py-6 px-6 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  Document
                </Link>
               
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default Teacherdashboard;