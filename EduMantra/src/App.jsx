
import MainPage from './pages/mainPage'
import Hero from './pages/Hero'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StudLogin from './pages/StudLogin'
function App() {
  


  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={ <Hero/>}></Route>
        </Routes>
     </Router> */}
      <StudLogin/>
    </>
  )
}

export default App
