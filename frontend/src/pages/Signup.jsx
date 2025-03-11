import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { backend } from '../config';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';
const Signup = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    const navigate=useNavigate()

    const signupuser=async(e)=>{
        setloading(true)
        e.preventDefault();
        try {
            const userdata={name,email,password}
            const response= await axios.post(`${backend.apiUrl}/user/signup`,userdata,);
            
            setloading(false)
            localStorage.setItem("islogin",true);
            localStorage.setItem("user",JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            toast.success(response.data.message);
            navigate("/");
          
            
        } catch (error) {
            if(error){
                console.log(error);
                setloading(false)
            }
        }
    }
    const openlogin=()=>{
        navigate("/login");
    }

  return (
    <div className='container h-screen w-screen
    flex items-center justify-center bg-[#205781]'>
        <div className='rounded-md h-4/5 sm:w-2/3  bg-[#4F959D] flex items-center justify-center flex-col max-w-[800px]  w-full p-2' >
        <h1 className='text-xl font-bold text-blue-100 mb-10 ' >Sign Up</h1>
        <form className='w-full  flex flex-col gap-3'>
        <TextField fullWidth id="fullWidth" label="Name" variant="outlined" color="" value={name} onChange={(e)=>{setname(e.target.value)}} sx={{backgroundColor:"#98D2C0",
            borderRadius:"10px"
        }}   />


        <TextField fullWidth id="fullWidth" label="Email" variant="outlined" color="" value={email} onChange={(e)=>{setemail(e.target.value)}} sx={{backgroundColor:"#98D2C0",
            borderRadius:"10px"
        }}   />

        <TextField fullWidth id="fullWidth" label="Password" variant="outlined" color="" value={password} onChange={(e)=>{setpassword(e.target.value)}} sx={{backgroundColor:"#98D2C0",
            borderRadius:"10px"
        }}   />
        <button className='border-white-300 border-2 h-10 font-bold text-[#F6F8D5] cursor-pointer rounded-md ' onClick={(e)=>{signupuser(e)}}>{loading?<CircularProgress />:"Sign Up"}</button>
        </form>
        <div className='w-full'>
            <button className='border-2 h-10  cursor-pointer rounded-lg mt-20 bg-[#F6F8D5] w-full' onClick={openlogin}>Already Have An Account?</button>
        </div>
        </div>
        
    </div>
  )
}

export default Signup
