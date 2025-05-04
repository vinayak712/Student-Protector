import Teacher from "../models/teacherModel.js";
import { generateTeacherToken } from "../lib/teacherUtils.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from 'fs';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads/files/");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`);
  },
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

async function Signup(req, res) {
    console.log("Request Body:", req.body);
    const { name, email, password, ssn } = req.body;
    let profile_pic = '';
    if (req.file) {
        profile_pic = `/uploads/${req.file.filename}`;
      }
    try {
        if (!name || !email || !password || !ssn) {
            return res.status(400).json({Message:'All Fileds are Required'})
        }
        if (password.length < 6) {
            return res.status(400).json({Message:'The Password Length MUst be greater then 6'})
        }
        const existingEmail = await Teacher.findOne({ email });
        const existingSSN = await Teacher.findOne({ ssn });
        // Checking for the user existance
        if (existingEmail) {
            return res.status(400).json({Message:'Email already Exist'})
        }
        if (existingSSN) {
            return res.status(400).json({ Message:'SSN must be different'})
        }
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // new teacher
        console.log("Creating new teacher...");
        const newTeacher = new Teacher({
            name,
            email,
            ssn,
            password: hashedPassword,
            profile_pic,
        });
        if (newTeacher) {
            await newTeacher.save();
            console.log("Teacher saved successfully.");
            generateTeacherToken(newTeacher._id, res);

           return res.status(201).json({
                _id: newTeacher._id,
                name: newTeacher.name,
                email: newTeacher.email,
                ssn: newTeacher.ssn,
                profile_pic: newTeacher.profile_pic,
            });
        }
        else {
            return res.status(400).json({Message:'Invalid Details of student'})
        }
        
    } catch (error) {
        console.log("Error in signUp page ", error.message);
        res
          .status(400)
          .json({ Message: "Internal Server Error: " + error.message });
    }
}



async function Login(req,res) {
    const { email, password } = req.body;
    try {
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).json({Message: 'Invalid Credentials'})
        }
        const isPassword = await bcrypt.compare(password, teacher.password);
        if (!isPassword) {
            return res.status(400).json({Message:'Password is not correct'})
        }
        const token = generateTeacherToken(teacher._id, res);
        console.log("JWT  Teacher Token at Login:", token);
        res.status(201).json({
            name: teacher.name,
            email: teacher.email,
            _id: teacher._id,
            ssn: teacher.ssn,
            
        });
    } catch (error) {
        res.status(400).json({ Message: "Invalid Please check again" });
    }
}

async function Logout(req,res) {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json("Successfully LogOut");
        
    } catch (error) {
        res.status(400).json("Error While LogOut" + error.message);
    }
}

async function TeacherInfo(req,res) {
    try {
        const teacherId = req.user._id;
        const teacher = await Teacher.findById(teacherId).select('-password -__v -createdAt -updatedAt');
        if (!teacher) {
            return res.status(400).json({Message:'Teacher NOt Found'})
        }

        // sending teacher data
        res.status(201).json({
            _id: teacher._id,
            name: teacher.name,
            email: teacher.email,
            ssn: teacher.ssn,
            profile_pic: teacher.profile_pic,
        });
    } catch (error) {
        console.error("Teacher controller error:", error.message);
        res.status(500).json({ message: "Server error: " + error.message });
    }
}
async function Check(req, res) {}
export { Signup, Login, Logout, TeacherInfo,Check,};