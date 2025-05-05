// src/components/NavDash.jsx
import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {
  Home,
  Settings,
  Calendar,
  BarChart,
  User,
  Book,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { studentAuthStore } from "../api/studentAuthStore";
function NavDash() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const { studentUser, Logout } = studentAuthStore();
  function handle() {
    Logout();
  }
  return (
    <nav
      className={`h-screen ${
        isOpen ? "w-64" : "w-20"
      } bg-slate-900 transition-all duration-300 fixed left-0 top-0 flex flex-col justify-between p-4 z-50`}
    >
      {/* Logo + Toggle */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
            {isOpen && (
              <h1 className="text-2xl text-white font-bold">
                Edu<span className="text-blue-500">Mantra</span>
              </h1>
            )}
          </div>
          <button onClick={toggleSidebar} className="text-white">
            {isOpen ? <X className="hover:text-red-600" /> : <Menu />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-3">
          <li>
            <Link
              to="/stuProfile"
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition transform hover:scale-105"
            >
              <User className="text-white" />
              {isOpen && <span className="text-white">Profile</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition transform hover:scale-105"
            >
              <Home className="text-white" />
              {isOpen && <span className="text-white">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition transform hover:scale-105"
            >
              <Book className="text-white" />
              {isOpen && <span className="text-white">Courses</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition transform hover:scale-105"
            >
              <User className="text-white" />
              {isOpen && <span className="text-white">Chats</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/doc"
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition transform hover:scale-105"
            >
              <Calendar className="text-white" />
              {isOpen && <span className="text-white">Announcement</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/grades"
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition transform hover:scale-105"
            >
              <BarChart className="text-white" />
              {isOpen && <span className="text-white">Grades</span>}
            </Link>
          </li>
        </ul>
      </div>

      {/* Settings & Logout */}
      <div className="flex flex-col gap-3">
        <Link
          to="/stuProfile"
          className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition transform hover:scale-105"
        >
          <Settings className="text-white" />
          {isOpen && <span className="text-white">Settings</span>}
        </Link>
        <button
          onClick={handle}
          className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition transform hover:scale-105 text-red-600"
        >
          <LogOut />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </nav>
  );
}

export default NavDash;
