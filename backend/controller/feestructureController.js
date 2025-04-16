import studentSchema from "../schema/studentSchema.js";
import feestructureSchema from "../schema/feestructureSchema.js";
console.log(feestructureSchema.schema)
export const depositefee = async (req, res) => {
    const { depositetill, amount, remarks,depositeon,advance,due } = req.body;
   const {student}=req.params;
   try {
    const student=await studentSchema.findOne({_id:req.params.student});
    if(!student){
        return res.status(404).json({message:"student not found"})
    }
    console.log(student)
    const newfee = await feestructureSchema.create({
        depositetill,
        amount,
        remarks,
        depositeon,
        advance,
        due,
        student:req.params.student,
    });
    console.log(newfee)

    student.feestructure.push(newfee._id);
    await student.save();
    return res.status(200).json({ message: "fee deposited", newfee });
   } catch (error) {
    if(error){
        res.json({message:error.message})
    }
   }
}
