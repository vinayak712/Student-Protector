import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { motion } from "framer-motion";
import { Search, Save } from "lucide-react";

function TeacherAttendance() {
  const [usn, setUsn] = useState("");
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState("");
  const [searchError, setSearchError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Search for a student by USN
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError("");
    setStudent(null);
    setSuccessMessage("");

    if (!usn.trim()) {
      setSearchError("Please enter a USN.");
      return;
    }

    try {
      const res = await axiosInstance.get(`/auth/byusn/${usn}`);
      setStudent(res.data);
    } catch (error) {
      setSearchError(
        error.response?.data?.message || "Student not found or server error."
      );
    }
  };

  // Submit attendance
const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccessMessage("");

  if (!attendance) {
    setSearchError("Please fill in the attendance.");
    return;
  }

  try {
    const res = await axiosInstance.post(`/attendance/update`, {
      usn,
      attendance:parseInt(attendance, 10),
    });
    setSuccessMessage(res.data.message || "Attendance updated successfully!");
    setAttendance("");
  } catch (error) {
    console.log(error)
    setSearchError(
      error.response?.data?.message || "Failed to submit data. Try again."
    );
  }
};
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
            Manage Attendance
          </h1>
          <p className="text-gray-400 mt-2">
            Search for a student and update their attendance.
          </p>
        </motion.header>

        {/* Search Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
            Search Student
          </h2>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="text"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              placeholder="Enter Student USN"
              className="px-4 py-2 rounded-lg border border-slate-600 bg-slate-900 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </form>
          {searchError && (
            <div className="mt-2 text-red-400">{searchError}</div>
          )}
          {student && (
            <div className="mt-4 bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-300">
                Student Details
              </h3>
              <div>
                <span className="font-semibold">Name:</span> {student.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {student.email}
              </div>
              <div>
                <span className="font-semibold">USN:</span> {student.usn}
              </div>
            </div>
          )}
        </motion.section>

        {/* Attendance Form */}
        {student && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
              Update Attendance
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                  Attendance (%)
                </label>
                <input
                  type="number"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  placeholder="Enter attendance percentage"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 transition-colors"
                  min="0"
                  max="100"
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Submit
              </button>
              {successMessage && (
                <div className="mt-4 text-green-400">{successMessage}</div>
              )}
            </form>
          </motion.section>
        )}
      </div>
    </div>
  );
}

export default TeacherAttendance;