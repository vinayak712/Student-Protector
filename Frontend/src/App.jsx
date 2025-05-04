import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { studentAuthStore } from "./api/studentAuthStore";

import { teacherAuthStore } from "./api/teacherAuthStore";
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
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavDash from "./components/navDash";
import Teacherdashboard from "./Teacher/component/dashboard";
import { TeacherAuthStore } from "./api/teacherAuthStore";
function App() {
  return (
    <Router>
      <AppRoutes />
      <Toaster />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();
  const { studentUser, fetchStudentInfo } = studentAuthStore();
  const { teacherUser, fetchTeacherInfo } = teacherAuthStore();

  useEffect(() => {
    fetchStudentInfo();
    fetchTeacherInfo();
  }, [fetchStudentInfo, fetchTeacherInfo]);

  // Determine if user is authenticated and their role
  const isAuthenticated = studentUser || teacherUser;
  const isTeacher = teacherUser ? true : false;

  return (
    <>
      {!location.pathname.startsWith("/dashboard") && <NavBar />}
      <Toaster position="top-center" />
const { teacherUser}=TeacherAuthStore()
  return (
    <>
   
      {/* Only show NavBar on non-dashboard routes */}
      {!location.pathname.startsWith("/dashboard") && !location.pathname.startsWith("/teacherDash") && <NavBar />}

      <Routes>
        <Route path="/" element={<MainPage />} />
        
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
        
        {/* Teacher routes */}
        <Route path="/teachersignup" element={<TeacherSignup />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        
        {/* Protected routes for any authenticated user */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/stulogin" replace />
          }
        />
        <Route 
          path="/announcements" 
          element={
            isAuthenticated ? <AnnouncementPage /> : <Navigate to="/stulogin" replace />
          }
        />
        <Route 
          path="/grades" 
          element={
            isAuthenticated ? <GradesPage /> : <Navigate to="/stulogin" replace />
          }
        />
        
        {/* Public routes */}
        <Route path="/stuabout" element={<About />} />
        <Route path="/teachersignup" element={ teacherUser? <Navigate to='/teacherDash'/> : <TeacherSignup />}></Route>
        <Route path="/teacherlogin" element={ teacherUser?<Navigate to='/teacherDash'/>:<Login />}></Route>
        <Route path="/teacherDash" element={teacherUser ? <Teacherdashboard /> : <Navigate to='/teacherlogin' />}></Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;