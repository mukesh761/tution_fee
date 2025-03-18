import studentSchema from "../schema/studentSchema.js";
import batchSchema from "../schema/batchSchema.js"
import student from "../schema/studentSchema.js";

export const addStudent=async(req,res)=>{
    const {name,fname,classs,fees,join}=req.body;
    try {
        const newStudent = await studentSchema.create({
            name,
            fname,
            fees,
            join,
            classs,
            batch:req.params.batch
        });
        const batch=await batchSchema.findOne({_id:req.params.batch});
        batch.students.push(newStudent._id);
        batch.save()
        return res.status(200).json({message:"student created",newStudent})
    } catch (error) {
        
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
        const students=await studentSchema.find({batch:req.params.batch});
        return res.json({students});
    } catch (error) {
        
    }
}

export const depositefee=async(req,res)=>{
    console.log("inside deposite fee")
    try {
        const {lastdeposite,depositeupto,depositeon,due}=req.body;
        console.log(req.body)
        const student= await studentSchema.findOneAndUpdate({_id:req.params.id},{lastdeposite,depositeon,depositeupto,due,remark},{new:true});
        console.log(student)
        return res.json({message:"fee updated",student});
    } catch (error) {
        console.log(error)
    }
}
