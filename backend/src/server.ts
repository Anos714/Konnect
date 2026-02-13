import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

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

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
