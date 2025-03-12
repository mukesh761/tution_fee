import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { backend } from '../config';
import { toast } from 'react-toastify';

const Deposite = ({value}) => {
    const token = localStorage.getItem('token');
    const [depositeon, setdepositeon] = useState();
    const [lastdeposite, setlastdeposite] = useState();
    const [depositeupto, setdepositeupto] = useState();
   
    const depositefee=async(e,id)=>{
        e.preventDefault();
        try {
            const formdata={depositeon,lastdeposite,depositeupto}
            const response=await axios.post(`${backend.apiUrl}/student/depositefee/${id}`,formdata,{withCredentials:true});
           
            toast.success("fee updated");
            value.setshowdeposite(false)
        } catch (error) {
            if(error) throw error;
        }
    }

  return (
    <div className='z-10 absolute h-[500px] bg-[#1e4562] bottom-20 w-2/3 flex items-center flex-col left-[20%] rounded-md  '>
        <h1 className='text-xl font-bold '>mukesh maurya</h1>
        <div className='w-full'>
            <form action="" className='flex items-center justify-center flex-col gap-5 '>
            <div className='flex items-center justify-center flex-col w-full'><span>amount</span>
            <input type="Number" placeholder='enter amount' className='w-full h-12 bg-[#98D2C0] rounded-md ' value={lastdeposite} onChange={(e)=>{setlastdeposite(e.target.value)}} /></div>
        
        <div className='flex items-center justify-center flex-col w-full'><span>deposited on</span>
        <input type="date" className='w-full h-12 bg-[#98D2C0] rounded-md 'value={depositeon} onChange={(e)=>{setdepositeon(e.target.value)}} /></div>

        <div className='flex items-center justify-center flex-col w-full'><span>deposited till</span>
        <input type="date" className='w-full h-12 bg-[#98D2C0] rounded-md  ' value={depositeupto} onChange={(e)=>{setdepositeupto(e.target.value)}} /></div>
        <button className='h-10 w-32 bg-[#98D2C0] rounded-md cursor-pointer hover:bg-[#548172]'onClick={(e)=>{depositefee(e,value.studentid)}}>deposite</button>
            </form>
        </div>
    </div>
  )
}

export default Deposite
