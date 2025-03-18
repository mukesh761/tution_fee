import React, { memo, useState } from 'react'
import TextField from '@mui/material/TextField';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { backend } from '../config';
import { toast } from 'react-toastify';


const Addstudent =({value}) => {
    const token = localStorage.getItem('token');
    const [name, setname] = useState("");
    const [fname, setfname] = useState("");
    const [classs, setclasss] = useState("");
    const [join, setjoin] = useState(null);
    const [fees, setfees] = useState();

    
    const [loading, setloading] = useState(false)
    
    const addstudent=async(e,id)=>{
        e.preventDefault();
        try {
          setloading(true)
          const formdata={name,fname,classs,join,fees}
          const response=await axios.post(`${backend.apiUrl}/student/addstudent/${id}`,formdata,{withCredentials:true});
          
          toast.success("student added")
          setloading(false)

        } catch (error) {
          if(error){
            throw error
          }
        }
    }

  return (
    <div className='bg-[#173953]  absolute bottom-0 flex items-center justify-center gap-5 sm:w-2/3 rounded-md sm:h-[700px] md:right-50 w-[80%] left-[20%] '>
         <RxCross2 className='absolute top-5 right-5 h-8 w-8' onClick={()=>{value.setshowaddstudent(false)}}/>
        <form action="" className='flex items-center justify-center flex-col gap-10 w-2/3 h-full rounded-md'>
        <TextField fullWidth id="fullWidth" label="Name" variant="outlined" color="" value={name} onChange={(e)=>{setname(e.target.value)}} sx={{backgroundColor:"#98D2C0",
            borderRadius:"10px"
        }}   />
         <TextField fullWidth id="fullWidth" label="father's Name" variant="outlined" color="" value={fname} onChange={(e)=>{setfname(e.target.value)}} sx={{backgroundColor:"#98D2C0",
            borderRadius:"10px"
        }}   />
         <TextField fullWidth id="fullwidth" label="class" variant="outlined" color="" value={classs} onChange={(e)=>{setclasss(e.target.value)}} sx={{backgroundColor:"#98D2C0",
            borderRadius:"10px"
        }}   />
        <input type="date" className='bg-[#98D2C0] w-full h-12 rounded-md' placeholder='join on' value={join} onChange={(e)=>{setjoin(e.target.value)}} />
        <input type="number" placeholder='fees'  className='bg-[#98D2C0] w-full h-12 rounded-md' value={fees} onChange={(e)=>{setfees(e.target.value)}} />
        <button className='h-10 w-32 rounded-md bg-[#98D2C0] ' onClick={(e)=>{addstudent(e,value.id)}}>{loading?"loading...":"add student"}</button>
        </form>
    </div>
  )
}

export default Addstudent
