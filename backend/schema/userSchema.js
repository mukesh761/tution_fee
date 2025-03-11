import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    batch:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"batch",
    }]
})
const user=mongoose.model('user',userSchema);
export default user;