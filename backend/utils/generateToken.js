import jwt from "jsonwebtoken";
export const generateToken=(user)=>{
   return jwt.sign({email:user.email,id:user._id},process.env.JWT_TOKEN, { expiresIn: '24h' });
}
