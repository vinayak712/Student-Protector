
import MainPage from './pages/mainPage'
import Hero from './pages/Hero'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StudLogin from './pages/StudLogin'
import StudSignup from './pages/StudSignup'
import Profile from './pages/profile'
import NavBar from './components/navBar'
function App() {
  


  return (
    <>
      <Router>
      <NavBar/>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<Hero />}></Route>
          <Route path='/stulogin' element={<StudLogin />}></Route>
          <Route path='/stusignup' element={<StudSignup />}></Route>
          <Route path='/stuProfile' element={  <Profile/>}></Route>
        </Routes>
     </Router>
    
    
    </>
  )
}

export default App
