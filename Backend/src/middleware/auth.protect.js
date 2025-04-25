import jwt from "jsonwebtoken";
import Student from "../models/studentmodel.js";

async function Protect(req, res, next) {
    try {
        const token = req.cookies.jwt;
        console.log("Token received:", token); // Debugging
        if (!token) {
            return res.status(401).json({ Message: 'Unauthorized - No token provided' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ Message: 'Unauthorized - Invalid token' });
        }
        const student = await Student.findById(decode.studentId).select('-password');
        if (!student) {
            return res.status(404).json({ Message: 'Student not found' });
        }
        req.user = student;
        next();
    } catch (error) {
        console.error("Protect middleware error:", error.message);
        res.status(500).json({ Message: 'Internal Server Error: ' + error.message });
    }
}
export default Protect;