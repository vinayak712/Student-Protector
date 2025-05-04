import { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader, Upload, BookOpen, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import { TeacherAuthStore } from '../../api/teacherAuthStore';
function TeacherSignup() {
    const [showP, setShowP] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
        ssn: "",
        profile_pic: null
    });

    function validateForm() {
        if (!formData.email.trim()) return toast.error("Email is required");
        if (formData.password.length < 6) return toast.error("Password length must be greater than 6");
        if (!formData.name.trim()) return toast.error("Name is required");
        if (!formData.ssn.trim()) return toast.error("SSN is required");
        if (!/\S+@\S+\.\S+/.test(formData.email))
            return toast.error("Enter a valid email"); 
        return true;
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFormdata({...formData, profile_pic: file});
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

     const { isSignup, Signup } = TeacherAuthStore();
    
    function handleSubmit(e) {
        e.preventDefault();
        const success = validateForm();
        if (success === true) {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('ssn', formData.ssn);
            if (selectedFile) {
                formDataToSend.append('profile_pic', selectedFile);
            }
            
            Signup(formDataToSend);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 relative px-4 py-12]">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
            
            {/* Signup Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xl glass p-8 rounded-2xl shadow-2xl border border-slate-700/50 relative z-10"
            >
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl shadow-lg ]">
                    <User className="w-8 h-8 text-white" />
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <h1 className="text-3xl font-bold text-center mt-6 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Create Account
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Profile Picture Upload */}
                        <div className="flex flex-col items-center mb-6">
                            <div 
                                className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 flex items-center justify-center cursor-pointer relative group"
                                onClick={() => fileInputRef.current.click()}
                            >
                                {previewUrl ? (
                                    <img 
                                        src={previewUrl} 
                                        alt="Profile Preview" 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <User size={40} className="text-blue-400" />
                                )}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Upload size={20} className="text-white" />
                                </div>
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept="image/*"
                            />
                            <button 
                                type="button" 
                                onClick={() => fileInputRef.current.click()}
                                className="mt-2 text-sm text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors"
                            >
                                <Upload size={12} /> Upload Profile Picture
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                        onChange={(e) => {setFormdata({...formData, name: e.target.value})}}
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
                                        onChange={(e) => {setFormdata({...formData, email: e.target.value})}}
                                    />
                                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                                    <BookOpen className="w-4 h-4 text-blue-400" /> 
                                    SSN
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Enter your ssn"
                                        value={formData.ssn} 
                                        onChange={(e) => {setFormdata({...formData, ssn: e.target.value})}}
                                    />
                                    <BookOpen className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
                                        onChange={(e) => {setFormdata({...formData, password: e.target.value})}}
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
                        </div>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSignup}
                            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center"
                        >
                            {isSignup ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin mr-2" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Create Account
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
                
                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Already have an account?{" "}
                        <Link to="/teacherlogin">
                            <span className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                                Sign in
                            </span>
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default TeacherSignup;