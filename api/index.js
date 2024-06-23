import express from "express";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
      origin: ["http://localhost:5173"]  || "*" , //we can give specific domain , that only take accept the request from that specific domain
      methods: ["GET", "PUT", "DELETE", "POST"],
      credentials: true, //for get header details like cookie...
    })
  ); //for deployment

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)


app.listen(8800, (req, res) => {
    console.log("server is working")
})

app.get("/",(req,res)=>{
    res.send("Api is Working")
})