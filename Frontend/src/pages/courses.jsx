// src/pages/StudentCourses.jsx
// import React from 'react';
import { BookOpen } from 'lucide-react';
import NavDash from '../components/navDash';

const courses = [
  { code: "DAA", name: "Design & Analysis of Algorithms" },
  { code: "MA201", name: "Advanced Mathematics" },
  { code: "DBMS", name: "Database Management Systems" },
  { code: "OS", name: "Operating Systems" },
  { code: "ADS", name: "Advanced Data Structures" },
  { code: "UHV", name: "Universal Human Values" },
  { code: "EH", name: "Ethical Hacking" },
  { code: "DV", name: "Data Visualization" },
  { code: "MORE", name: "More Courses Coming Soon" },
];

export default function StudentCourses() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed sidebar */}
      <NavDash />

      {/* Main content with left margin for sidebar */}
      <main className="ml-64 py-12 px-8">
        <h1 className="text-4xl font-extrabold mb-8">My Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {courses.map(({ code, name }) => (
            <div
              key={code}
              className="bg-slate-800 bg-opacity-60 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div>
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-400 mr-2" />
                  <h2 className="text-2xl font-semibold">{code}</h2>
                </div>
                <p className="text-gray-300">{name}</p>
              </div>

              {code !== "MORE" && (
                <button className="mt-6 self-end px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition">
                  View Details
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
