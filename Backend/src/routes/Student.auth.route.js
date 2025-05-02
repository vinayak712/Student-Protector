import express from 'express'
import Protect from '../middleware/auth.protect.js'
import { Signup, Login, Logout, Check, upload,Studinfo } from '../controllers/Student.auth.controller.js'
import { 
    getGradesData, 
    getFiles, 
    getMessages,
    uploadFileAndMessage,
    deleteFile,
  } from '../controllers/Chart.controller.js';

const router = express.Router();

router.post('/stulogin', Login);
router.post('/stusignup', upload.single('profile_pic'), Signup);
router.get('/studinfo', Protect, Studinfo);
router.post('/stulogout', Logout);
router.get('/check', Protect, Check);

export default router;