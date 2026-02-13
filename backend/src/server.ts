import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB } from "./config/db.js";
import { error } from "console";

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

//routes
app.use("/ping", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    msg: "pong",
  });
});

//database connection
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at PORT: ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
