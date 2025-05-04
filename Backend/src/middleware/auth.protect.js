import jwt from "jsonwebtoken";
import Student from '../models/studentmodel.js'
import Teacher from "../models/teacherModel.js";

const Protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Set userModel based on prefix in userId
      const userId = decoded.userId;
      
      // Check if it's a teacher (teachers have a 'T-' prefix in JWT)
      if (userId.toString().startsWith('T-')) {
        const teacherId = userId.slice(2); // Remove 'T-' prefix
        const teacher = await Teacher.findById(teacherId).select("-password");
        
        if (!teacher) {
          return res.status(401).json({ message: "Teacher not found" });
        }
        
        req.user = teacher;
        req.user.role = 'teacher';
      } else {
        // It's a student
        const student = await Student.findById(userId).select("-password");
        
        if (!student) {
          return res.status(401).json({ message: "Student not found" });
        }
        
        req.user = student;
        req.user.role = 'student';
      }

      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Server error in authentication" });
  }
};

export default Protect;