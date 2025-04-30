import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainPage from './pages/mainPage';
import Hero from './pages/Hero';
import StudLogin from './pages/StudLogin';
import StudSignup from './pages/StudSignup';
import Profile from './pages/profile';
import About from './pages/About';
import NavBar from './components/navBar';
import Dashboard from './pages/dashboard';
import { studentAuthStore } from './api/studentAuthStore';
import NavDash from './components/navDash';

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
      {/* Conditionally render NavBar based on the route not want in dashboard */}
      {location.pathname !== '/dashboard' && <NavBar />}
      
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={studentUser ? <Dashboard /> : <Hero />} />
        <Route path='/stulogin' element={studentUser ? <Dashboard /> : <StudLogin />} />
        <Route path='/stusignup' element={studentUser ? <Dashboard /> : <StudSignup />} />
        <Route path='/stuProfile' element={studentUser ? <Profile /> : <Hero />} />
        <Route path='/stuabout' element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
