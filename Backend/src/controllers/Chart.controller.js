import { File, Message, Grade, Attendance } from '../models/chartModel.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads/files/");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`);
  },
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Get grades data for charts
export const getGradesData = async (req, res) => {
  try {
    const studentId = req.user._id;
    
    // Get grades
    const grades = await Grade.find({ student: studentId });
    
    // Get attendance
    const attendance = await Attendance.find({ student: studentId });
    
    // Calculate attendance stats
    const present = attendance.filter(a => a.status === 'present').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const late = attendance.filter(a => a.status === 'late').length;
    
    // Prepare data for front-end charts
    const subjects = [...new Set(grades.map(g => g.subject))];
    
    // Performance data (bar chart)
    const performance = {
      labels: subjects,
      datasets: [
        {
          label: 'Your Score',
          data: subjects.map(subject => {
            const grade = grades.find(g => g.subject === subject);
            return grade ? grade.score : 0;
          }),
          backgroundColor: 'rgba(99, 102, 241, 0.6)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1
        },
        {
          label: 'Class Average',
          data: subjects.map(subject => {
            const grade = grades.find(g => g.subject === subject);
            return grade ? grade.classAverage : 0;
          }),
          backgroundColor: 'rgba(139, 92, 246, 0.4)',
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 1
        }
      ]
    };
    
    // Attendance data (pie chart)
    const attendanceData = {
      labels: ['Present', 'Absent', 'Late'],
      datasets: [{
        data: [present, absent, late],
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(251, 191, 36, 0.8)'
        ],
        borderColor: [
          'rgba(52, 211, 153, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(251, 191, 36, 1)'
        ],
        borderWidth: 1
      }]
    };
    
    // Progress data (line chart) - aggregate by month
    const progressData = {
      // Simplified example - in real app, aggregate scores by date periods
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Score Trend',
        data: [75, 78, 82, 79, 85, 90], // Example data
        fill: false,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        tension: 0.4
      }]
    };
    
    res.status(200).json({
      performance,
      attendance: attendanceData,
      progress: progressData
    });
  } catch (error) {
    console.error("Error fetching grades data:", error);
    res.status(500).json({ message: "Server error while fetching grades data" });
  }
};

// Get files uploaded by student
export const getFiles = async (req, res) => {
  try {
    const studentId = req.user._id;
    const files = await File.find({ student: studentId }).sort({ createdAt: -1 });
    
    // Format file sizes
    const formattedFiles = files.map(file => {
      const size = formatFileSize(file.size);
      return {
        _id: file._id,
        filename: file.originalname,
        path: file.path,
        uploadedAt: file.createdAt,
        size
      };
    });
    
    res.status(200).json(formattedFiles);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Server error while fetching files" });
  }
};

// Format file size in human-readable format
const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
};

// Get messages related to charts and files
export const getMessages = async (req, res) => {
  try {
    const studentId = req.user._id;
    
    // Get messages from student and to student
    const messages = await Message.find({
      $or: [
        { student: studentId },
        { recipient: studentId }
      ]
    })
    .sort({ timestamp: 1 })
    .populate({
      path: 'student',
      select: 'name'
    })
    .populate({
      path: 'file',
      select: 'filename originalname'
    });
    
    // Format messages for frontend
    const formattedMessages = messages.map(msg => {
      return {
        _id: msg._id,
        message: msg.message,
        timestamp: msg.timestamp,
        sender: {
          name: msg.student._id.equals(studentId) ? 'You' : msg.student.name
        },
        file: msg.file ? {
          id: msg.file._id,
          name: msg.file.originalname
        } : null
      };
    });
    
    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error while fetching messages" });
  }
};

// Upload file and/or message
export const uploadFileAndMessage = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { message } = req.body;
    let fileData = null;
    
    // Save file if uploaded
    if (req.file) {
      const file = new File({
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        student: studentId
      });
      
      fileData = await file.save();
    }
    
    // Save message if provided
    if (message || fileData) {
      const newMessage = new Message({
        message: message || `File uploaded: ${fileData.originalname}`,
        student: studentId,
        file: fileData ? fileData._id : null,
        timestamp: new Date()
      });
      
      await newMessage.save();
    }
    
    res.status(201).json({ message: "Upload successful" });
  } catch (error) {
    console.error("Error uploading file/message:", error);
    res.status(500).json({ message: "Server error during upload" });
  }
};

// Delete file
export const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const studentId = req.user._id;
    
    // Find file and verify ownership
    const file = await File.findOne({ _id: fileId, student: studentId });
    
    if (!file) {
      return res.status(404).json({ message: "File not found or unauthorized" });
    }
    
    // Delete physical file
    fs.unlink(file.path, async (err) => {
      if (err) {
        console.error("Error deleting file from filesystem:", err);
        // Continue with deletion from database even if file removal fails
      }
      
      // Delete file from database
      await File.deleteOne({ _id: fileId });
      
      // Delete associated messages
      await Message.deleteMany({ file: fileId });
      
      res.status(200).json({ message: "File deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Server error while deleting file" });
  }
};