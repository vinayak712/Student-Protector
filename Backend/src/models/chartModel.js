import mongoose from "mongoose";

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
    required: true
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

export { File, Message, Grade, Attendance };