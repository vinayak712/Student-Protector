import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { motion } from "framer-motion";

function StudentAttendance() {
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axiosInstance.get(`/student/attendance`);
        setAttendance(res.data.attendance);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch attendance."
        );
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight">
            Your Attendance
          </h1>
          <p className="text-gray-400 mt-2">
            View your current attendance percentage.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-md text-center"
        >
          {error ? (
            <div className="text-red-400">{error}</div>
          ) : attendance !== null ? (
            <div>
              <h2 className="text-2xl font-bold text-blue-300">
                Attendance: {attendance}%
              </h2>
            </div>
          ) : (
            <div className="text-gray-400">Loading...</div>
          )}
        </motion.section>
      </div>
    </div>
  );
}

export default StudentAttendance;