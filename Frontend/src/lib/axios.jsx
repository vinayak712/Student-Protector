import axios from 'axios'

// Fix the typo in the export name
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE==="development"? "http://localhost:7000/api":"/api",
    withCredentials:true,
})