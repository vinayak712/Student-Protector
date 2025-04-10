import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/Student.auth.route.js";
import ConnectDb from "./lib/DB.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log(`Port Running on ${port}`);
  ConnectDb();
});
