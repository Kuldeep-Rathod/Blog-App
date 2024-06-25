import express from "express";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"] || "*", //we can give specific domain , that only take accept the request from that specific domain
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true, //for get header details like cookie...
  })
); //for deployment

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post(`/api/upload`, upload.single("file"), function (req, res) {
  const file = req.file
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(8800, (req, res) => {
  console.log("server is working");
});

app.get("/", (req, res) => {
  res.send("Api is Working");
});
