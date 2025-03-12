import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { backend } from '../config';
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router';

const Createbatch = ({setshowcreatebatch}) => {
    const token = localStorage.getItem('token');
    const [name,setname] = useState("");
    const [time, settime] = useState("")
    const navigate=useNavigate()

    const createBatch=async(e)=>{
        e.preventDefault();
        const formdata={name,time}
       const response=await axios.post(`${backend.apiUrl}/batch/createbatch`,formdata,{withCredentials:true})
        navigate("/")
        setshowcreatebatch(false)
        toast.success(response.data.message);
       
    }
    
    return (
        <div className=' items-center justify-center absolute top-32 z-10'>
            <div className='h-[500px] sm:w-[500px] w-[300px] bg-[#4F959D] flex items-center border-2 rounded-md '>
            <RxCross2 className='absolute top-10 right-10 h-8 w-8 ' onClick={()=>{setshowcreatebatch(false)}} />
                <form className='flex items-center justify-center flex-col gap-5 w-full'>
                    <TextField id="fullWidth" label="Name" variant="outlined" color="" value={name} onChange={(e) => { setname(e.target.value) }} sx={{
                        backgroundColor: "#98D2C0",
                        borderRadius: "10px",
                        width: "100%"
                    }} />
                    <TextField id="fullWidth" label="Time" variant="outlined" color="" value={time} onChange={(e) => { settime(e.target.value) }} sx={{
                        backgroundColor: "#98D2C0",
                        borderRadius: "10px",
                        width: "100%"
                    }} />
                    <button className='h-10 w-32 bg-[#98D2C0] rounded-md font-bold text-xl text-[#F6F8D5]' onClick={(e)=>{createBatch(e)}}>create batch</button>

                </form>
            </div>
        </div>
    )
}

export default Createbatch
