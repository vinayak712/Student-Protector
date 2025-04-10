import express from 'express'
import Protect from'../middleware/auth.protect.js'
import { Signup, Login,Logout,Check } from '../controllers/Student.auth.controller.js'

const router = express.Router();
router.post('/stulogin', Login);
router.post('/stusignup', Signup);
router.post('/stulogOut', Logout)
router.get('/check',Protect, Check);
export default router;