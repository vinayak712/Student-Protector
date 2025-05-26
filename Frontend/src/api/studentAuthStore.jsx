import { create } from "zustand";
import { axiosInstance } from "../lib/axios.jsx";
import { toast } from "react-hot-toast";

export const studentAuthStore = create((set) => ({
    isLogin: false,
    isSignup: false,
    isChecking: false,
    studentUser: null,
    studentInfo: null, // Add state for student info
    checkAuth: async () => {
        set({ isChecking: true });
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ studentUser: res.data });
        } catch (error) {
            console.error("Error while checking authentication:", error);
            set({ studentUser: null });
        } finally {
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
            const res = await axiosInstance.post("/auth/stusignup", data, config);
            set({ studentUser: res.data });
            toast.success("Signup Successfully 🎉");
        } catch (error) {
            console.log(error)
            // toast.error(error?.response?.data?.Message || "Something went wrong during signup.");
        } finally {
            set({ isSignup: false });
        }
    },

    Login: async (data) => {
        set({ isLogin: true });
        try {
            const res = await axiosInstance.post("/auth/stulogin", data);
            set({ studentUser: res.data });
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
            await axiosInstance.post("/auth/stulogout");
            set({ studentUser: null, studentInfo: null });
            toast.success("Logout Successfully 🎉");
        } catch (error) {
            console.log(error)
            // toast.error(error?.response?.data?.Message || "Something went wrong during logout.");
        }
    },

    fetchStudentInfo: async () => {
        try {
            console.log("Fetching student info..."); // Debugging
            const res = await axiosInstance.get("/auth/studinfo");
            console.log("Student info response:", res.data); // Debugging
            set({ studentInfo: res.data });
        } catch (error) {
            console.error("Error fetching student info:", error.response?.data || error.message);
            // toast.error("Failed to fetch student information.");
        }
    },
    
}));