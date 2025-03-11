import mongoose from "mongoose";
 const connection=mongoose.connect("mongodb+srv://mukesh737462:mukesh737462@cluster0.xtd8d.mongodb.net/tution_fee")
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(err)
})
export default connection;
 