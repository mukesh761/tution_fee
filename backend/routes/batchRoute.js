import express from "express";
import { islogin } from "../middleware/isAuthenticated.js";
const router=express.Router();
import { createbatch,findbatch,removebatch } from "../controller/batchController.js";

router.get("/",(req,res)=>{
    res.send("this is batch route")
});
router.post("/createbatch",islogin,createbatch);
router.get("/removebatch/:batch",islogin,removebatch);
router.get("/findbatch",islogin,findbatch);

export default router;