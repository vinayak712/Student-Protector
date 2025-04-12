import { create } from "zustand";
import { axiosInstanace } from "../lib/axios.jsx";
import { toast } from 'react-hot-toast'
const Base_Url = import.meta.env.MODE === 'development' ? 'http://localhost:7000' : '/';
export const studentAuthStore = create((set, get) => (
    {
        isLogin: false,
        isSignup: false,
        isChecking: false,
        studentUser: null,
            

        checkAuth: async () => {
            try {
                set({ isChecking: true })
                const res = await axiosInstanace.get('/auth/check');
                set({ studentUser: res.data });

            }
            catch (error) {
                console.log('Error is checking authincation');
                set({ studentUser: null })
                
            }
            finally {
                set({ isChecking: false });
            }
        },


        Signup: async (data) => {
            set({ isSignup: true });
            try {
                const res = await axiosInstanace.post('/auth/stusignup',data);
                set({ studentUser: res.data });
                toast.success("SignUp Succeffully🎉")
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Something went wrong');

            }
            finally {
                set({ isSignup: false });
            }
        },

        Login: async (data) => {
            try {
                set({ isLogin: true });
                const res = await axiosInstanace.post('/auth/stulogin', data);
                set({ studentUser: res.data });
                toast.success('Login Successfully🎉');
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Something went wrong');

            }
            finally {
                set({ isLogin: false });
            }
        },

        Logout: async () => {
        try {
            const res = await axiosInstanace.post('/authstulogOut');
            set({ studentUser: null });
            toast.success("Logout Successfully🎉");
        } catch (error) {
            toast.error(error.response.data.message);
        }
        }
    })
)