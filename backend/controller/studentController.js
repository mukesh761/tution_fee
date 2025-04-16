import studentSchema from "../schema/studentSchema.js";
import batchSchema from "../schema/batchSchema.js"

export const addStudent=async(req,res)=>{
    const {name,fname,classs,fees,join,contact}=req.body;
    try {
        const newStudent = await studentSchema.create({
            name,
            fname,
            fees,
            join,
            classs,
            batch:req.params.batch,
            contact
        });
        const batch=await batchSchema.findOne({_id:req.params.batch});
        batch.students.push(newStudent._id);
        batch.save()
        return res.status(200).json({message:"student created",newStudent})
    } catch (error) {
        if(error){
            console.log(error.message)
            return res.status(500).json({message:error.message})
        }
    }
}

export const removeStudent=async(req,res)=>{
    try {
        const removedstudent=await studentSchema.findOneAndDelete({_id:req.params.student});
        const batch=await batchSchema.findOne({_id:req.params.batch});
        batch.students.pull(req.params.student);
        batch.save();
        return res.status(200).json({message:"student removed"})
    } catch (error) {
        
    }
}

export const fetchstudents=async(req,res)=>{
    try {
        const students=await studentSchema.find({batch:req.params.batch}).populate("batch").populate("feestructure");
        return res.json({students});
    } catch (error) {
        
    }
}

export const fetchOneStudent=async(req,res)=>{
    try {
        const student=await studentSchema.findOne({_id:req.params.student}).populate("feestructure");
        return res.json({message:"student fetched",student});
    } catch (error) {
        
    }
}


