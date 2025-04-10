import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import path from'path'
import cookieParser from 'cookie-parser';
import authRouter from "./routes/Student.auth.route.js";
import ConnectDb from "./lib/DB.js";
const app = express();
dotenv.config();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser()); 
const port = process.env.PORT || 5000;
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}
app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log(`Port Running on ${port}`);
  ConnectDb();
});
