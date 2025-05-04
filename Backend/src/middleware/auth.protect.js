import jwt from "jsonwebtoken";
import Student from'../models/studentmodel.js'
async function  Protect(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(400).json({Message:'Unauthorized - No Token Provided for student'})
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
        return res.status(400).json({Message:'Unauthorized - Invalid Token For student'})
    }
    const student = await Student.findById(decode.studentId).select('-password');
    if (!student) {
        return res.status(400).json({Message:'Student not Found'})
      }
      req.user = student;
      next();
  } catch (error) {
    console.error(" Middleware error:", error.message);
    res.status(500).json({ Message: 'Internal Server Error: ' + error.message });
  }
}
export default Protect;