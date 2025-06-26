import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { studentAuthStore } from "../api/studentAuthStore";
import { teacherAuthStore } from "../api/teacherAuthStore";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student"); // Default to student
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { isAuthenticated, userRole, redirectToUserDashboard } = useAuth();
  
  const { Login: studentLogin, isLogin: isStudentLogin } = studentAuthStore();
  const { Login: teacherLogin, isLogin: isTeacherLogin } = teacherAuthStore();

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated) {
      redirectToUserDashboard();
    }
  }, [isAuthenticated, redirectToUserDashboard]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      if (role === "student") {
        await studentLogin(formData);
      } else {
        await teacherLogin(formData);
      }
      
      // Toast notification will be handled by the stores
    } catch (err) {
      setError(err.message || "An error occurred during login");
      toast.error(err.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 relative px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
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
            {role === "student" ? "Student Login" : "Teacher Login"}
          </h1>
          
          {/* Role selection toggle */}
          <div className="flex rounded-lg overflow-hidden mb-6 border border-slate-700">
            <button
              className={`flex-1 py-3 px-4 ${
                role === "student"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-gray-400 hover:bg-slate-700"
              } transition-colors focus:outline-none`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button
              className={`flex-1 py-3 px-4 ${
                role === "teacher"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-gray-400 hover:bg-slate-700"
              } transition-colors focus:outline-none`}
              onClick={() => setRole("teacher")}
            >
              Teacher
            </button>
          </div>
          
          {/* Error display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-200 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  required
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
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center"
            >
              {isSubmitting ? (
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
            <Link to={role === "student" ? "/stusignup" : "/teachersignup"}>
              <span className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                Sign up
              </span>
            </Link>
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            <Link to="/forgot-password" className="hover:text-gray-300 transition-colors">
              Forgot password?
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;