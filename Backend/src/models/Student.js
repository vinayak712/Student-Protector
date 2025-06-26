import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    usn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    attendance: {
      type: Number,
      default: 0, // Default attendance is 0%
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Student = mongoose.model("StudentAttendence", studentSchema);

export default Student;