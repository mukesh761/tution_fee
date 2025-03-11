import batchSchema from "../schema/batchSchema.js"
import user from "../schema/userSchema.js";
import userSchema from "../schema/userSchema.js"
export const createbatch=async(req,res)=>{
    const {name,time}=req.body;
    try {
        const newBatch=await batchSchema.create({
            name,
            time,
            owner:req.user._id
        });
        const user=await userSchema.findOne({_id:req.user._id});
        user.batch.push(newBatch._id);
        user.save();
        return res.status(200).json({message:"batch created",newBatch})
    } catch (error) {
        if(error){
            return res.status(400).json({error})
        }
    }
}


export const removebatch=async(req,res)=>{
    try {
        const removedbatch=await batchSchema.findOneAndDelete({_id:req.params.batch});
        const user=await userSchema.findOne({_id:req.user._id});
        user.batch.pull(req.params.batch)
        user.save()
        return res.status(200).json({message:"batch removed"});
    } catch (error) {
        
    }
}

export const findbatch=async(req,res)=>{
    try {
        const batches=await batchSchema.find({owner:req.user._id});
      return  res.json({batches})
    } catch (error) {
        console.log(error)
    }
}

