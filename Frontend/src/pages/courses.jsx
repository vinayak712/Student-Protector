import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import NavDash from '../components/navDash';

export default function StudentCourses() {
  const [courses, setCourses] = useState([
    { code: "DAA", name: "Design & Analysis of Algorithms" },
    { code: "MA201", name: "Advanced Mathematics" },
    { code: "DBMS", name: "Database Management Systems" },
    { code: "OS", name: "Operating Systems" },
    { code: "ADS", name: "Advanced Data Structures" },
    { code: "UHV", name: "Universal Human Values" },
    { code: "EH", name: "Ethical Hacking" },
    { code: "DV", name: "Data Visualization" },
    { code: "MORE", name: "More Courses Coming Soon" },
  ]);

  const [newCourse, setNewCourse] = useState({ code: "", name: "" });

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (newCourse.code.trim() && newCourse.name.trim()) {
      setCourses([...courses, newCourse]);
      setNewCourse({ code: "", name: "" });
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white overflow-x-hidden">
      <NavDash />
      <main className="ml-64 py-12 px-8">
        <h1 className="text-4xl font-extrabold mb-8">My Courses</h1>

        {/* Form to add course */}
        <form onSubmit={handleAddCourse} className="mb-10 flex flex-wrap gap-4 items-end">
          <input
            type="text"
            placeholder="Course Code"
            value={newCourse.code}
            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
            className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-white transition"
          >
            Add Course
          </button>
        </form>

        {/* Courses grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {courses.map(({ code, name }) => (
            <div
              key={code}
              className="bg-slate-800 bg-opacity-60 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-400 mr-2" />
                  <h2 className="text-2xl font-semibold">{code}</h2>
                </div>
                <p className="text-gray-300">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
