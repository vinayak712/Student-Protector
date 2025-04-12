import Student from'../models/studentmodel.js'
import { generateToken } from '../lib/utils.js';
import ConnectDb from '../lib/DB.js'
import bcrypt from 'bcrypt'
async function Signup(req, res) {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                Message: 'All Fields are required'
            });
        }
        if (password.length < 6) {
            return res.status(400).json({ Message: "The password length must be greater than 5" });
        }
        const student = await Student.findOne({ email });
        if (student) {
            return res.status(400).json({ Message: "Student Already Exist" });
        }
const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newStudent = new Student({
            name,
            email,
            password: hashedPassword,
        });
        if (newStudent) {
            await newStudent.save();
            generateToken(newStudent._id, res);
            res.status(201).json({
                _id: newStudent._id,
                name: newStudent.name,
                email: newStudent.email,
            });
        }
        
        else {
            return res.status(400).json({ Message: "Invaild Detailes" })
        }
        console.log("Received signup data:", req.body);
        console.log("New Student:", newStudent);

    } catch (error) {
        console.log("Error in signUp page ", error.message);
        res.status(400).json({ Message: "Internal Server Error" });
    }
 }

async function Login(req, res) {
    const { name, email, password } = req.body;
    try {
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ Message: 'Invalid Creandistials' });
        }
        const isPassword = await bcrypt.compare(password, student.password);
        if (!isPassword) {
            return res.status(400).json({ Message: 'Invalid Password' });
        }
        generateToken(student._id, res);
        res.status(201).json({
            name: student.name,
            _id: student._id,
            email: student.email,
        })
    } catch (error) {
        res.status(400).json({Message:'Invalid Please check again'})
    }
}
async function Logout(req, res)
{
try {
    res.cookie('jwt', "", { maxAge: 0 });
    res.status(200).json("Successfully LogOut")
} catch (error) {
    res.status(400).json("Error While LogOut" + error.message);
}
 }


 async function Check(req,res) {
    
 }
export { Signup, Login, Logout,Check };
