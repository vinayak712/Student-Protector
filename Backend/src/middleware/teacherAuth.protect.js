import jwt from "jsonwebtoken";
import Teacher from "../models/teacherModel.js";
async function  TProtect(req, res, next) {
  try {
    const token = req.cookie.jwt;
    if (!token) {
        return res.status(400).json({Message:'Unauthorized - No Token Provided for teacher'})
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
        return res.status(400).json({Message:'Unauthorized - Invalid Token For teacher'})
    }
    const teacher = await Teacher.findById(decode.teacherId).select('-password');
    if (!teacher) {
        return res.status(400).json({Message:'Teacher not Found'})
      }
      req.user = teacher;
      next();
  } catch (error) {
    console.error(" Middleware error:", error.message);
    res.status(500).json({ Message: 'Internal Server Error: ' + error.message });
  }
}
export default TProtect;