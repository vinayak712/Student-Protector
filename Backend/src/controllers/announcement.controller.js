import Announcement from '../models/announcementModel.js';
import { File } from '../models/chartModel.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads/announcements/");
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
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Format file size in human-readable format
const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
};

// Get announcements with optional filtering
export const getAnnouncements = async (req, res) => {
  try {
    const { filter } = req.query;
    let query = {};
    
    // Apply filters
    if (filter === 'important') {
      query.important = true;
    } else if (filter === 'files') {
      query.files = { $exists: true, $ne: [] };
    }
    
    // Find announcements with populated fields
    const announcements = await Announcement.find(query)
      .sort({ createdAt: -1 }) // newest first
      .populate({
        path: 'sender',
        select: 'name email role profilePic',
      })
      .populate({
        path: 'files',
        select: 'filename originalname size mimetype',
      });
    
    // Format data for frontend
    const formattedAnnouncements = announcements.map(announcement => {
      // Check if current user liked this announcement
      const liked = announcement.likes.some(like => 
        like.user.equals(req.user._id) && 
        like.userModel === (req.user.role === 'teacher' ? 'Teacher' : 'Student')
      );
      
      // Format files with readable sizes
      const formattedFiles = announcement.files.map(file => ({
        _id: file._id,
        filename: file.filename,
        originalname: file.originalname, 
        size: formatFileSize(file.size),
        mimetype: file.mimetype
      }));
      
      // Add avatar URL if available
      let avatar = null;
      if (announcement.sender.profilePic) {
        avatar = announcement.sender.profilePic.startsWith('http') 
          ? announcement.sender.profilePic
          : `${req.protocol}://${req.get('host')}${announcement.sender.profilePic}`;
      }
      
      return {
        _id: announcement._id,
        message: announcement.message,
        sender: {
          _id: announcement.sender._id,
          name: announcement.sender.name,
          role: announcement.sender.role,
          avatar
        },
        files: formattedFiles,
        important: announcement.important,
        likes: announcement.likes.length,
        comments: announcement.comments.length,
        liked,
        createdAt: announcement.createdAt
      };
    });
    
    res.status(200).json(formattedAnnouncements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Server error while fetching announcements" });
  }
};

// Create a new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role || 'student';
    
    // Create announcement document
    const announcement = new Announcement({
      message,
      sender: userId,
      senderModel: userRole === 'teacher' ? 'Teacher' : 'Student',
      important: req.body.important || false
    });
    
    // Handle file uploads
    if (req.files && req.files.length > 0) {
      const fileIds = [];
      
      for (const file of req.files) {
        const newFile = new File({
          filename: file.filename,
          originalname: file.originalname,
          path: file.path,
          size: file.size,
          mimetype: file.mimetype,
          uploader: userId,
          uploaderModel: userRole === 'teacher' ? 'Teacher' : 'Student'
        });
        
        const savedFile = await newFile.save();
        fileIds.push(savedFile._id);
      }
      
      announcement.files = fileIds;
    } else if (req.file) {
      // Single file upload
      const newFile = new File({
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        uploader: userId,
        uploaderModel: userRole === 'teacher' ? 'Teacher' : 'Student'
      });
      
      const savedFile = await newFile.save();
      announcement.files = [savedFile._id];
    }
    
    await announcement.save();
    res.status(201).json({ message: "Announcement created successfully", announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Server error while creating announcement" });
  }
};

// Like or unlike an announcement
export const likeAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role || 'student';
    const userModel = userRole === 'teacher' ? 'Teacher' : 'Student';
    
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    
    // Check if user already liked
    const likeIndex = announcement.likes.findIndex(
      like => like.user.equals(userId) && like.userModel === userModel
    );
    
    if (likeIndex > -1) {
      // Unlike
      announcement.likes.splice(likeIndex, 1);
    } else {
      // Like
      announcement.likes.push({ user: userId, userModel });
    }
    
    await announcement.save();
    res.status(200).json({ 
      message: likeIndex > -1 ? "Announcement unliked" : "Announcement liked",
      likes: announcement.likes.length
    });
  } catch (error) {
    console.error("Error liking announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update announcement important status
export const updateImportant = async (req, res) => {
  try {
    const { id } = req.params;
    const { important } = req.body;
    
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    
    // Check if user has permission (teacher/admin or creator)
    if (req.user.role !== 'teacher' && req.user.role !== 'admin' && 
        !announcement.sender.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to update this announcement" });
    }
    
    announcement.important = important;
    await announcement.save();
    
    res.status(200).json({ 
      message: "Announcement updated successfully",
      important: announcement.important
    });
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    
    // Check if user has permission (teacher/admin or creator)
    if (req.user.role !== 'teacher' && req.user.role !== 'admin' && 
        !announcement.sender.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to delete this announcement" });
    }
    
    // Delete associated files
    if (announcement.files && announcement.files.length > 0) {
      for (const fileId of announcement.files) {
        const file = await File.findById(fileId);
        if (file) {
          // Delete physical file
          try {
            fs.unlinkSync(file.path);
          } catch (err) {
            console.error("Error deleting file:", err);
            // Continue even if file deletion fails
          }
          
          // Delete file document
          await File.deleteOne({ _id: fileId });
        }
      }
    }
    
    await Announcement.deleteOne({ _id: id });
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add comment to announcement
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role || 'student';
    
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    
    announcement.comments.push({
      text,
      user: userId,
      userModel: userRole === 'teacher' ? 'Teacher' : 'Student'
    });
    
    await announcement.save();
    res.status(201).json({ 
      message: "Comment added successfully",
      comments: announcement.comments.length
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};