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
    depositeon:{
        type:Date,
    },
    batch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"batch"
    },
    lastdeposite:{
        type:Number,
    },
    depositeupto:{
        type:Date,
    }
});
const student=mongoose.model("student",studentSchema);
export default student;