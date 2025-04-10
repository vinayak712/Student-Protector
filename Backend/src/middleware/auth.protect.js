import jwt from "jsonwebtoken";
import Student from "../models/studentmodel.js";

async function Protect(req,res,next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(400).json({Message:'Unauthorized -No token provided'})
      }
      
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      if (!decode) {
        return res.status(400).json({Message:'Unauthorized -No token provided'})
      }
      const student = await Student.findById(decode.studentId).select('-password');
      if (!student) {
          return res.status(400).json({ Message: 'Student not found' });
      }
      req.student = student;
      next();
  } catch (error) {
    res.status(400).json({Message:'Error Occures'+error.message})
  }
    
}
export default Protect;