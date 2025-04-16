import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { backend } from '../config';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { RxCross2 } from "react-icons/rx";

const Deposite = ({value}) => {
    const params = useParams();
    const [depositeon, setdepositeon] = useState();
    const [amount, setamount] = useState();
    const [depositetill, setdepositetill] = useState();
    const [advance, setadvance] = useState()
    const [remark, setremark] = useState();
    const [due, setdue] = useState();
    
   
    const depositefee=async(e,id)=>{
        e.preventDefault();
        try {
            const formdata={depositeon,amount,depositetill,remark,due,advance}
            const response=await axios.post(`${backend.apiUrl}/feestructure//addfee/${id}`,formdata,{withCredentials:true});
           console.log(response.data)
            toast.success("fee updated");
            value.fetchstudent(params.id)
            value.setshowdeposite(false)
        } catch (error) {
            if(error) throw error;
        }
    }

  return (
    <div className='z-10 absolute  bg-[#2d6084] bottom-20 w-2/3 flex items-center flex-col left-[20%] rounded-md top-32 '>
        <h1 className='text-xl font-bold '>{value.student.name}'s fee</h1>
        <div className='w-full'>
        <RxCross2 className='absolute top-5 right-5 h-8 w-8' onClick={()=>{value.setshowdeposite(false)}}/>
            <form action="" className='flex items-center justify-center flex-col gap-5 '>
            <div className='flex items-center justify-center flex-col w-full'><span>amount</span>
            <input type="Number" placeholder='enter amount' className='w-full h-12 bg-[#98D2C0] rounded-md ' value={amount} onChange={(e)=>{setamount(e.target.value)}} /></div>
        
        <div className='flex items-center justify-center flex-col w-full'><span>deposited on</span>
        <input type="date" className='w-full h-12 bg-[#98D2C0] rounded-md 'value={depositeon} onChange={(e)=>{setdepositeon(e.target.value)}} /></div>
                
              

        <div className='flex items-center justify-center flex-col w-full'><span>deposited till</span>
        <input type="date" className='w-full h-12 bg-[#98D2C0] rounded-md  ' value={depositetill} onChange={(e)=>{setdepositetill(e.target.value)}} /></div>

                <div className='flex items-center justify-center flex-col w-full'><span>due</span>
        <input type="number" className='w-full h-12 bg-[#98D2C0] rounded-md  ' value={due} onChange={(e)=>{setdue(e.target.value)}} /></div>

        <div className='flex items-center justify-center flex-col w-full'><span>advance</span>
        <input type="number" className='w-full h-12 bg-[#98D2C0] rounded-md  ' value={advance} onChange={(e)=>{setadvance(e.target.value)}} /></div>
       
                

                  <div className='flex items-center justify-center flex-col w-full'><span>remark</span>
        <input type="text" className='w-full h-12 bg-[#98D2C0] rounded-md 'value={remark} onChange={(e)=>{setremark(e.target.value)}} /></div>
                
        <button className='h-10 w-32 bg-[#98D2C0] rounded-md cursor-pointer hover:bg-[#548172]'onClick={(e)=>{depositefee(e,value.student._id)}}>deposite</button>
            </form>
        </div>
    </div>
  )
}

export default Deposite
