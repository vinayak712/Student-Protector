import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { studentAuthStore } from "../api/studentAuthStore";

function StudLogin() {
  const [showP, setShowP] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    Login(formData);
  }
  
  const { Login, isLogin } = studentAuthStore();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 relative px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass p-8 rounded-2xl shadow-2xl border border-slate-700/50 relative z-10"
      >
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center mt-6 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Student Login
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-blue-400" /> 
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-blue-400" /> 
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-blue-400" /> 
                Password
              </label>
              <div className="relative">
                <input
                  type={showP ? "text" : "password"}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowP(!showP)}
                >
                  {showP ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center"
            >
              {isLogin ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>
        </motion.div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Dont have an account?{" "}
            <Link to="/stusignup">
              <span className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default StudLogin;