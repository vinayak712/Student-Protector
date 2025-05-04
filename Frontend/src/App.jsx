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
  }, [fetchStudentInfo, fetchTeacherInfo]);

  const isAuthenticated = studentUser || teacherUser;

  const ProtectedRoute = ({ isAuthenticated, redirectPath, children }) => {
    return isAuthenticated ? children : <Navigate to={redirectPath} replace />;
  };

  return (
    <>
      {/* Show NavBar only on non-dashboard routes */}
      {!location.pathname.startsWith("/dashboard") && !location.pathname.startsWith("/teacherDash") && <NavBar />}

      <Routes>
        <Route path="/" element={<MainPage />} />
<Route path='/login' element={<Hero/>}></Route>
        {/* Student routes */}
        <Route
          path="/stulogin"
          element={
            studentUser ? <Navigate to="/dashboard" replace /> : <StudLogin />
          }
        />
        <Route
          path="/stusignup"
          element={
            studentUser ? <Navigate to="/dashboard" replace /> : <StudSignup />
          }
        />
        <Route
          path="/stuProfile"
          element={
            studentUser ? <Profile /> : <Navigate to="/stulogin" replace />
          }
        />
        <Route path="/stuabout" element={<About />} />

        {/* Teacher routes */}
        <Route
          path="/teachersignup"
          element={
            teacherUser ? <Navigate to="/teacherDash" replace /> : <TeacherSignup />
          }
        />
        <Route
          path="/teacherlogin"
          element={
            teacherUser ? <Navigate to="/teacherDash" replace /> : <TeacherLogin />
          }
        />
        <Route
          path="/teacherDash"
          element={
            <ProtectedRoute isAuthenticated={teacherUser} redirectPath="/teacherlogin">
              <Teacherdashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirectPath="/stulogin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/announcements"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirectPath="/stulogin">
              <AnnouncementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grades"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirectPath="/stulogin">
              <GradesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;