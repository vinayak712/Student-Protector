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
function App() {



  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<Hero />}></Route>
          <Route path='/stulogin' element={<StudLogin />}></Route>
          <Route path='/stusignup' element={<StudSignup />}></Route>
          <Route path='/stuProfile' element={<Profile />}></Route>
          <Route path='/stuabout' element={<About />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <Toaster />

    </>
  )
}

export default App
