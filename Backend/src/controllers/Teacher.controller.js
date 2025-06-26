import Student from "../models/studentmodel.js";

export const updateAttendanceMarks = async (req, res) => {
  try {
    const { usn, attendance, } = req.body;

    // Find student by USN
    const student = await Student.findOne({ usn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update attendance and marks
    student.attendance = attendance;
    student.marks = marks;
    await student.save();

    res.status(200).json({ message: "Attendance and marks updated successfully!" });
  } catch (error) {
    console.error("Error updating attendance and marks:", error);
    res.status(500).json({ message: "Server error while updating data." });
  }
};