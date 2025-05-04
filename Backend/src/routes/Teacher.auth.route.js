import express from 'express'
import TProtect from '../middleware/teacherAuth.protect.js'
import { Login, Signup, Logout, TeacherInfo,Check,upload } from '../controllers/Teacher.auth.controller.js'
const router = express.Router();
router.post('/tchlogin', Login);
router.post('/tchsignup',upload.single('profile_pic'), Signup);
router.post('/tchlogout', Logout);
router.get('/tchinfo', TProtect, TeacherInfo);
router.get('/tchcheck', TProtect, Check);
export default router;