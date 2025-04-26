import { useState, useRef } from 'react'
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader, Upload, BookOpen } from "lucide-react";
import { studentAuthStore } from '../api/studentAuthStore';
import toast from 'react-hot-toast';

function StudSignup() {
    const [showP, setShowP] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
        usn: "",
        profile_pic: null
    });

    function validateForm() {
        if (!formData.email.trim()) return toast.error("Email is required");
        if (formData.password.length < 6) return toast.error("Password length must be greater than 6");
        if (!formData.name.trim()) return toast.error("Name is required");
        if (!formData.usn.trim()) return toast.error("USN is required");
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
    
    const { isSignup, Signup } = studentAuthStore();
    
    function handleSubmit(e) {
        e.preventDefault();
        const success = validateForm();
        if (success === true) {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('usn', formData.usn);
            if (selectedFile) {
                formDataToSend.append('profile_pic', selectedFile);
            }
            
            Signup(formDataToSend);
        }
    }

    return (
        <>
            <div className='min-h-screen w-screen pt-[50px] bg-gradient-to-r from-slate-900 to-slate-950 flex
            items-center justify-center'>
                <div className='flex flex-col items-center gap-10 justify-center bg-slate-950 w-[650px] h-[820px] rounded-2xl border-[2px] text-white'>
                    
                    <h1 className='text-5xl animate-pulse font-bold text-green-500'> Student <span className='text-blue-500'>Signup</span></h1>
                    
                    <form onSubmit={handleSubmit} className='flex gap-5 flex-col w-full p-6'>
                        {/* Profile Picture Upload */}
                        <div className="flex flex-col items-center mb-2">
                            <div 
                                className="w-24 h-24 rounded-full border-2 border-green-500 overflow-hidden flex items-center justify-center cursor-pointer mb-2"
                                onClick={() => fileInputRef.current.click()}
                            >
                                {previewUrl ? (
                                    <img 
                                        src={previewUrl} 
                                        alt="Profile Preview" 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <User size={40} className="text-green-500" />
                                )}
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
                                className="flex items-center gap-2 text-sm text-green-500"
                            >
                                <Upload size={16} /> Upload Profile Picture
                            </button>
                        </div>
                        
                        <label className='text-2xl flex items-center gap-x-3'> Name <User className='text-green-500' /></label>
                    
                        <input 
                            type="text"
                            className='input p-3 w-full bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='Enter your name'
                            value={formData.name} 
                            onChange={(e) => {setFormdata({...formData, name: e.target.value})}}
                        />   
                        
                        <label className='text-2xl flex items-center gap-x-3'> Email <Mail className='text-green-500' /></label>
                    
                        <input 
                            type="email"
                            className='input p-3 w-full bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='example@gmail.com'
                            value={formData.email} 
                            onChange={(e) => {setFormdata({...formData, email: e.target.value})}}
                        />
                        
                        <label className='text-2xl flex items-center gap-x-3'> USN <BookOpen className='text-green-500' /></label>
                    
                        <input 
                            type="text"
                            className='input p-3 w-full bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='Enter your USN'
                            value={formData.usn} 
                            onChange={(e) => {setFormdata({...formData, usn: e.target.value})}}
                        />

                        <label className='text-2xl flex items-center gap-x-3'> Password <Lock className='text-green-500' /></label>
                    
                        <div className='relative w-full'>
                            <input 
                                type={showP ? "text" : "password"}
                                className='input p-3 pr-12 w-full bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-green-500'
                                placeholder='*********'
                                value={formData.password}
                                onChange={(e) => {setFormdata({...formData, password: e.target.value})}}
                            /> 
                            <button 
                                type='button'
                                className='absolute inset-y-0 right-4 flex items-center'
                                onClick={() => {setShowP(!showP)}}
                            >
                                {showP ? <EyeOff className='size-5 text-green-500'/> : <Eye className="size-5 text-green-500"/>}
                            </button>
                        </div> 
                        
                        <div className='flex items-center w-full justify-center'>
                            <button 
                                className='text-2xl bg-green-500 w-[80%] rounded-2xl py-3 px-3 p-4 border-[2px] hover:bg-green-700 transition-all duration-300'
                                disabled={isSignup}
                            >
                                {isSignup ? (
                                    <>
                                        <Loader className="size-5 animate-spin inline-block mr-2" />
                                        Loading...
                                    </>
                                ) : (
                                    "Create Account"
                                )} 
                            </button>
                        </div>
                    </form>
                
                    <p>Already have an account?👉 <Link to="/stulogin"><span className='text-green-500 text-lg'>Login</span></Link></p>
                </div>
            </div>
        </>
    )
}

export default StudSignup