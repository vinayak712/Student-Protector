import Student from "../models/studentmodel.js";

// Update attendance (Teacher)
export const updateAttendance = async (req, res) => {
  try {
    const { usn, attendance } = req.body;
    console.log(usn);

    // Find student by USN
    const student = await Student.findOne({ usn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update attendance
    student.attendance = attendance;
    await student.save();

    res.status(200).json({ message: "Attendance updated successfully!" });
  } catch (error) {
    console.error("Error updating attendance:", error.message);
    res.status(500).json({ message: "Server error while updating attendance." });
  }
};

// Get attendance (Student)
export const getStudentAttendance = async (req, res) => {
  try {
    const { usn } = req.params;

    // Find student by USN
    const student = await Student.findOne({ usn }).select("attendance");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ attendance: student.attendance });
  } catch (error) {
    console.error("Error fetching attendance:", error.message);
    res.status(500).json({ message: "Server error while fetching attendance." });
  }
};