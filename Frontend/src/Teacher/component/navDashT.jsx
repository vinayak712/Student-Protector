import { useState} from "react";
// import logo from "../../src/assets/logo.png";
import logo from "../../assets/logo.png";

import { Link } from "react-router-dom";
 
import {
  Home,
  Settings,
  Calendar,
  User,
  LogOut,
  Menu,
    X,
    Users,
    File,
} from "lucide-react";
import { TeacherAuthStore } from "../../api/teacherAuthStore";
function NavDashT() {
  const [isOpen, setIsOpen] = useState(false);
  const { Logout } = TeacherAuthStore();
  const toggleSidebar = () => setIsOpen(!isOpen);
  function handle() {
    Logout();
  }
  return (
    <nav
      className={`h-screen ${
        isOpen ? "w-64" : "w-25"
      } bg-slate-900 transition-all duration-300 flex flex-col justify-between p-4 z-50 fixed left-0 top-0`}
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
            {isOpen ? <X  className="hover:text-red-600"/> : <Menu />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-3">
          <li>
        
            <Link to='/TProfile' className="text-white text-lg p-3 flex items-center gap-3 rounded-lg bg-slate-800 hover:bg-slate-700 hover:scale-105 transform transition-all duration-300">
            <img src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop' alt="Logo" className="w-12 h-12 rounded-full" />
              {isOpen && <span>Profile</span>}</Link>
          </li>
          <li>
            <Link
              to="/teacherDash"
              className="text-white text-lg p-3 flex items-center gap-3 rounded-lg bg-slate-800 hover:bg-slate-700 hover:scale-105 transform transition-all duration-300"
            >
              <Home />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/teacherDash"
              className="text-white text-lg p-3 flex items-center gap-3 rounded-lg bg-slate-800 hover:bg-slate-700 hover:scale-105 transform transition-all duration-300"
            >
          <Users/>
              {isOpen && <span>Students</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/doc"
              className="text-white text-lg p-3 flex items-center gap-3 rounded-lg bg-slate-800 hover:bg-slate-700 hover:scale-105 transform transition-all duration-300"
            >
              <User />
              {isOpen && <span>Annoucements</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/teacherDash"
              className="text-white text-lg p-3 flex items-center gap-3 rounded-lg bg-slate-800 hover:bg-slate-700 hover:scale-105 transform transition-all duration-300"
            >
              <Calendar />
              {isOpen && <span>Schedule</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/doc"
              className="text-white text-lg p-3 flex items-center gap-3 rounded-lg bg-slate-800 hover:bg-slate-700 hover:scale-105 transform transition-all duration-300"
            >
              <File/>
              {isOpen && <span>Documents</span>}
            </Link>
          </li>
        </ul>
      </div>

      {/* Settings & Logout */}
      <div className="flex flex-col gap-3">
        <Link
          to="/Tprofile"
          className="text-white text-lg p-3 flex items-center gap-3 rounded-lg bg-slate-800 hover:bg-slate-700 hover:scale-105 transform transition-all duration-300"
        >
          <Settings />
          {isOpen && <span>Settings</span>}
        </Link>
        <button
          onClick={handle}
          className="text-red-600 text-lg p-3 flex items-center gap-3 rounded-lg bg-slate-800 hover:bg-slate-700 hover:scale-105 transform transition-all duration-300"
        >
          <LogOut />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </nav>
  );
}

export default NavDashT;
