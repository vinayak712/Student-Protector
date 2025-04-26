import MainPage from './pages/mainPage'
import { Toaster } from 'react-hot-toast';
import Hero from './pages/Hero'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StudLogin from './pages/StudLogin'
import StudSignup from './pages/StudSignup'
import Profile from './pages/profile'
import About from './pages/About'
import NavBar from './components/navBar'
import Dashboard from './pages/dashboard';
import { studentAuthStore } from './api/studentAuthStore';

function App() {
  const { studentUser } = studentAuthStore();

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={studentUser?<Dashboard/>:<Hero />}></Route>
          <Route path='/stulogin' element={studentUser?<Dashboard/>:<StudLogin/>}></Route>
          <Route path='/stusignup' element={studentUser?<Dashboard/>:<StudSignup />}></Route>
          <Route path='/stuProfile' element={studentUser?<Profile />:<Hero/>}></Route>
          <Route path='/stuabout' element={<About />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <Toaster />

    </>
  )
}

export default App
