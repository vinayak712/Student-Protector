import { useEffect, useState } from "react";
import { studentAuthStore } from "../api/studentAuthStore";
import NavDash from "../components/navDash";
import { motion } from "framer-motion";
import { Calendar, BookOpen, BarChart, Users, Clock, CheckCircle } from "lucide-react";

function Dashboard() {
  const { studentInfo, fetchStudentInfo } = studentAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchStudentInfo();
      setIsLoading(false);
    };
    
    fetchData();
  }, [fetchStudentInfo]);

  if (isLoading || !studentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-500/30 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Dummy data for visualization
  const courses = [
    { id: 1, name: "Advanced Mathematics", progress: 78, instructor: "Dr. Johnson" },
    { id: 2, name: "Computer Science Fundamentals", progress: 92, instructor: "Prof. Williams" },
    { id: 3, name: "Data Structures", progress: 65, instructor: "Dr. Miller" },
  ];
  
  const upcomingEvents = [
    { id: 1, title: "Mid-term Exam", date: "May 15, 2025", time: "10:00 AM", type: "exam" },
    { id: 2, title: "Group Project Submission", date: "May 20, 2025", time: "11:59 PM", type: "assignment" },
    { id: 3, title: "Career Counseling Session", date: "May 25, 2025", time: "2:00 PM", type: "meeting" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
      <NavDash />
      
      <div className="ml-24 md:ml-64 p-6 pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <header className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{studentInfo.name}</span>
                  </h1>
                  <p className="text-gray-400 mt-1">Hi what is happening with your academic journey today</p>
                </div>
                
                <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                  <Calendar className="text-blue-400 w-5 h-5" />
                  <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </motion.div>
          </header>
          
          {/* Stats Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 rounded-2xl border border-blue-500/30 shadow-lg hover:shadow-blue-500/10 transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Enrolled Courses</p>
                  <h3 className="text-3xl font-bold text-white mt-1">5</h3>
                </div>
                <div className="bg-blue-500/30 p-3 rounded-xl">
                  <BookOpen className="text-blue-300 w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-6 rounded-2xl border border-purple-500/30 shadow-lg hover:shadow-purple-500/10 transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Average Grade</p>
                  <h3 className="text-3xl font-bold text-white mt-1">A-</h3>
                </div>
                <div className="bg-purple-500/30 p-3 rounded-xl">
                  <BarChart className="text-purple-300 w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 rounded-2xl border border-green-500/30 shadow-lg hover:shadow-green-500/10 transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Attendance</p>
                  <h3 className="text-3xl font-bold text-white mt-1">92%</h3>
                </div>
                <div className="bg-green-500/30 p-3 rounded-xl">
                  <Users className="text-green-300 w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 p-6 rounded-2xl border border-amber-500/30 shadow-lg hover:shadow-amber-500/10 transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-300 text-sm">Upcoming Events</p>
                  <h3 className="text-3xl font-bold text-white mt-1">3</h3>
                </div>
                <div className="bg-amber-500/30 p-3 rounded-xl">
                  <Calendar className="text-amber-300 w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Profile Card and Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1 bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden"
            >
              <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="absolute -bottom-12 left-6">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-800 overflow-hidden">
                    <img 
                      src={studentInfo.profile_pic || "https://via.placeholder.com/150"} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-14 px-6 pb-6">
                <h3 className="text-xl font-semibold">{studentInfo.name}</h3>
                <p className="text-gray-400 text-sm">{studentInfo.email}</p>
                <p className="text-blue-400 text-sm mt-1">{studentInfo.usn}</p>
                
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Overall Progress</h4>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">Current Semester</span>
                    <span className="text-xs text-blue-400">78% completed</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-2 bg-slate-800/50 rounded-2xl border border-slate-700 p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Current Courses</h3>
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="bg-slate-800 rounded-xl p-4 hover:bg-slate-800/80 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-white">{course.name}</h4>
                        <p className="text-sm text-gray-400">{course.instructor}</p>
                      </div>
                      <span className="text-sm font-semibold px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="mt-3 w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Upcoming Events */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-slate-800 rounded-xl p-4 hover:bg-slate-800/80 transition-colors border border-slate-700">
                  <div className="flex items-start justify-between">
                    <div className="bg-slate-700/50 p-2 rounded-lg">
                      {event.type === 'exam' ? (
                        <BookOpen className="w-5 h-5 text-red-400" />
                      ) : event.type === 'assignment' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Users className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                      event.type === 'exam' 
                        ? 'bg-red-500/20 text-red-400' 
                        : event.type === 'assignment'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  
                  <h4 className="mt-3 font-medium text-white">{event.title}</h4>
                  <div className="mt-2 flex items-center text-sm text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{event.date}</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;