import mongoose, { mongo } from "mongoose";
const batchSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"students",
    }],
    time:{
        type:String,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
    
})
const batch=mongoose.model('batch',batchSchema);
export default batch;