import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ClipboardCheck, School, HeartHandshake } from 'lucide-react';

function About() {
  return (
    <div className='min-h-screen w-screen pt-[50px] bg-gradient-to-r from-slate-900 to-slate-950 flex items-center justify-center text-white'>
      <div className='flex flex-col gap-8 bg-slate-950 w-[90%] max-w-4xl rounded-2xl border-[2px] border-slate-800 p-8'>

        <h1 className='text-5xl font-bold text-green-500 text-center animate-pulse'>
          About <span className='text-blue-500 animate-colors'>Us</span>
        </h1>

        <section className='text-lg leading-relaxed animate__animated animate__fadeIn animate__delay-1s'>
          <p>
            Welcome to the <span className="text-green-400 font-semibold">Student Proctor Management System</span> — a platform built to simplify and enhance the academic 🎓 mentoring process for students and proctors alike.
          </p>
        </section>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>

          <div className='bg-slate-800 p-6 rounded-2xl border border-slate-700 transform transition-transform duration-500 hover:scale-105'>
            <div className='flex items-center gap-3 mb-2'>
              <Users className='text-green-400' />
              <h3 className='text-xl font-semibold'>Who We Are</h3>
            </div>
            <p>We are a group of passionate developers and educators committed to improving student support using smart technology 💻.</p>
          </div>

          <div className='bg-slate-800 p-6 rounded-2xl border border-slate-700 transform transition-transform duration-500 hover:scale-105'>
            <div className='flex items-center gap-3 mb-2'>
              <ClipboardCheck className='text-green-400' />
              <h3 className='text-xl font-semibold'>What We Offer</h3>
            </div>
            <ul className='list-disc list-inside'>
              <li>Track academic progress 📈 </li>
              <li>Monitor student 🎓 wellbeing</li>
              <li>Facilitate proctor meetings</li>
              <li>Generate reports 📑 for faculty</li>
            </ul>
          </div>

          <div className='bg-slate-800 p-6 rounded-2xl border border-slate-700 transform transition-transform duration-500 hover:scale-105'>
            <div className='flex items-center gap-3 mb-2'>
              <School className='text-green-400' />
              <h3 className='text-xl font-semibold'>Our Vision</h3>
            </div>
            <p>To empower institutions🎓 with a seamless, digital 💻 proctoring system that strengthens the student-mentor relationship ❤️.</p>
          </div>

          <div className='bg-slate-800 p-6 rounded-2xl border border-slate-700 transform transition-transform duration-500 hover:scale-105'>
            <div className='flex items-center gap-3 mb-2'>
              <HeartHandshake className='text-green-400' />
              <h3 className='text-xl font-semibold'>Team Spirit</h3>
            </div>
            <p>Built with ❤️ by students and faculty who understand the importance of mentorship and guidance in education 🎓.</p>
          </div>
        </div>

        <p className='text-center text-sm pt-4 border-t border-slate-700'>
          © {new Date().getFullYear()} EduMantra — All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default About;
