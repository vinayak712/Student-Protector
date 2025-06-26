import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
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
    marks: {
      type: Number,
      default: 0, // Default marks are 0
      min: 0,
      max: 100,
    },
    profile_pic: {
      type: String,
      default: "", // URL for the profile picture
    },
    password: {
      type: String,
      required: true,
    },
    ssn: {
      type: String,
    },
    joiningYear: {
      type: Number,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;