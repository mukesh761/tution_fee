import express from "express";
import { islogin } from "../middleware/isAuthenticated.js";
import { addStudent,removeStudent,fetchstudents,fetchOneStudent } from "../controller/studentController.js";
const router=express.Router();


router.get("/",(req,res)=>{
    res.send("this is student route")
});

router.post("/addstudent/:batch",islogin,addStudent);
router.get("/removestudent/:batch/:student",islogin,removeStudent);
router.get("/fetchstudents/:batch",islogin,fetchstudents);
router.get("/fetchonestudents/:student",islogin,fetchOneStudent);


export default router;