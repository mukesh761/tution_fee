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
                     res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  domain: ".onrender.com",
});


                return res.status(200).json({message:"signup succesfull",user,token})
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
                res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  domain: ".onrender.com",
});

 
        res.status(201).json({message:"login successfull",user,token})
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
    const token=" "
    res.status(204).json({message:"user logout",token})
}
