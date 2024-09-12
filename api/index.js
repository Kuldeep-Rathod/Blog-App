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
        "https://blog-app-six-khaki.vercel.app"
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

// app.post(`/api/upload`, upload.single("file"), async function (req, res) {
//   try {
//     // Ensure a file was uploaded
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const localFilePath = req.file.path;
//     console.log("Uploaded file path: ", localFilePath);

//     // Upload file to Cloudinary
//     const imgUrl = await uploadOnCloudinary(localFilePath);

//     // If Cloudinary upload fails, respond with error
//     if (!imgUrl) {
//       return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
//     }

//     console.log("Cloudinary Image URL: ", imgUrl);

//     // Send the Cloudinary URL as response
//     res.status(200).json({ url: imgUrl });
//   } catch (error) {
//     console.error("Error uploading file: ", error);

//     // Return a generic error response
//     res.status(500).json({ error: "Internal server error during image upload" });
//   }
// });

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
