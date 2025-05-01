import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { studentAuthStore } from '../api/studentAuthStore';
function NavBar() {
  const { studentUser, Logout } = studentAuthStore();
  function handle() {
    Logout();
  }
  return (
    <div className='w-screen top-0  fixed  z-50'>
      {/* Navbar Container */}
      <div className='h-[100px] w-full flex items-center justify-between px-6 backdrop-blur-2xl relative '>
        <Link to='/'>
          <div className='flex items-center justify-between hover:scale-125 transition duration-200 '>
            <img src={logo} alt="Logo" className='w-20 h-20 rounded-full' />
            <h1 className='text-2xl text-white font-bold'>
              Edu<span className='text-blue-500'>Mantra</span>
            </h1>
          </div>
        </Link>

        <div className='absolute left-1/2 transform -translate-x-1/2 px-8 py-3 backdrop-blur-3xl shadow-md ring-1 rounded-full flex gap-10 text-white font-semibold text-xl'>
          <Link to='/stuabout'>
            <button className=' hover-underline-green hover:text-green-500 transition duration-200 cursor-pointer' aria-label="About">
              <h2>About</h2>
            </button>
          </Link>
          <button className=' hover-underline-green hover:text-green-500 transition duration-200 cursor-pointer' aria-label="Contact">
            <h2>Contact</h2>
          </button>
          {studentUser ?
            (
              <>
                <Link to='/stuProfile'>
                  <button className=' hover-underline-green hover:text-green-500 transition duration-200 cursor-pointer' aria-label="Profile">
                    <h2>Profile</h2>
                  </button></Link>

                <button className=' hover-underline-green hover:text-green-500 transition duration-200 cursor-pointer' aria-label="Logout">
                  <h2 onClick={handle}>Logout</h2>
                </button>
              </>
            ) : (
              <>
              
                <Link to='/stulogin'>
                  <button className='hover-underline-green hover:text-green-500 transition duration-200 cursor-pointer' aria-label="Login">
                    <h2>Login</h2>
                  </button>
                </Link>

                <Link to='/stusignup'>
                  <button className='hover-underline-green hover:text-green-500 transition duration-200 cursor-pointer' aria-label="Signup">
                    <h2>Signup</h2>
                  </button>
                </Link>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
