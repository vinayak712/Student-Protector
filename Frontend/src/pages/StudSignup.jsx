import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";

function StudSignup() {
    const [showP, setShowP] = useState(false);
    const[FormData, setFormdata] = useState( {
        name:"",
        email: "",
password:"",
    })
  return (
      <>
         <div className='min-h-screen w-screen pt-[50px]    bg-gradient-to-r from-slate-900 to-slate-950 flex
          items-center justify-center'>
              <div className='flex  flex-col items-center gap-10  justify-center bg-slate-950  w-[650px] h-[680px] rounded-2xl border-[2px] text-white' >
                  
                  <h1 className=' text-5xl  animate-pulse font-bold text-green-500'> Student <span className='text-blue-500'>Signup</span></h1>
                  
            
                  <form action="" className='flex gap-6  flex-col w-full p-6'>
                      <label className='text-2xl flex items-center gap-x-3 '> Name <User className='text-green-500' /></label>
                
                      <input type="text" name="" id="" className=' input p-3 w-full bg-slate-800  rounded-2xl outline-none focus:ring-2 focus:ring-green-500'
                          placeholder='Enter your name'
                      value={FormData.name} onChange={(e)=>{setFormdata({...FormData,name:e.target.value})}}/>   
                      
                      <label className='text-2xl flex items-center gap-x-3 '> Email <Mail className='text-green-500' /></label>
                
                <input type="email" name="" id="" className=' input p-3 w-full bg-slate-800  rounded-2xl outline-none focus:ring-2 focus:ring-green-500'
                          placeholder='example@gmail.com'
                          value={FormData.email} onChange={(e) => {
                              setFormdata({ ...Formdata, email: e.target.value })
                      }}
                      />

                      <label className='text-2xl flex items-center gap-x-3 '> Password <Lock className='text-green-500' /></label>
                
                      <div className='relative w-full'>
                          
                      <input type={showP?"text":"password"} className=' input p-3 pr-12 w-full bg-slate-800  rounded-2xl outline-none focus:ring-2 focus:ring-green-500'
                              placeholder='*********'
                              value={FormData.password}
                              onChange={(e) => {
                                  setFormdata({...Formdata,password:e.target.value})
                              }}
                          /> 
                          <button type='button' className='absolute inset-y-0 right-4 flex items-center' onClick={() => {
                              setShowP(!showP);
                          }}>
                              {showP?(<EyeOff className='size-5 text-green-500'/>):(<Eye className="size-5 text-green-500"/>)}
                              
                      </button>
                      </div>    
                  </form>
            <button className='text-2xl bg-green-500   w-[80%] rounded-2xl py-3 px-3  p-4  border-[2px]  hover:bg-green-700 transition-all duration-300 '>Submit</button>
<p>Already have a account?👉 <Link to="/stulogin"><span className='text-green-500 text-lg'>Login</span></Link> </p>
              </div>
      </div>
      </>
  )
}

export default StudSignup