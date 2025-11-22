import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.route.js";
import bookmarkRouter from "./routers/bookmark.route.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/auth", authRouter);
app.use("/bookmarks", bookmarkRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Bookmark Organizer API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on ${PORT}`)
     try {
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    console.log("Error of connection is: ", error);
  }
});
