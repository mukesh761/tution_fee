import userSchema from "../schema/userSchema.js"
import bcrypt, { hash } from "bcrypt"
import { generateToken } from "../utils/generateToken.js";
export const signupUser=async (req,res)=>{
    const {name, email, password}=req.body;
    try {
        if(name && email && password){
            const checkuser=await userSchema.findOne({email});
            if(checkuser){
                return res.status(409).json({message:"email already exist"})
            }

          bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                const user=await userSchema.create({
                    name,
                    email,
                    password:hash,
                })
                const token=generateToken(user);
                console.log(token)
                 res.cookie('token', token, {
  httpOnly: true, // Cookie can't be accessed via JavaScript
  secure: true, // Only send cookies over HTTPS in production
  maxAge: 3600000*24*30, // Cookie expires in 1 hour (in milliseconds)
  sameSite: 'Strict', // Prevent cross-site request forgery
});
                return res.status(200).json({message:"signup succesfull",user})
            })
          })
        }
        else{
            res.json({message:"please fill all fields"})
        }
    } catch (error) {
        if(error){
            return res.status(400).json({message:error})
        }
    }
}


export const  loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userSchema.findOne({email});
        if(!user){
            return res.status(403).json({message:"password or email is incorrect"})
           
        }
       const result=await  bcrypt.compare(password,user.password);
       if(result){
        const token=generateToken(user);
        res.cookie('token', token, {
  httpOnly: true, // Cookie can't be accessed via JavaScript
  secure: true, // Only send cookies over HTTPS in production
  maxAge: 3600000, // Cookie expires in 1 hour (in milliseconds)
  sameSite: 'Strict', // Prevent cross-site request forgery
});
        res.status(201).json({message:"login successfull",user})
       }
       else{
        res.status(403).json({message:"password or email is incorrect"})
       }
        
    } catch (error) {
        if(error){
            console.log(error)
            res.status(400).json({message:"something went wrong"})
           
        }
    }
}

export const logout=(req,res)=>{
    res.cookie("token","");
    res.status(204).json({message:"user logout"})
}
