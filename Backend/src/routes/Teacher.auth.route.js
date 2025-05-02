import express from 'express'
import TProtect from '../middleware/teacherAuth.protect.js'
import { Login, Signup, Logout, TeacherInfo } from '../controllers/Teacher.auth.controller.js'
const router = express.Router();
router.post('/tchlogin', Login);
router.post('/tchsignup', Signup);
router.post('/tchlogout', Logout);
router.get('/tchinfo',TProtect, TeacherInfo);
export default router;