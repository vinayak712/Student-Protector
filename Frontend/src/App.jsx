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
import Dashboard from "./pages/dashboard";
import { studentAuthStore } from "./api/studentAuthStore";
import NavDash from "./components/navDash";
import TeacherLogin from "./Teacher/Pages/login";
import TeacherSignup from "./Teacher/pages/signup";
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

  return (
    <>
      {/* Only show NavBar on non-dashboard routes */}
       {!location.pathname.startsWith("/dashboard") && <NavBar />}

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
        <Route path="/teacherlogin" element={<TeacherLogin />}></Route>
        <Route path="/teachersignup" element={<TeacherSignup/>}></Route>
      </Routes> 
    </>
  );
}

export default App;
