import express from 'express'
import Protect from '../middleware/auth.protect.js'
import { Signup, Login, Logout, Check, upload } from '../controllers/Student.auth.controller.js'

const router = express.Router();

router.post('/stulogin', Login);
router.post('/stusignup', upload.single('profile_pic'), Signup);
router.post('/stulogout', Logout);
router.get('/check', Protect, Check);

export default router;