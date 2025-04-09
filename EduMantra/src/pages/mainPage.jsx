import React from 'react'

function MainPage() {
  return (
      <>
          <div className='  bg-gradient-to-r from-slate-800 to-slate-950 h-screen w-screen flex items-center justify-center'>
              <div className='flex items-center justify-center flex-col'>
              <p className='text-2xl text-white text-center p-[10px]'>It's Time To Study</p>
                  <h1 className='text-white text-center text-6xl p-[10px]  animate-pulse font-bold'>Edu<span className='text-blue-400'>Mantra</span></h1>
                  <p className='text-white text-center p-[]20px] mt-10 text-xl font-light max-w-xl m-3'>Guidance, connection, and growth — all in one space.Where students find clarity and support, and mentors lead with purpose.A seamless journey toward academic excellence,crafted with care — welcome to <span className='animate-pulse text-2xl p-2'>Edu<span className='text-blue-400'>Mantra</span>.</span></p>
                  <button className='border-[2px] border-blue-500 text-3xl text-white  p-[40px] blueShadow duration-150 bg-slate-950 rounded-2xl mt-[50px] '>Get Started</button>
             </div>
          </div>
      </>
  )
}

export default MainPage