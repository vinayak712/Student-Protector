import Teacher from "../models/teacherModel.js";
import { generateTeacherToken } from "../lib/teacherUtils.js";
import bcrypt from "bcrypt";


async function Signup(req,res) {
    const { name, email, password, ssn } = req.body;
    let profile_pic = '';
    try {
        if (!name || email || password || ssn) {
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
        const salt = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // new teacher
        const newTeacher = new Teacher({
            name,
            email,
            ssn,
            password: hashedPassword,
            profile_pic,
        });
        if (newTeacher) {
            await newTeacher.save();
            generateTeacherToken(newTeacher._id, res);

            res.status(201).json({
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
        const teacher = await Teacher.findOne(teacherId).select('-password -__v -createdAt -updatedAt');
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
        console.error("Studinfo controller error:", error.message);
        res.status(500).json({ message: "Server error: " + error.message });
    }
}
export { Signup, Login, Logout, TeacherInfo };