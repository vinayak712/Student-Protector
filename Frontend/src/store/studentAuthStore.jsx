import { create } from "zustand";
import { axiosInstance } from "../lib/axios.jsx";
import { toast } from 'react-hot-toast';

// Removed unused Base_Url variable

export const studentAuthStore = create((set) => ({
    isLogin: false,
    isSignup: false,
    isChecking: false,
    studentUser: null,
    checkAuth: async () => {
        set({ isChecking: true });
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ studentUser: res.data });
        } catch (error) {
            console.error('Error while checking authentication:', error);
            set({ studentUser: null });
        } finally {
            set({ isChecking: false });
        }
    },

    Signup: async (data) => {
        set({ isSignup: true });
        try {
            // Set the correct headers for multipart/form-data
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const res = await axiosInstance.post('/auth/stusignup', data, config);
            set({ studentUser: res.data });
            toast.success("Signup Successfully 🎉");
        } catch (error) {
            toast.error(error?.response?.data?.Message || 'Something went wrong during signup.');
        } finally {
            set({ isSignup: false });
        }
    },

    Login: async (data) => {
        set({ isLogin: true });
        try {
            const res = await axiosInstance.post('/auth/stulogin', data);
            set({ studentUser: res.data });
            toast.success("Login Successfully 🎉");
        } catch (error) {
            toast.error(error?.response?.data?.Message || 'Something went wrong during login.');
        } finally {
            set({ isLogin: false });
        }
    },

    Logout: async () => {
        try {
            await axiosInstance.post('/auth/stulogout'); // Make sure it matches route case
            set({ studentUser: null });
            toast.success("Logout Successfully 🎉");
        } catch (error) {
            toast.error(error?.response?.data?.Message || 'Something went wrong during logout.');
        }
    }
}));