import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Particles from "../components/ui/particle";

function MainPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 relative px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={300}
          particleSpread={15}
          speed={0.2}
          particleColors={["#4f46e5", "#8b5cf6", "#3b82f6"]}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
          alphaParticles={true}
          particleBaseSize={4}
          sizeRandomness={1.2}
          enableGlow={true}
          glowSize={12}
        />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl glass p-8 lg:p-14 rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-md bg-slate-800/20 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-medium text-blue-300 mb-3"
          >
            WELCOME TO THE FUTURE OF EDUCATION
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Edu<span className="text-white">Mantra</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-8"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Guidance, connection, and growth — all in one space. Where students
            find clarity and support, and mentors lead with purpose. A seamless
            journey toward academic excellence, crafted with care.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <Link to="/login" className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 text-lg"
              >
                Get Started
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/stuabout" className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full md:w-auto bg-transparent border border-slate-500 hover:border-blue-400 text-white py-4 px-8 rounded-lg font-semibold transition-all text-lg"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-10 text-center text-sm text-gray-400"
          >
            <p>Already a member? <Link to="/login" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Sign In</Link></p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default MainPage;