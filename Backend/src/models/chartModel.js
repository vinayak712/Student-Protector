import mongoose from "mongoose";
import Student from './studentmodel.js';

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false // Changed to false to make it optional
  },
  // New fields for shared documents
  isShared: {
    type: Boolean,
    default: false
  },
  uploaderName: {
    type: String,
    default: "Anonymous"
  },
  description: {
    type: String,
    default: ""
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const GradeSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  classAverage: {
    type: Number
  },
  term: {
    type: String
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  }
});

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  }
});

const File = mongoose.model('File', FileSchema);
const Message = mongoose.model('Message', MessageSchema);
const Grade = mongoose.model('Grade', GradeSchema);
const Attendance = mongoose.model('Attendance', AttendanceSchema);

export {Student, File, Message, Grade, Attendance, };