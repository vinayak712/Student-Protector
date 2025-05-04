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
import TeacherProfile from './Teacher/pages/TProfile';
import StudentCourses from './pages/courses';
import SharedDocumentsPage from './pages/SharedDocumentsPage';

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

  const isSidebarRoute = (path) => {
    const sidebarRoutes = [
      "/dashboard",
      "/courses",
      "/grades",
      "/Tprofile",
      "/anouc",
      "/doc",
      "/teacherDash"
    ];
    return sidebarRoutes.some(route => path.startsWith(path));
  };

  return (
    <>
      {/* Conditionally render NavBar */}
      {!isSidebarRoute(location.pathname) && <NavBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Hero />} />

        {/* Student Auth Routes */}
        <Route
          path="/stulogin"
          element={studentAuthStore.getState().studentUser ? <Navigate to="/dashboard" replace /> : <StudLogin />}
        />
        <Route
          path="/stusignup"
          element={studentAuthStore.getState().studentUser ? <Navigate to="/dashboard" replace /> : <StudSignup />}
        />
        <Route
          path="/stuProfile"
          element={studentAuthStore.getState().studentUser ? <Profile /> : <Navigate to="/stulogin" replace />}
        />
        <Route path="/stuabout" element={<About />} />

        {/* Teacher Auth Routes */}
        <Route
          path="/teachersignup"
          element={TeacherAuthStore.getState().teacherUser ? <Navigate to="/teacherDash" replace /> : <TeacherSignup />}
        />
        <Route
          path="/teacherlogin"
          element={TeacherAuthStore.getState().teacherUser ? <Navigate to="/teacherDash" replace /> : <TeacherLogin />}
        />
        <Route
          path="/teacherDash"
          element={TeacherAuthStore.getState().teacherUser ? <Teacherdashboard /> : <Navigate to="/teacherlogin" replace />}
        />

        {/* Authenticated Routes */}
        <Route
          path="/dashboard"
          element={studentAuthStore.getState().studentUser ? <Dashboard /> : <Navigate to="/stulogin" replace />}
        />
        <Route
          path="/grades"
          element={studentAuthStore.getState().studentUser ? <GradesPage /> : <Navigate to="/stulogin" replace />}
        />
        <Route
          path="/Tprofile"
          element={TeacherAuthStore.getState().teacherUser ? <TeacherProfile /> : <Navigate to="/teacherlogin" replace />}
        />
        <Route
          path="/courses"
          element={studentAuthStore.getState().studentUser ? <StudentCourses /> : <Navigate to="/stulogin" replace />}
        />
        <Route
          path="/anouc"
          element={TeacherAuthStore.getState().teacherUser ? <AnnouncementPage /> : <Navigate to="/teacherlogin" replace />}
        />
        <Route
          path="/doc"
          element={TeacherAuthStore.getState().teacherUser ? <SharedDocumentsPage /> : <Navigate to="/teacherlogin" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
