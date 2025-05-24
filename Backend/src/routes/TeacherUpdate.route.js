import express from "express";
import { updateAttendance,getStudentAttendance } from "../models/chartModel.js";
import Protect from "../middleware/auth.protect.js";

const router = express.Router();

// Teacher updates attendance
router.post("/attendance",Protect, updateAttendance);

// Student views attendance
router.get("/attendance",Protect, getStudentAttendance);

export default router;