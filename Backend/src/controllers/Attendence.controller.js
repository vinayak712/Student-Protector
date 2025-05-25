import Student from "../models/Student.js";

// Update attendance (Teacher)
export const updateAttendance = async (req, res) => {
  try {
    const { usn, attendance } = req.body;

    // Validate request body
    if (!usn || attendance === undefined) {
      return res.status(400).json({ message: "USN and attendance are required." });
    }

    // Find student by USN
    let student = await Student.findOne({ usn });

    if (!student) {
      // If student not found, create a new student record
      student = new Student({ usn, attendance });
      await student.save();
      return res.status(201).json({ message: "New student created and attendance updated!" });
    }

    // Update attendance for existing student
    student.attendance = attendance;
    await student.save();

    res.status(200).json({ message: "Attendance updated successfully!" });
  } catch (error) {
    console.error("Error updating attendance:", error.message);
    res.status(500).json({ message: "Server error while updating attendance." });
  }
};
// Get  (Student)
export const getStudentAttendance = async (req, res) => {
  try {
    const { usn } = req.params;

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