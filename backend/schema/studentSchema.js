import mongoose from "mongoose";
const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
    },
    classs:{
        type:String,
    },
    fees:{
        type:Number,
        default:100,
    },
    join:{
        type:Date,
        default:Date.now,
    },
    contact:{
        type:String,
    },
    batch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"batch"
    },
    feestructure:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"feestructure"
    }]

  
});
const student=mongoose.model("student",studentSchema);
export default student;
