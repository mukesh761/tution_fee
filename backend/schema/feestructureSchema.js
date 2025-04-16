import mongoose from "mongoose";
const feestructureSchema = mongoose.Schema({
 depositetill:{
    type:Date,
  
 },
    amount:{
        type:Number,
   
    },
    depositeon:{
        type:Date,
        default:Date.now,
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student",
    },
    remark:{
        type:String,
    },
    due:{
        type:Number,
        default:0,
    },
    advance:{
        type:Number,
        default:0,
    }
});
const feestructure = mongoose.model("feestructure", feestructureSchema);
export default feestructure;