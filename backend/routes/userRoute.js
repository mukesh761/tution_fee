import express from "express";
import { signupUser,loginUser,logout } from "../controller/userController.js";
import { islogin } from "../middleware/isAuthenticated.js";
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("this is user route");
})
router.post("/signup",signupUser);
router.post("/login",loginUser);
router.get("/logout",islogin,logout);
export default router;