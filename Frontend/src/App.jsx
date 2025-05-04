import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { studentAuthStore } from "./api/studentAuthStore";
import { TeacherAuthStore } from "./api/teacherAuthStore";

import MainPage from './pages/mainPage';
import StudLogin from './pages/StudLogin';
import StudSignup from './pages/StudSignup';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import About from './pages/About';
import TeacherSignup from './Teacher/pages/signup';
import TeacherLogin from './Teacher/pages/Login';
import NavBar from './components/navBar';
import GradesPage from './pages/GradePage';
import AnnouncementPage from './pages/AnnouncementPage';
import Teacherdashboard from "./Teacher/component/dashboard";
import Hero from './pages/Hero';

function App() {
  return (
    <Router>
      <AppRoutes />
      <Toaster position="top-center" />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();
  const { studentUser, fetchStudentInfo } = studentAuthStore();
  const { teacherUser, fetchTeacherInfo } = TeacherAuthStore();

  useEffect(() => {
    fetchStudentInfo();
    fetchTeacherInfo();
  }, []);

  const isAuthenticated = studentUser || teacherUser;

  return (
    <>
      {/* Show NavBar only on non-dashboard routes */}
      {!location.pathname.startsWith("/dashboard") && !location.pathname.startsWith("/teacherDash") && <NavBar />}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Hero />} />

        {/* Student Routes */}
        <Route
          path="/stulogin"
          element={studentUser ? <Navigate to="/dashboard" replace /> : <StudLogin />}
        />
        <Route
          path="/stusignup"
          element={studentUser ? <Navigate to="/dashboard" replace /> : <StudSignup />}
        />
        <Route
          path="/stuProfile"
          element={studentUser ? <Profile /> : <Navigate to="/stulogin" replace />}
        />
        <Route path="/stuabout" element={<About />} />

        {/* Teacher Routes */}
        <Route
          path="/teachersignup"
          element={teacherUser ? <Navigate to="/teacherDash" replace /> : <TeacherSignup />}
        />
        <Route
          path="/teacherlogin"
          element={teacherUser ? <Navigate to="/teacherDash" replace /> : <TeacherLogin />}
        />
        <Route
          path="/teacherDash"
          element={teacherUser ? <Teacherdashboard /> : <Navigate to="/teacherlogin" replace />}
        />

        {/* Shared Authenticated Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/stulogin" replace />}
        />
        <Route
          path="/announcements"
          element={isAuthenticated ? <AnnouncementPage /> : <Navigate to="/stulogin" replace />}
        />
        <Route
          path="/grades"
          element={isAuthenticated ? <GradesPage /> : <Navigate to="/stulogin" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
