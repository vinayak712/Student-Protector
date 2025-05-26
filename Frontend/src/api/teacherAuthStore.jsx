import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import { toast } from 'react-hot-toast'

export const TeacherAuthStore = create((set) => ({
    isLogin: false,
    isSignup: false,
    teacherUser: null,
    teacherInfo: null,
    isChecking: false,
    checkAuth: async () => {
        set({ isChecking: true })
        try {
            const res = await axiosInstance.get('/teacher/tchcheck');
            set({ teacherUser: res.data })
        } catch (error) {
            console.error("Error while checking authentication:", error);
            set({ teacherUser: null })
        }
        finally {
            set({ isChecking: false });
        }
    },

    Signup: async (data) => {
        set({ isSignup: true });
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            const res = await axiosInstance.post('/teacher/tchsignup',data,config);
            set({ teacherUser: res.data });
            toast.success("Signup Successfully 🎉");
        } catch (error) {
            toast.error(error?.response?.data?.Message || "Something went wrong during Signup.");
        }
        finally {
            set({ isSignup: false });
        }
    },

    Login: async (data) => {
        set({ isLogin: true });
        try {
            const res =  await axiosInstance.post('/teacher/tchlogin',data)
            set({ teacherUser: res.data });
            toast.success("Login Successfully 🎉");
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.Message || "Something went wrong during login.");
        } finally {
            set({ isLogin: false });
        }
    },

    Logout: async () => {
        try {
            await axiosInstance.post('/teacher/tchlogout');
            set({ teacherUser: null, teacherInfo: null })
        } catch (error) {
            toast.error(error?.response?.data?.Message || "Something went wrong during logout.");
        }
    },

    fetchTeacherInfo: async () => {
        try {
            console.log('Fetching teacher Data');
            const res = await axiosInstance.get('/teacher/tchinfo')
            console.log("Teacher info response:", res.data);
            set({ teacherInfo: res.data });
        } catch (error) {
            console.error("Error fetching Teacher  info:", error.response?.data || error.message);
        }
    }
}));