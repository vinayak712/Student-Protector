import express from "express";
import { updateAttendance, getStudentAttendance } from "../controllers/Attendence.controller.js";
import Protect from "../middleware/auth.protect.js";

const router = express.Router();

// Route to update attendance (Teacher)
router.post("/update", Protect, updateAttendance);

// Route to get attendance (Student)
router.get("/:usn", Protect, getStudentAttendance);

export default router;