import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, BookOpen, Users } from "lucide-react";

function MainPage() {
  return (
    <div className='min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900'>
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-screen filter blur-[80px] opacity-70 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-violet-500/30 rounded-full mix-blend-screen filter blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-screen filter blur-[80px] opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-20 h-20 border-2 border-blue-500/20 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 border-2 border-purple-500/20 rounded-full"></div>
      <div className="absolute top-1/2 left-10 w-6 h-6 bg-blue-500/50 rounded-full"></div>
      <div className="absolute bottom-1/3 right-10 w-4 h-4 bg-purple-500/50 rounded-full"></div>
      
      {/* Content Layer with enhanced animations */}
      <div className='relative z-10 h-screen flex items-center justify-center flex-col px-6 max-w-7xl mx-auto'>
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20"
          >
            <Sparkles className="text-indigo-400 h-4 w-4" />
            <span className="text-indigo-300 text-sm font-medium">The future of education is here</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
              Edu<span className="text-white">Mantra</span>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-xl text-center max-w-3xl text-gray-300 leading-relaxed"
          >
            Revolutionizing education with personalized learning experiences. 
            Connect with mentors, track progress, and achieve your academic goals 
            in one seamless platform.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10"
          >
            <Link to='/login'>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all"
              >
                Begin Your Journey
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link to='/stuabout'>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-gray-600 rounded-full text-gray-300 font-semibold hover:bg-gray-800/50 transition-all"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="glass p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <BookOpen className="text-blue-400 mb-4 h-8 w-8" />
            <h3 className="text-xl font-semibold mb-2 text-white">Personalized Learning</h3>
            <p className="text-gray-300">Tailored educational experiences to meet your unique needs and goals.</p>
          </div>
          
          <div className="glass p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <Users className="text-purple-400 mb-4 h-8 w-8" />
            <h3 className="text-xl font-semibold mb-2 text-white">Expert Mentorship</h3>
            <p className="text-gray-300">Connect with experienced mentors who guide your academic journey.</p>
          </div>
          
          <div className="glass p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <Sparkles className="text-pink-400 mb-4 h-8 w-8" />
            <h3 className="text-xl font-semibold mb-2 text-white">Track Progress</h3>
            <p className="text-gray-300">Monitor your achievements and growth with intuitive analytics.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MainPage;