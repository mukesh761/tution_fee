import express from "express";
import { islogin } from "../middleware/isAuthenticated.js";
import { addStudent,removeStudent,fetchstudents,depositefee } from "../controller/studentController.js";
const router=express.Router();


router.get("/",(req,res)=>{
    res.send("this is student route")
});

router.post("/addstudent/:batch",islogin,addStudent);
router.get("/removestudent/:batch/:student",islogin,removeStudent);
router.get("/fetchstudents/:batch",islogin,fetchstudents);
router.post("/depositefee/:id",islogin,depositefee);


export default router;