import Student from "../models/studentmodel.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

async function Signup(req, res) {
  const { name, email, password, usn } = req.body;
  let profile_pic = "";

  // If file was uploaded
  if (req.file) {
    profile_pic = `/uploads/${req.file.filename}`;
  }

  try {
    if (!name || !email || !password || !usn) {
      return res.status(400).json({
        Message: "All Fields are required",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ Message: "The password length must be greater than 5" });
    }

    // Check if user already exists - Fix the OR operator logic
    const existingEmail = await Student.findOne({ email });
    const existingUSN = await Student.findOne({ usn });

    if (existingEmail) {
      return res.status(400).json({ Message: "Email already exists" });
    }

    if (existingUSN) {
      return res.status(400).json({ Message: "USN already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      usn,
      profile_pic,
    });

    // Save student and return response
    if (newStudent) {
      await newStudent.save();
      generateToken(newStudent._id, res);
      res.status(201).json({
        _id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        usn: newStudent.usn,
        profile_pic: newStudent.profile_pic,
      });
    } else {
      return res.status(400).json({ Message: "Invalid Details" });
    }
  } catch (error) {
    console.log("Error in signUp page ", error.message);
    res
      .status(400)
      .json({ Message: "Internal Server Error: " + error.message });
  }
}

async function Login(req, res) {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ Message: "Invalid Credentials" });
    }
    const isPassword = await bcrypt.compare(password, student.password);
    if (!isPassword) {
      return res.status(400).json({ Message: "Invalid Password" });
    }
    const token = generateToken(student._id, res); // Generate the token
    console.log("JWT Token at Login:", token); // Print the token to the console
    res.status(201).json({
      name: student.name,
      _id: student._id,
      email: student.email,
      usn: student.usn,
    });
  } catch (error) {
    res.status(400).json({ Message: "Invalid Please check again" });
  }
}
async function Logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Successfully LogOut");
  } catch (error) {
    res.status(400).json("Error While LogOut" + error.message);
  }
}
async function Studinfo(req, res) {
  try {
    console.log("Student ID from token:", req.user._id); // Debugging
    const studentId = req.user._id;

    const student = await Student.findById(studentId).select(
      "-password -__v -createdAt -updatedAt"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    console.log("Student data fetched:", student); // Debugging
    res.status(200).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      usn: student.usn,
      profile_pic: student.profile_pic,
    });
  } catch (error) {
    console.error("Studinfo controller error:", error.message);
    res.status(500).json({ message: "Server error: " + error.message });
  }
}
async function Check(req, res) {}
export { Signup, Login, Logout, Check, Studinfo };
