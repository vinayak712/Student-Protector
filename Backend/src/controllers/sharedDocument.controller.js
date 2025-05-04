import { File } from '../models/chartModel.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure multer storage for shared document uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads/shared-documents/");
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
  if (bytes < 1024) return bytes + " B";
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
};

// Get all shared documents
export const getAllDocuments = async (req, res) => {
  try {
    const documents = await File.find({ isShared: true }).sort({ uploadDate: -1 });
    
    // Format response
    const formattedDocs = documents.map(doc => ({
      _id: doc._id,
      filename: doc.filename,
      originalname: doc.originalname,
      path: doc.path,
      size: doc.size,
      mimetype: doc.mimetype,
      uploaderName: doc.uploaderName || "Anonymous",
      description: doc.description || "",
      uploadDate: doc.uploadDate || doc.createdAt
    }));
    
    res.status(200).json(formattedDocs);
  } catch (error) {
    console.error("Error fetching shared documents:", error);
    res.status(500).json({ message: "Server error while fetching documents" });
  }
};

// Upload new shared document
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    // Create new file record
    const newFile = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploaderName: req.body.uploaderName || "Anonymous",
      description: req.body.description || "",
      isShared: true,
      uploadDate: new Date()
    });
    
    await newFile.save();
    res.status(201).json({ 
      message: "Document uploaded successfully", 
      document: {
        _id: newFile._id,
        filename: newFile.filename,
        originalname: newFile.originalname,
        size: formatFileSize(newFile.size)
      }
    });
  } catch (error) {
    console.error("Error uploading shared document:", error);
    res.status(500).json({ message: "Server error while uploading document" });
  }
};