import { PiStudentBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-950 min-h-screen w-full flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20">
        <Link to="/stulogin" className="group">
          <div className="w-[320px] h-[250px] bg-slate-950/80 rounded-2xl border-2 border-slate-800 flex flex-col items-center justify-center gap-5 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-blue-500 group-hover:shadow-blue-500/30 cursor-pointer backdrop-blur-md">
            <span className="text-5xl text-blue-400 group-hover:text-blue-500 transition">
              <PiStudentBold />
            </span>
            <h1 className="text-3xl font-bold text-blue-500 group-hover:text-blue-400 transition">
              Student
            </h1>
            <p className="text-center text-lg text-slate-300 px-4">
              Login as a student to explore course materials and assignments.
            </p>
          </div>
        </Link>
        <Link to="/teacherlogin" className="group">
          <div className="w-[320px] h-[250px] bg-slate-950/80 rounded-2xl border-2 border-slate-800 flex flex-col items-center justify-center gap-5 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-blue-500 group-hover:shadow-blue-500/30 cursor-pointer backdrop-blur-md">
            <span className="text-5xl text-blue-400 group-hover:text-blue-500 transition">
              <FaUsers />
            </span>
            <h1 className="text-3xl font-bold text-blue-500 group-hover:text-blue-400 transition">
              Teacher
            </h1>
            <p className="text-center text-lg text-slate-300 px-4">
              Login as a teacher to create courses, assignments, and track
              student progress.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
