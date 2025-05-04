import express from 'express';
import Protect from '../middleware/auth.protect.js';
import { 
  getAnnouncements, 
  createAnnouncement, 
  likeAnnouncement,
  updateImportant,
  deleteAnnouncement,
  addComment,
  upload
} from '../controllers/announcement.controller.js';

const router = express.Router();

// Get all announcements with optional filtering
router.get('/', Protect, getAnnouncements);

// Create a new announcement with optional file attachment
router.post('/', Protect, upload.single('file'), createAnnouncement);

// Like/unlike an announcement
router.post('/:id/like', Protect, likeAnnouncement);

// Mark/unmark announcement as important
router.patch('/:id/important', Protect, updateImportant);

// Delete an announcement and its files
router.delete('/:id', Protect, deleteAnnouncement);

// Add a comment to an announcement
router.post('/:id/comments', Protect, addComment);

export default router;