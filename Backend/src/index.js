import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/Student.auth.route.js";
import Teacherrouter from "./routes/Teacher.auth.route.js";
import chartRouter from "./routes/chart.route.js"; // Add this line
import ConnectDb from "./lib/DB.js";
import multer from 'multer';
import fs from 'fs';

const app = express();
dotenv.config();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 7000;

// Configure file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Make sure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create multer upload middleware
const upload = multer({ storage: storage });

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Apply routes
app.use("/api/auth", authRouter);
app.use("/api/charts", chartRouter);// Add this line
app.use('/api/tchauth', Teacherrouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  ConnectDb();
});