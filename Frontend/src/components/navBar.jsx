import React from 'react';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { studentAuthStore } from '../store/studentAuthStore';
function NavBar() {
  const { studentUser } = studentAuthStore();
  return (
    <div className='w-screen top-0 bg-gradient-to-r from-slate-900 to-slate-950 fixed '>
      {/* Navbar Container */}
      <div className='h-[100px] w-full flex items-center justify-between px-6 backdrop-blur-xl relative '>
              <Link to='/'>
              <div className='flex items-center justify-between hover:scale-125 transition duration-200 '>
          <img src={logo} alt="Logo" className='w-20 h-20 rounded-full' />
          <h1 className='text-2xl text-white font-bold'>
            Edu<span className='text-blue-500'>Mantra</span>
          </h1>
                  </div>
        </Link>

        <div className='absolute left-1/2 transform -translate-x-1/2 px-8 py-3 bg-white/10 backdrop-blur-xl shadow-md ring-1 ring-white/20 rounded-full flex gap-10 text-white font-semibold text-xl'>
          <button className=' hover-underline-green hover:text-green-500 transition duration-200 cursor-pointer' aria-label="About">
            <h2>About</h2>
          </button>
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
            <h2>Logout</h2>
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
