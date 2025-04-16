//importing packages
import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"

//importing files
import connection from "./database/connection.js";

//importing routes
import batchRoute from "./routes/batchRoute.js"
import userRoute from "./routes/userRoute.js"
import studentRoute from "./routes/studentRoute.js"
import feeRoute from "./routes/feestructureRoute.js"

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
dotenv.config();
const corsOptions = {
    origin: 'https://tution-fee-1.onrender.com',  // Replace with your frontend's URL (React dev server)
    // origin: "http://localhost:5173",
    credentials: true,
   // Allow credentials (cookies)
 };
 app.use(cors(corsOptions))
 
app.get("/",(req,res)=>{
    res.send("this is the main route")
});
app.use("/user",userRoute);
app.use("/batch",batchRoute);
app.use("/student",studentRoute);
app.use("/feestructure",feeRoute);

app.listen(process.env.PORT||8000,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
})
