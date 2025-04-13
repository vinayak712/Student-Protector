import { PiStudentBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Hero() {
 
  return (
      <>
          <div className=' bg-gradient-to-r from-slate-900 to-slate-950 h-screen w-screen flex items-center justify-center'>
              <div className='text-white flex  gap-20  '>
                  <Link to="/stulogin">
                      <button>
                      <div className='w-[350px] h-[250px] bg-slate-950  rounded-2xl border-[2px] flex items-center  justify-center  flex-col gap-5 blueShadow'>
                 <p className='text-4xl'>< PiStudentBold /></p>
                      <h1 className='text-4xl text-blue-500'>Student</h1>
                      <p className='text-center text-xl '>Login as a student to explore course materials and assignments.</p>
                  </div>
                  </button>
                  </Link>
                  <button>
                  <div className='w-[350px] h-[250px] bg-slate-950  rounded-2xl border-[2px] flex items-center  justify-center flex-col gap-5 blueShadow'>
                 <p className='text-4xl'>< FaUsers /></p>
                      <h1 className='text-4xl text-blue-500'>Teacher</h1>
                      <p className='text-center text-xl '>Login as a teacher to create courses, assignments, and track student progress.</p>
                  </div>
                 </button>
                  
          </div>
          
          </div>
        
      </>
  )
}

export default Hero;