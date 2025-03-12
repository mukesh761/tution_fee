import express from "express";
import jwt from "jsonwebtoken"
import userSchema from "../schema/userSchema.js"
const app=express();
export const islogin=(req,res,next)=>{
     const token = req.cookies.token;
    if(!token){
        res.status(401).json({message:"token not found"});
        console.log("token not found")
        return;
    }
    jwt.verify(token,process.env.jwt_token,async (err,result)=>{
        if(err){
            res.status(400).json({message:"something went wrong"});
            return;
        }
        const email=result.email;
        const user=await userSchema.findOne({email});
        if(!user){
            res.status(401).json({message:"user not found"})
            console.log("user not verified")
            return;
        }
        console.log("user verified")
        req.user=user;
        
        return next()
        
    })
}
