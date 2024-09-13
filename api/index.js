import express from "express";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import profileRouter from "./routes/profiles.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import uploadOnCloudinary from "./cloudinary.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://blog-app-five-steel.vercel.app",
        "https://blog-app-six-khaki.vercel.app",
      ];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

//for deployment
app.get("/", (req, res)=>{
  res.send("Welcome to my Blog App")
})


app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/profiles", profileRouter);


app.listen(8800, (req, res) => {
  console.log("server is working");
});

app.get("/", (req, res) => {
  res.send("Api is Working");
});
