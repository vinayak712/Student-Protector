import { create } from "zustand";
import { axiosInstance } from "../lib/axios.jsx";
import { toast } from "react-hot-toast";

export const teacherAuthStore = create((set) => ({
    isLogin: false,
    isSignup: false,
    isChecking: false,
    teacherUser: JSON.parse(localStorage.getItem("teacherUser")) || null,
    teacherInfo: null,
    
    checkAuth: async () => {
        set({ isChecking: true });
        try {
            const res = await axiosInstance.get("/teacher/check");
            localStorage.setItem("teacherUser", JSON.stringify(res.data));
            set({ teacherUser: res.data });
        } catch (error) {
            console.error("Error while checking teacher authentication:", error);
            localStorage.removeItem("teacherUser");
            set({ teacherUser: null });
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
            const res = await axiosInstance.post("/teacher/signup", data, config);
            localStorage.setItem("teacherUser", JSON.stringify(res.data));
            set({ teacherUser: res.data });
            toast.success("Teacher Signup Successfully 🎉");
        } catch (error) {
            toast.error(error?.response?.data?.Message || "Something went wrong during teacher signup.");
        } finally {
            set({ isSignup: false });
        }
    },

    Login: async (data) => {
        set({ isLogin: true });
        try {
            const res = await axiosInstance.post("/teacher/login", data);
            localStorage.setItem("teacherUser", JSON.stringify(res.data));
            set({ teacherUser: res.data });
            toast.success("Teacher Login Successfully 🎉");
        } catch (error) {
            toast.error(error?.response?.data?.Message || "Something went wrong during teacher login.");
        } finally {
            set({ isLogin: false });
        }
    },

    Logout: async () => {
        try {
            await axiosInstance.post("/teacher/logout");
            localStorage.removeItem("teacherUser");
            set({ teacherUser: null, teacherInfo: null });
            toast.success("Teacher Logout Successfully 🎉");
        } catch (error) {
            toast.error(error?.response?.data?.Message || "Something went wrong during teacher logout.");
        }
    },

    fetchTeacherInfo: async () => {
        try {
            console.log("Fetching teacher info..."); // Debugging
            const res = await axiosInstance.get("/teacher/tchinfo");
            console.log("Teacher info response:", res.data); // Debugging
            set({ teacherInfo: res.data });
            return res.data;
        } catch (error) {
            console.error("Error fetching teacher info:", error.response?.data || error.message);
            // Don't show toast here since this might be called on initial page load
            return null;
        }
    },
}));