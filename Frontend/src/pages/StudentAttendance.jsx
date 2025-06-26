import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get route parameters
import { axiosInstance } from "../lib/axios";

function StudentAttendance() {
  const { usn } = useParams(); // Get the USN from the route parameter
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axiosInstance.get(`/attendance/${usn}`);
        setAttendance(res.data.attendance);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "Failed to fetch attendance.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [usn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 flex items-center justify-center">
      <div className="max-w-lg w-full bg-slate-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Your Attendance</h1>
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-blue-300">USN: {usn}</p>
            <p className="text-4xl font-bold text-green-400 mt-4">{attendance}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentAttendance;