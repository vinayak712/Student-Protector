import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainPage from "./pages/mainPage";
import Hero from "./pages/Hero";
import StudLogin from "./pages/StudLogin";
import StudSignup from "./pages/StudSignup";
import Profile from "./pages/profile";
import About from "./pages/About";
import NavBar from "./components/navBar";
import GradesPage from "./pages/GradePage";
import Dashboard from "./pages/dashboard";
import { studentAuthStore } from "./api/studentAuthStore";
import NavDash from "./components/navDash";
import TeacherSignup from "./Teacher/pages/signup";
import Login from "./Teacher/Pages/login";
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
  const { studentUser } = studentAuthStore();
  const location = useLocation();
const { teacherUser}=TeacherAuthStore()
  return (
    <>
   
      {/* Only show NavBar on non-dashboard routes */}
      {!location.pathname.startsWith("/dashboard") && !location.pathname.startsWith("/teacherDash") && <NavBar />}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={
            studentUser ? <Navigate to="/dashboard" replace /> : <Hero />
          }
        />
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
        <Route
          path="/dashboard"
          element={
            studentUser ? <Dashboard /> : <Navigate to="/stulogin" replace />
          }
        />
        <Route path="/teachersignup" element={ teacherUser? <Navigate to='/teacherDash'/> : <TeacherSignup />}></Route>
        <Route path="/teacherlogin" element={ teacherUser?<Navigate to='/teacherDash'/>:<Login />}></Route>
        <Route path="/teacherDash" element={teacherUser ? <Teacherdashboard /> : <Navigate to='/teacherlogin' />}></Route>
       
      </Routes>
    </>
  );
}

export default App;
