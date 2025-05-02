import express from 'express';
import Protect from '../middleware/auth.protect.js';
import { 
  getGradesData, 
  getFiles, 
  getMessages,
  uploadFileAndMessage,
  deleteFile,
  upload
} from '../controllers/Chart.controller.js';

const router = express.Router();

router.get('/grades', Protect, getGradesData);
router.get('/files', Protect, getFiles);
router.get('/messages', Protect, getMessages);
router.post('/upload', Protect, upload.single('file'), uploadFileAndMessage);
router.delete('/files/:fileId', Protect, deleteFile);

export default router;