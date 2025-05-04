import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/Student.auth.route.js";
import teacherRouter from "./routes/Teacher.auth.route.js";
import chartRouter from "./routes/chart.route.js";
import announcementRouter from "./routes/announcement.route.js"; // Add this line
import ConnectDb from "./lib/DB.js";
import { fileURLToPath } from 'url';
import fs from 'fs';
import sharedDocumentRouter from "./routes/sharedDocument.route.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 7000;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5175'],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Make sure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
const announcementsDir = path.join(uploadsDir, 'announcements');
fs.mkdirSync(announcementsDir, { recursive: true });
const sharedDocumentsDir = path.join(uploadsDir, 'shared-documents');
fs.mkdirSync(sharedDocumentsDir, { recursive: true });

// API routes
app.use("/api/auth", authRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/charts", chartRouter);
app.use("/api/announcements", announcementRouter); // Add this line
app.use("/api/shared-documents", sharedDocumentRouter);

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  ConnectDb();
});