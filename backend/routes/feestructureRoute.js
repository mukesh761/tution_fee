import express from "express";
const router=express.Router();
import { depositefee } from "../controller/feestructureController.js";

router.post("/addfee/:student",depositefee);

export default router;

