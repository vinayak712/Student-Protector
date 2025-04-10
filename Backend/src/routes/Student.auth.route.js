import express from 'express'
import { Signup, Login,Logout } from '../controllers/Student.auth.controller.js'

const router = express.Router();
router.post('/stulogin', Login);
router.post('/stusignup', Signup);
router.post('/stulogOut', Logout)

export default router;